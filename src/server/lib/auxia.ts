import { z } from 'zod';
import type { AuxiaRouterConfig } from '../api/auxiaProxyRouter';
import type { ChannelSwitches } from '../channelSwitches';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';

const UserTreatmentSchema = z.object({
    treatmentId: z.string(),
    treatmentTrackingId: z.string(),
    rank: z.string(),
    contentLanguageCode: z.string(),
    treatmentContent: z.string(),
    treatmentType: z.string(),
    surface: z.string(),
});

export type UserTreatment = z.infer<typeof UserTreatmentSchema>;

const GetTreatmentsResponseSchema = z.object({
    responseId: z.string(),
    userTreatments: z.array(UserTreatmentSchema).nullish(),
});

type GetTreatmentsResponse = z.infer<typeof GetTreatmentsResponseSchema>;

type ContextualAttribute =
    | { key: string; stringValue: string }
    | { key: string; boolValue: boolean }
    | { key: string; integerValue: number };

interface GetTreatmentsRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: ContextualAttribute[];
    surfaces: Array<{ surface: string; maximumTreatmentCount: number }>;
    languageCode: string;
}

export interface GetTreatmentsAttributes {
    isSupporter: boolean;
    hasConsented: boolean;
    countryCode: string;
    editionId?: string;
    dailyArticleCount?: number;
    articleIdentifier?: string;
    shouldServeDismissible?: boolean;
}

export type AuxiaBannerStatus = 'suppressed' | 'not-suppressed' | 'not-consulted';

export class Auxia {
    private config: AuxiaRouterConfig;

    constructor(config: AuxiaRouterConfig) {
        this.config = config;
    }

    private buildRequestPayload(
        browserId: string,
        surface: string,
        {
            isSupporter,
            hasConsented,
            countryCode,
            editionId,
            dailyArticleCount,
            articleIdentifier,
            shouldServeDismissible,
        }: GetTreatmentsAttributes,
    ): GetTreatmentsRequestPayload {
        const contextualAttributes: ContextualAttribute[] = [
            { key: 'is_supporter', boolValue: isSupporter },
            { key: 'country_key', stringValue: countryCode },
            { key: 'has_consented', boolValue: hasConsented },
        ];

        if (editionId !== undefined) {
            contextualAttributes.push({ key: 'edition', stringValue: editionId });
        }
        if (dailyArticleCount !== undefined) {
            contextualAttributes.push({
                key: 'daily_article_count',
                integerValue: dailyArticleCount,
            });
        }
        if (articleIdentifier !== undefined) {
            contextualAttributes.push({
                key: 'article_identifier',
                stringValue: articleIdentifier,
            });
        }
        if (shouldServeDismissible !== undefined) {
            contextualAttributes.push({
                key: 'should_not_serve_mandatory',
                boolValue: shouldServeDismissible,
            });
        }

        return {
            projectId: this.config.projectId,
            userId: browserId,
            contextualAttributes,
            surfaces: [{ surface, maximumTreatmentCount: 1 }],
            languageCode: 'en-GB',
        };
    }

    private async getTreatments(
        browserId: string,
        surface: string,
        attributes: GetTreatmentsAttributes,
    ): Promise<GetTreatmentsResponse | undefined> {
        const payload = this.buildRequestPayload(browserId, surface, attributes);

        try {
            const response = await fetch('https://apis.auxia.io/v1/GetTreatments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.config.apiKey,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                logError(`Auxia returned ${response.status}`);
                putMetric('auxia-error');
                return undefined;
            }

            const body = (await response.json()) as unknown;
            const parsed = GetTreatmentsResponseSchema.safeParse(body);

            if (!parsed.success) {
                logError(`Failed to parse Auxia GetTreatments response: ${parsed.error.message}`);
                putMetric('auxia-error');
                return undefined;
            }

            return parsed.data;
        } catch (error) {
            logError(`Error fetching treatments from Auxia: ${String(error)}`);
            putMetric('auxia-error');
            return undefined;
        }
    }

    /**
     * Returns whether Auxia decides the banner should be suppressed.
     * Defaults to false (i.e. allow banner) if the request fails or returns no treatments.
     */
    private async isBannerSuppressed(
        browserId: string,
        attributes: GetTreatmentsAttributes,
    ): Promise<boolean> {
        const BannerSuppressionContentSchema = z.object({ show_banner: z.string() });

        const response = await this.getTreatments(
            browserId,
            'SUPPORTER_REVENUE_BANNER',
            attributes,
        );

        if (!response) {
            return false;
        }

        try {
            if (response.userTreatments && response.userTreatments.length > 0) {
                const parsed = BannerSuppressionContentSchema.safeParse(
                    JSON.parse(response.userTreatments[0].treatmentContent) as unknown,
                );
                // Auxia gives us a field containing a boolean value in a string...
                return parsed.success && parsed.data.show_banner !== 'true';
            }
            // No treatment - do not suppress
            return false;
        } catch (error) {
            logError(`Error parsing Auxia treatment content: ${String(error)}`);
            putMetric('auxia-error');
            return false;
        }
    }

    /**
     * Returns 2 functions:
     * - checkAuxiaSuppression: calls isBannerSuppressed and captures the result for logging
     * - forLogging: returns the cached status without making a request
     */
    getBannerSuppressedChecker(channelSwitches: ChannelSwitches): {
        checkAuxiaSuppression: (
            browserId: string,
            attributes: GetTreatmentsAttributes,
        ) => Promise<boolean>;
        forLogging: () => AuxiaBannerStatus;
    } {
        let cachedStatus: AuxiaBannerStatus = 'not-consulted';

        const checkAuxiaSuppression = async (
            browserId: string,
            attributes: GetTreatmentsAttributes,
        ): Promise<boolean> => {
            if (!channelSwitches.enableAuxiaForBanners) {
                return false;
            }
            const isSuppressed = await this.isBannerSuppressed(browserId, attributes);
            cachedStatus = isSuppressed ? 'suppressed' : 'not-suppressed';
            return isSuppressed;
        };

        const forLogging = (): AuxiaBannerStatus => cachedStatus;

        return { checkAuxiaSuppression, forLogging };
    }
}
