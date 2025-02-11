import express, { Router } from 'express';
import { getSsmValue } from '../utils/ssm';
import { bodyContainsAllFields } from '../middleware';

// --------------------------------
// Basic Types
// --------------------------------

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
}

interface AuxiaContextualAttributeString {
    key: string;
    stringValue: string;
}

interface AuxiaContextualAttributeBoolean {
    key: string;
    boolValue: boolean;
}

interface AuxiaContextualAttributeInteger {
    key: string;
    integerValue: number;
}

type AuxiaGenericContexualAttribute =
    | AuxiaContextualAttributeString
    | AuxiaContextualAttributeBoolean
    | AuxiaContextualAttributeInteger;

interface AuxiaSurface {
    surface: string;
    maximumTreatmentCount: number;
}

interface AuxiaUserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

// --------------------------------
// Auxia API Interface
// --------------------------------

interface AuxiaAPIGetTreatmentsRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaGenericContexualAttribute[];
    surfaces: AuxiaSurface[];
    languageCode: string;
}

interface AuxiaAPILogTreatmentInteractionRequestPayload {
    projectId: string;
    userId: string;
    treatmentTrackingId: string;
    treatmentId: string;
    surface: string;
    interactionType: string;
    interactionTimeMicros: number;
    actionName: string;
}

interface AuxiaAPIGetTreatmentsResponseData {
    responseId: string;
    userTreatments: AuxiaUserTreatment[];
}

// --------------------------------
// Proxy Interface
// --------------------------------

interface AuxiaProxyGetTreatmentsResponseData {
    responseId: string;
    userTreatment?: AuxiaUserTreatment;
}

// --------------------------------
// Proxy Common Functions
// --------------------------------

export const getAuxiaRouterConfig = async (): Promise<AuxiaRouterConfig> => {
    const apiKey = await getSsmValue('PROD', 'auxia-api-key');
    if (apiKey === undefined) {
        throw new Error('auxia-api-key is undefined');
    }

    const projectId = await getSsmValue('PROD', 'auxia-projectId');
    if (projectId === undefined) {
        throw new Error('auxia-projectId is undefined');
    }

    return Promise.resolve({
        apiKey,
        projectId,
    });
};

// --------------------------------
// Proxy Implementation GetTreatments
// --------------------------------

const buildGetTreatmentsRequestPayload = (
    projectId: string,
    browserId: string,
    is_supporter: boolean,
    daily_article_count: number,
    article_identifier: string,
): AuxiaAPIGetTreatmentsRequestPayload => {
    // For the moment we are hard coding the data provided in contextualAttributes and surfaces.
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        contextualAttributes: [
            {
                key: 'profile_id',
                stringValue: 'pr1234',
            },
            {
                key: 'is_supporter',
                boolValue: is_supporter,
            },
            {
                key: 'daily_article_count',
                integerValue: daily_article_count,
            },
            {
                key: 'article_identifier',
                stringValue: article_identifier,
            },
        ],
        surfaces: [
            {
                surface: 'ARTICLE_PAGE',
                maximumTreatmentCount: 1,
            },
        ],
        languageCode: 'en-GB',
    };
};

const callGetTreatments = async (
    apiKey: string,
    projectId: string,
    browserId: string,
    is_supporter: boolean,
    daily_article_count: number,
    article_identifier: string,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    const url = 'https://apis.auxia.io/v1/GetTreatments';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildGetTreatmentsRequestPayload(
        projectId,
        browserId,
        is_supporter,
        daily_article_count,
        article_identifier,
    );

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(url, params);
        const responseBody = await response.json();

        // nb: In some circumstances, for instance if the payload although having the right
        // schema, is going to fail Auxia's validation then the response body may not contain
        // the userTreatments field. In this case we return undefined.
        if (responseBody['userTreatments'] === undefined) {
            return Promise.resolve(undefined);
        }
        const data = responseBody as AuxiaAPIGetTreatmentsResponseData;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.resolve(undefined);
    }
};

const buildAuxiaProxyGetTreatmentsResponseData = (
    auxiaData: AuxiaAPIGetTreatmentsResponseData,
): AuxiaProxyGetTreatmentsResponseData | undefined => {
    // Note the small difference between AuxiaAPIResponseData and AuxiaProxyResponseData
    // In the case of AuxiaProxyResponseData, we have an optional userTreatment field, instead of an array of userTreatments.
    // This is to reflect the what the client expect semantically.

    return {
        responseId: auxiaData.responseId,
        userTreatment: auxiaData.userTreatments[0],
    };
};

// --------------------------------
// LogTreatmentInteraction Implementation
// --------------------------------

const buildLogTreatmentInteractionRequestPayload = (
    projectId: string,
    browserId: string,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): AuxiaAPILogTreatmentInteractionRequestPayload => {
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        treatmentTrackingId,
        treatmentId,
        surface,
        interactionType,
        interactionTimeMicros,
        actionName,
    };
};

const callLogTreatmentInteration = async (
    apiKey: string,
    projectId: string,
    browserId: string,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): Promise<void> => {
    const url = 'https://apis.auxia.io/v1/LogTreatmentInteraction';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildLogTreatmentInteractionRequestPayload(
        projectId,
        browserId,
        treatmentTrackingId,
        treatmentId,
        surface,
        interactionType,
        interactionTimeMicros,
        actionName,
    );

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    await fetch(url, params);

    // We are not consuming an answer from the server, so we are not returning anything.
};

// --------------------------------
// Router
// --------------------------------

export const buildAuxiaProxyRouter = (config: AuxiaRouterConfig): Router => {
    const router = Router();

    router.post(
        '/auxia/get-treatments',
        bodyContainsAllFields([
            'browserId',
            'is_supporter',
            'daily_article_count',
            'article_identifier',
        ]),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const auxiaData = await callGetTreatments(
                    config.apiKey,
                    config.projectId,
                    req.body.browserId,
                    req.body.is_supporter,
                    req.body.daily_article_count,
                    req.body.article_identifier,
                );

                if (auxiaData !== undefined) {
                    const data = buildAuxiaProxyGetTreatmentsResponseData(auxiaData);
                    res.send({ status: 'ok', data: data });
                } else {
                    res.send({ status: 'error' });
                }
            } catch (error) {
                next(error);
            }
        },
    );

    router.post(
        '/auxia/log-treatment-interaction',
        bodyContainsAllFields([
            'browserId',
            'treatmentTrackingId',
            'treatmentId',
            'surface',
            'interactionType',
            'interactionTimeMicros',
            'actionName',
        ]),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                await callLogTreatmentInteration(
                    config.apiKey,
                    config.projectId,
                    req.body.browserId,
                    req.body.treatmentTrackingId,
                    req.body.treatmentId,
                    req.body.surface,
                    req.body.interactionType,
                    req.body.interactionTimeMicros,
                    req.body.actionName,
                );
                res.send({ status: 'ok' }); // this is the proxy's response, slightly more user's friendly than the api's response.
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
