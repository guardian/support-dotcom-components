import express, { Router } from 'express';
import { getSsmValue } from '../utils/ssm';

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
    userId: string;
}

interface AuxiaApiRequestPayloadContextualAttributes {
    key: string;
    stringValue: string;
}

interface AuxiaApiRequestPayloadSurface {
    surface: string;
    maximumTreatmentCount: number;
}

interface AuxiaAPIRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaApiRequestPayloadContextualAttributes[];
    surfaces: AuxiaApiRequestPayloadSurface[];
    languageCode: string;
}

interface AuxiaAPIResponseDataUserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

interface AuxiaAPIResponseData {
    responseId: string;
    userTreatments: AuxiaAPIResponseDataUserTreatment[];
}

interface AuxiaProxyResponseData {
    responseId: string;
    userTreatment?: AuxiaAPIResponseDataUserTreatment;
}

const buildAuxiaAPIRequestPayload = (projectId: string, userId: string): AuxiaAPIRequestPayload => {
    // For the moment we are hard coding the data provided in contextualAttributes and surfaces.
    return {
        projectId: projectId,
        userId: userId,
        contextualAttributes: [
            {
                key: 'profile_id',
                stringValue: 'pr1234',
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

const fetchAuxiaData = async (
    apiKey: string,
    projectId: string,
    userId: string,
): Promise<AuxiaAPIResponseData> => {
    const url = 'https://apis.auxia.io/v1/GetTreatments';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildAuxiaAPIRequestPayload(projectId, userId);

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    const response = await fetch(url, params);

    const responseBody = await response.json();

    return Promise.resolve(responseBody as AuxiaAPIResponseData);
};

const buildAuxiaProxyResponseData = (auxiaData: AuxiaAPIResponseData): AuxiaProxyResponseData => {
    // Note the small difference between AuxiaAPIResponseData and AuxiaProxyResponseData
    // In the case of AuxiaProxyResponseData, we have an optional userTreatment field, instead of an array of userTreatments.
    // This is to reflect the what the client expect semantically.
    return {
        responseId: auxiaData.responseId,
        userTreatment: auxiaData.userTreatments[0],
    };
};

export const getAuxiaRouterConfig = async (): Promise<AuxiaRouterConfig> => {
    const apiKey = await getSsmValue('PROD', 'auxia-api-key');
    if (apiKey === undefined) {
        throw new Error('auxia-api-key is undefined');
    }

    const projectId = await getSsmValue('PROD', 'auxia-projectId');
    if (projectId === undefined) {
        throw new Error('auxia-projectId is undefined');
    }

    const userId = await getSsmValue('PROD', 'auxia-userId');
    if (userId === undefined) {
        throw new Error('auxia-userId is undefined');
    }

    return Promise.resolve({
        apiKey,
        projectId,
        userId,
    });
};

export const buildAuxiaProxyRouter = (config: AuxiaRouterConfig): Router => {
    const router = Router();
    router.post(
        '/auxia',

        // We are disabling that check for now, we will re-enable it later when we have a
        // better understanding of the request payload.
        // bodyContainsAllFields(['tracking', 'targeting']),

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const auxiaData = await fetchAuxiaData(
                    config.apiKey,
                    config.projectId,
                    config.userId,
                );
                const response = buildAuxiaProxyResponseData(auxiaData);

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
