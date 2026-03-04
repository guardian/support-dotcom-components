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

const TreatmentContentSchema = z.object({
    show_banner: z.string(),
});
type TreatmentContent = z.infer<typeof TreatmentContentSchema>;

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

interface GetTreatmentsAttributes {
    isSupporter: boolean;
    hasConsented: boolean;
    countryCode: string;
    // Optional fields
    editionId?: string;
    dailyArticleCount?: number;
    articleIdentifier?: string;
    shouldServeDismissible?: boolean;
}

const buildRequestPayload = (
    auxiaConfig: AuxiaRouterConfig,
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
): GetTreatmentsRequestPayload => {
    // mandatory attributes
    const contextualAttributes: ContextualAttribute[] = [
        { key: 'is_supporter', boolValue: isSupporter },
        { key: 'country_key', stringValue: countryCode },
        { key: 'has_consented', boolValue: hasConsented },
    ];

    // optional attributes
    if (editionId !== undefined) {
        contextualAttributes.push({ key: 'edition', stringValue: editionId });
    }
    if (dailyArticleCount !== undefined) {
        contextualAttributes.push({ key: 'daily_article_count', integerValue: dailyArticleCount });
    }
    if (articleIdentifier !== undefined) {
        contextualAttributes.push({ key: 'article_identifier', stringValue: articleIdentifier });
    }
    if (shouldServeDismissible !== undefined) {
        contextualAttributes.push({
            key: 'should_not_serve_mandatory',
            boolValue: shouldServeDismissible,
        });
    }

    return {
        projectId: auxiaConfig.projectId,
        userId: browserId,
        contextualAttributes,
        surfaces: [{ surface, maximumTreatmentCount: 1 }],
        languageCode: 'en-GB',
    };
};

const callAuxiaGetTreatments = async (
    auxiaConfig: AuxiaRouterConfig,
    browserId: string,
    surface: string,
    attributes: GetTreatmentsAttributes,
): Promise<GetTreatmentsResponse | undefined> => {
    const payload = buildRequestPayload(auxiaConfig, browserId, surface, attributes);

    try {
        const response = await fetch('https://apis.auxia.io/v1/GetTreatments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': auxiaConfig.apiKey,
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
};

/**
 * Returns true if Auxia decides the banner should be suppressed, false otherwise.
 * Defaults to false (i.e. allow banner) if the request fails or returns no treatments.
 */
export const isBannerSuppressedByAuxia = async (
    auxiaConfig: AuxiaRouterConfig,
    browserId: string,
    fields: GetTreatmentsAttributes,
): Promise<boolean> => {
    const response = await callAuxiaGetTreatments(
        auxiaConfig,
        browserId,
        'SUPPORTER_REVENUE_BANNER',
        fields,
    );

    if (!response || response.userTreatments.length === 0) {
        return false;
    }

    const parseTreatmentContent = (raw: string): TreatmentContent | undefined => {
        try {
            const parsed = TreatmentContentSchema.safeParse(JSON.parse(raw));
            return parsed.success ? parsed.data : undefined;
        } catch {
            return undefined;
        }
    };

    const content = parseTreatmentContent(response.userTreatments[0].treatmentContent);
    return content?.show_banner !== 'true';
};
