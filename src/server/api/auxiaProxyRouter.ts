import express, { Router } from 'express';
import { getSsmValue } from '../utils/ssm';

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

/*
    user treatments example:
    {
        "treatmentId": "105867",
        "treatmentTrackingId": "105867_336_b352c123-c298-493c-a794-90852ec24961",
        "rank": "2",
        "contentLanguageCode": "en-GB",
        "treatmentContent": "{\"title\":\"Create a free account\",\"body\":\"\",\"first_cta_name\":\"Register\",\"first_cta_link\":\"https://profile.theguardian.com/signin?\",\"second_cta_name\":\"Next time\",\"second_cta_link\":\"https://profile.theguardian.com/signin?\",\"subtitle\":\"\"}",
        "treatmentType": "DISMISSABLE_SIGN_IN_GATE",
        "surface": "ARTICLE_PAGE"
    }
*/

interface AuxiaAPIAnswerData {
    responseId: string;
    userTreatments: AuxiaAPIAnswerDataUserTreatment[];
}

interface AuxiaProxyResponseData {
    shouldShowSignInGate: boolean;
}

const buildAuxiaAPIRequestPayload = async (): Promise<AuxiaAPIRequestPayload> => {
    const projectId = await getSsmValue('PROD', 'auxia-projectId');
    if (projectId === undefined) {
        throw new Error('auxia-projectId is undefined');
    }

    const userId = await getSsmValue('PROD', 'auxia-userId');
    if (userId === undefined) {
        throw new Error('auxia-userId is undefined');
    }

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

const fetchAuxiaData = async (): Promise<AuxiaAPIAnswerData> => {
    const url = 'https://apis.auxia.io/v1/GetTreatments';

    // We are hardcoding PROD for the moment, because I haven't created a CODE key
    const apiKey = await getSsmValue('PROD', 'auxia-api-key');

    if (apiKey === undefined) {
        throw new Error('auxia-api-key is undefined');
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = await buildAuxiaAPIRequestPayload();

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    const response = await fetch(url, params);

    const responseBody = await response.json();
    console.log(`[767c53e5] auxia api answer body json: ${JSON.stringify(responseBody)}`);

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

export const buildAuxiaProxyRouter = (): Router => {
    const router = Router();

    router.post(
        '/auxia',

        // We are disabling that check for now, we will re-enable it later when we have a
        // better understanding of the request payload.
        // bodyContainsAllFields(['tracking', 'targeting']),

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                console.log('[ff054a69] processing a query to the auxia end point');
                const auxiaData = await fetchAuxiaData();
                const response = buildAuxiaProxyResponseData(auxiaData);

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
