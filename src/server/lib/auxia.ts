import { z } from 'zod';
import type { AuxiaRouterConfig } from '../api/auxiaProxyRouter';

const UserTreatmentSchema = z.object({
    treatmentId: z.string(),
    treatmentTrackingId: z.string(),
    rank: z.string(),
    contentLanguageCode: z.string(),
    treatmentContent: z.string(),
    treatmentType: z.string(),
    surface: z.string(),
});

const GetTreatmentsResponseSchema = z.object({
    responseId: z.string(),
    userTreatments: z.array(UserTreatmentSchema),
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

            const body = (await response.json()) as unknown;
            const parsed = GetTreatmentsResponseSchema.safeParse(body);

            if (!parsed.success || parsed.data.userTreatments.length === 0) {
                return undefined;
            }

            return parsed.data;
        } catch {
            return undefined;
        }
    }

    /**
     * Returns true if Auxia decides the banner should be suppressed, false otherwise.
     * Defaults to false (i.e. allow banner) if the request fails or returns no treatments.
     */
    async isBannerSuppressed(
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
            const parsed = BannerSuppressionContentSchema.safeParse(
                JSON.parse(response.userTreatments[0].treatmentContent) as unknown,
            );
            return parsed.success && parsed.data.show_banner !== 'true';
        } catch {
            return false;
        }
    }
}
