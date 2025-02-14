import express, { Router } from 'express';
import { isProd } from '../lib/env';
import { getSsmValue } from '../utils/ssm';
import { bodyContainsAllFields } from '../middleware';

// --------------------------------
// Basic Types
// --------------------------------

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
}

// --------------------------------
// Auxia API Types
// --------------------------------

interface AuxiaAPIContextualAttributeString {
    key: string;
    stringValue: string;
}

interface AuxiaAPIContextualAttributeBoolean {
    key: string;
    boolValue: boolean;
}

interface AuxiaAPIContextualAttributeInteger {
    key: string;
    integerValue: number;
}

type AuxiaAPIGenericContexualAttribute =
    | AuxiaAPIContextualAttributeString
    | AuxiaAPIContextualAttributeBoolean
    | AuxiaAPIContextualAttributeInteger;

interface AuxiaAPISurface {
    surface: string;
    maximumTreatmentCount: number;
}

interface AuxiaAPIUserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

interface AuxiaAPIGetTreatmentsRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaAPIGenericContexualAttribute[];
    surfaces: AuxiaAPISurface[];
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
    userTreatments: AuxiaAPIUserTreatment[];
}

// --------------------------------
// Proxy Types
// --------------------------------

interface AuxiaProxyGetTreatmentsResponseData {
    responseId: string;
    userTreatment?: AuxiaAPIUserTreatment;
}

// --------------------------------
// Proxy Common Functions
// --------------------------------

export const getAuxiaRouterConfig = async (): Promise<AuxiaRouterConfig> => {
    const stage = isProd ? 'PROD' : 'CODE';

    const apiKey = await getSsmValue(stage, 'auxia-api-key');
    if (apiKey === undefined) {
        throw new Error('auxia-api-key is undefined');
    }

    const projectId = await getSsmValue(stage, 'auxia-projectId');
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

const guDefaultGetTreatmentsResponseData = (
    daily_article_count: number,
): AuxiaAPIGetTreatmentsResponseData => {
    const responseId = ''; // This value is not important, it is not used by the client.

    if (daily_article_count % 10 != 0) {
        // We show the GU gate every 10 pageviews
        return {
            responseId,
            userTreatments: [],
        };
    }

    const title = 'Register: it’s quick and easy';
    const subtitle = 'It’s still free to read – this is not a paywall';
    const body =
        'We’re committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to keep our journalism free for all. You’ll always be able to control your own';
    const second_cta_name = 'I’ll do it later';
    const privacy_button_name = 'privacy settings';
    const treatmentContent = {
        title,
        subtitle,
        body,
        first_cta_name: 'Sign in',
        first_cta_link: 'https://profile.theguardian.com/signin?',
        second_cta_name,
        second_cta_link: 'https://profile.theguardian.com/signin?',
        privacy_button_name,
    };
    const treatmentContentEncoded = JSON.stringify(treatmentContent);
    const userTreatment: AuxiaAPIUserTreatment = {
        treatmentId: 'default-treatment-id',
        treatmentTrackingId: 'default-treatment-tracking-id',
        rank: '1',
        contentLanguageCode: 'en-GB',
        treatmentContent: treatmentContentEncoded,
        treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
        surface: 'ARTICLE_PAGE',
    };
    const data: AuxiaAPIGetTreatmentsResponseData = {
        responseId,
        userTreatments: [userTreatment],
    };
    return data;
};

const callGetTreatments = async (
    apiKey: string,
    projectId: string,
    user_has_consented_to_personal_data_use: boolean,
    browserId: string,
    is_supporter: boolean,
    daily_article_count: number,
    article_identifier: string,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    // Here the behavior depends on the value of `user_has_consented_to_personal_data_use`
    // If true, we perform the normal API call to Auxia.
    // If false, we return a default answer (controlled by GU).

    if (!user_has_consented_to_personal_data_use) {
        const data = guDefaultGetTreatmentsResponseData(daily_article_count);
        return Promise.resolve(data);
    }

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
    user_has_consented_to_personal_data_use: boolean,
    browserId: string,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): Promise<void> => {
    // Here the behavior depends on the value of `user_has_consented_to_personal_data_use`
    // If true, we perform the normal API call to Auxia.
    // If false, we do nothing.

    if (!user_has_consented_to_personal_data_use) {
        return;
    }

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
            'user_has_consented_to_personal_data_use',
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
                    req.body.user_has_consented_to_personal_data_use,
                    req.body.browserId,
                    req.body.is_supporter,
                    req.body.daily_article_count,
                    req.body.article_identifier,
                );

                if (auxiaData !== undefined) {
                    const data = buildAuxiaProxyGetTreatmentsResponseData(auxiaData);
                    res.send({ status: true, data: data });
                } else {
                    res.send({ status: false });
                }
            } catch (error) {
                next(error);
            }
        },
    );

    router.post(
        '/auxia/log-treatment-interaction',
        bodyContainsAllFields([
            'user_has_consented_to_personal_data_use',
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
                    req.body.user_has_consented_to_personal_data_use,
                    req.body.browserId,
                    req.body.treatmentTrackingId,
                    req.body.treatmentId,
                    req.body.surface,
                    req.body.interactionType,
                    req.body.interactionTimeMicros,
                    req.body.actionName,
                );
                res.send({ status: true }); // this is the proxy's response, slightly more user's friendly than the api's response.
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
