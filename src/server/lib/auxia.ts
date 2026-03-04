export interface UserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

export interface GetTreatmentsResponse {
    responseId: string;
    userTreatments: UserTreatment[];
}

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

export interface GetTreatmentsFields {
    apiKey: string;
    projectId: string;
    surface: string;
    browserId: string;
    isSupporter: boolean;
    hasConsented: boolean;
    countryCode: string;
    // Optional fields
    editionId?: string;
    dailyArticleCount?: number;
    articleIdentifier?: string;
    shouldServeDismissible?: boolean;
}

const buildRequestPayload = ({
    projectId,
    browserId,
    isSupporter,
    hasConsented,
    countryCode,
    surface,
    editionId,
    dailyArticleCount,
    articleIdentifier,
    shouldServeDismissible,
}: GetTreatmentsFields): GetTreatmentsRequestPayload => {
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
        contextualAttributes.push({ key: 'should_not_serve_mandatory', boolValue: shouldServeDismissible });
    }

    return {
        projectId,
        userId: browserId,
        contextualAttributes,
        surfaces: [{ surface, maximumTreatmentCount: 1 }],
        languageCode: 'en-GB',
    };
};

export const callAuxiaGetTreatments = async (
    request: GetTreatmentsFields,
): Promise<GetTreatmentsResponse | undefined> => {
    const payload = buildRequestPayload(request);

    try {
        const response = await fetch('https://apis.auxia.io/v1/GetTreatments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': request.apiKey,
            },
            body: JSON.stringify(payload),
        });

        const body = (await response.json()) as { userTreatments?: UserTreatment[] };

        if (!body.userTreatments) {
            return undefined;
        }

        return body as GetTreatmentsResponse;
    } catch {
        return undefined;
    }
};








