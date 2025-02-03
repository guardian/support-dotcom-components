import express, { Router } from 'express';
import { getSsmValue } from '../utils/ssm';

// --------------------------------
// Basic Types
// --------------------------------

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
    userId: string;
}

interface AuxiaContextualAttributes {
    key: string;
    stringValue: string;
}

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
    contextualAttributes: AuxiaContextualAttributes[];
    surfaces: AuxiaSurface[];
    languageCode: string;
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
// Proxy Implementation
// --------------------------------

const buildAuxiaAPIRequestPayload = (
    projectId: string,
    userId: string,
): AuxiaAPIGetTreatmentsRequestPayload => {
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

const callGetTreatments = async (
    apiKey: string,
    projectId: string,
    userId: string,
): Promise<AuxiaAPIGetTreatmentsResponseData> => {
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

    return Promise.resolve(responseBody as AuxiaAPIGetTreatmentsResponseData);
};

const buildAuxiaProxyGetTreatmentsResponseData = (
    auxiaData: AuxiaAPIGetTreatmentsResponseData,
): AuxiaProxyGetTreatmentsResponseData => {
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
        '/auxia/get-treatments',

        // We are disabling that check for now, we will re-enable it later when we have a
        // better understanding of the request payload.
        // bodyContainsAllFields(['tracking', 'targeting']),

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const auxiaData = await callGetTreatments(
                    config.apiKey,
                    config.projectId,
                    config.userId,
                );
                const response = buildAuxiaProxyGetTreatmentsResponseData(auxiaData);

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
