import express, { Router } from 'express';
import { getSsmValue } from '../utils/ssm';
// import { fetchS3Data } from '../utils/S3';

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
    minimumTreatmentCount: number;
    maximumTreatmentCount: number;
}

interface AuxiaAPIRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaApiRequestPayloadContextualAttributes[];
    surfaces: AuxiaApiRequestPayloadSurface[];
    languageCode: string;
}

interface AuxiaAPIAnswerDataUserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

interface AuxiaAPIAnswerData {
    responseId: string;
    userTreatments: AuxiaAPIAnswerDataUserTreatment[];
}

interface AuxiaProxyResponseData {
    shouldShowSignInGate: boolean;
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
            {
                key: 'last_action',
                stringValue: 'button_x_clicked',
            },
        ],
        surfaces: [
            {
                surface: 'ARTICLE_PAGE',
                minimumTreatmentCount: 1,
                maximumTreatmentCount: 5,
            },
        ],
        languageCode: 'en-GB',
    };
};

const fetchAuxiaData = async (
    apiKey: string,
    projectId: string,
    userId: string,
): Promise<AuxiaAPIAnswerData> => {
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

    return Promise.resolve(responseBody as AuxiaAPIAnswerData);
};

const buildAuxiaProxyResponseData = (auxiaData: AuxiaAPIAnswerData): AuxiaProxyResponseData => {
    // This is the most important function of this router, it takes the answer from auxia and
    // and decides if the sign in gate should be shown or not.

    // In the current interpretation we are saying that a non empty userTreatments array means
    // that the sign in gate should be shown.

    const shouldShowSignInGate = auxiaData.userTreatments.length > 0;

    return { shouldShowSignInGate };
};

export const getAuxiaRouterConfig = async (): Promise<AuxiaRouterConfig> => {
    // -----------------------------------------------------------------
    // The SSM based code is not working for the moment (permission problems with ssm:GetParameter)
    // Will fix it later.

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

    // -----------------------------------------------------------------
    // Instead let's get the credentials from S3

    // const credentials1 = await fetchS3Data('support-admin-console', `PROD/auxia-credentials.json`);
    // const credentials2 = JSON.parse(credentials1);
    //
    // const apiKey = credentials2['auxia-api-key'] as string;
    // const projectId = credentials2['auxia-projectId'] as string;
    // const userId = credentials2['auxia-userId'] as string;

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
