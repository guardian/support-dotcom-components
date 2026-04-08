import { z } from 'zod';
import type { AuxiaTracking } from '../../shared/types';
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

export type AuxiaInteractionType = 'VIEWED' | 'CLICKED' | 'SNOOZED' | 'DISMISSED';

export type AuxiaBannerStatus = 'suppressed' | 'not-suppressed' | 'not-consulted';

// Use the mvtId (which has range 0 - 1,000,000) to rollout gradually
const AUXIA_ROLLOUT_SHARE = 0.01 * 1_000_000;
const inAuxiaAudience = (mvtId: number): boolean => mvtId < AUXIA_ROLLOUT_SHARE;

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
     * Checks whether Auxia wants the banner to be suppressed.
     * Returns:
     * - `suppressed`, a boolean indicating whether the banner should be suppressed.
     * - `treatment`, an object with Auxia ids for tracking *if* Auxia does not suppress the banner.
     *
     * Defaults to not suppressed if the request fails or returns no treatments.
     */
    private async checkBannerSuppression(
        browserId: string,
        attributes: GetTreatmentsAttributes,
    ): Promise<{ suppressed: boolean; treatment?: AuxiaTracking }> {
        const BannerSuppressionContentSchema = z.object({ show_banner: z.string() });

        const response = await this.getTreatments(
            browserId,
            'SUPPORTER_REVENUE_BANNER',
            attributes,
        );

        if (!response) {
            return { suppressed: false };
        }

        try {
            if (response.userTreatments && response.userTreatments.length > 0) {
                const userTreatment = response.userTreatments[0];
                const parsed = BannerSuppressionContentSchema.safeParse(
                    JSON.parse(userTreatment.treatmentContent) as unknown,
                );
                const suppressed = parsed.success && parsed.data.show_banner !== 'true';
                if (suppressed) {
                    return { suppressed: true };
                }
                return {
                    suppressed: false,
                    treatment: {
                        treatmentId: userTreatment.treatmentId,
                        treatmentTrackingId: userTreatment.treatmentTrackingId,
                    },
                };
            }
            // No treatment - do not suppress
            return { suppressed: false };
        } catch (error) {
            logError(`Error parsing Auxia treatment content: ${String(error)}`);
            putMetric('auxia-error');
            return { suppressed: false };
        }
    }

    /**
     * Proxies a LogTreatmentInteraction request to Auxia.
     */
    async logTreatmentInteraction(params: {
        browserId: string;
        treatmentTrackingId: string;
        treatmentId: string;
        surface: string;
        interactionType: AuxiaInteractionType;
        interactionTimeMicros: number;
    }): Promise<void> {
        try {
            const response = await fetch('https://apis.auxia.io/v1/LogTreatmentInteraction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.config.apiKey,
                },
                body: JSON.stringify({
                    projectId: this.config.projectId,
                    userId: params.browserId,
                    treatmentTrackingId: params.treatmentTrackingId,
                    treatmentId: params.treatmentId,
                    surface: params.surface,
                    interactionType: params.interactionType,
                    interactionTimeMicros: params.interactionTimeMicros,
                }),
            });

            if (!response.ok) {
                logError(`Auxia LogTreatmentInteraction returned ${response.status}`);
                putMetric('auxia-error');
            }
        } catch (error) {
            logError(`Error calling Auxia LogTreatmentInteraction: ${String(error)}`);
            putMetric('auxia-error');
        }
    }

    /**
     * Returns 3 functions:
     * - checkAuxiaSuppression: calls checkBannerSuppression and captures the result for logging
     * - forLogging: returns the cached status without making a request
     * - getTreatment: returns the cached auxia treatment data (if banner was not suppressed)
     */
    getBannerSuppressedChecker(
        channelSwitches: ChannelSwitches,
        mvtId: number,
    ): {
        checkAuxiaSuppression: (
            browserId: string,
            attributes: GetTreatmentsAttributes,
        ) => Promise<boolean>;
        forLogging: () => AuxiaBannerStatus;
        getTreatment: () => AuxiaTracking | undefined;
    } {
        let cachedStatus: AuxiaBannerStatus = 'not-consulted';
        let cachedTreatment: AuxiaTracking | undefined = undefined;

        const checkAuxiaSuppression = async (
            browserId: string,
            attributes: GetTreatmentsAttributes,
        ): Promise<boolean> => {
            if (!channelSwitches.enableAuxiaForBanners) {
                return false;
            }
            if (!inAuxiaAudience(mvtId)) {
                return false;
            }
            const result = await this.checkBannerSuppression(browserId, attributes);
            cachedStatus = result.suppressed ? 'suppressed' : 'not-suppressed';
            cachedTreatment = result.treatment;
            return result.suppressed;
        };

        const forLogging = (): AuxiaBannerStatus => cachedStatus;
        const getTreatment = (): AuxiaTracking | undefined => cachedTreatment;

        return { checkAuxiaSuppression, forLogging, getTreatment };
    }
}
