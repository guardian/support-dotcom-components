import type express from 'express';
import { Router } from 'express';
import { isProd } from '../lib/env';
import { bodyContainsAllFields } from '../middleware';
import type { AuxiaAPIGetTreatmentsResponseData, AuxiaAPIUserTreatment } from '../signin-gate/lib';
import {
    articleIdentifierIsAllowed,
    buildAuxiaProxyGetTreatmentsResponseData,
    buildGetTreatmentsRequestPayload,
    buildLogTreatmentInteractionRequestPayload,
    guDefaultGateGetTreatmentsResponseData,
    isValidContentType,
    isValidSection,
    isValidTagIdCollection,
    mvtIdIsAuxiaAudienceShare,
} from '../signin-gate/lib';
import { getSsmValue } from '../utils/ssm';

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
}

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

const callGetTreatments = async (
    apiKey: string,
    projectId: string,
    browserId: string | undefined,
    isSupporter: boolean,
    dailyArticleCount: number,
    articleIdentifier: string,
    editionId: string,
    contentType: string,
    sectionId: string,
    tagIds: string[],
    gateDismissCount: number,
    countryCode: string,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    // The logic here is to perform a certain number of checks, each resulting with a different behavior.

    // First we check page metada to comply with Guardian policies

    if (
        !isValidContentType(contentType) ||
        !isValidSection(sectionId) ||
        !isValidTagIdCollection(tagIds) ||
        !articleIdentifierIsAllowed(articleIdentifier)
    ) {
        return Promise.resolve(undefined);
    }

    // Then we check if the user has consented to personal data use.
    // If the user has not consented, we call for the gu-default gate, which may or may not be served depending on
    // policies.

    if (browserId === undefined) {
        const data = guDefaultGateGetTreatmentsResponseData(dailyArticleCount, gateDismissCount);
        return Promise.resolve(data);
    }

    console.log('We have consent to use personal data');

    // We now have clearance to call the Auxia API.

    const url = 'https://apis.auxia.io/v1/GetTreatments';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildGetTreatmentsRequestPayload(
        projectId,
        browserId,
        isSupporter,
        dailyArticleCount,
        articleIdentifier,
        editionId,
        countryCode,
    );

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(url, params);
        const responseBody = (await response.json()) as {
            userTreatments: AuxiaAPIUserTreatment[] | undefined;
        };

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

const callLogTreatmentInteration = async (
    apiKey: string,
    projectId: string,
    browserId: string | undefined,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): Promise<void> => {
    // Here the behavior depends on the value of `undefined`
    // If present, we perform the normal API call to Auxia.
    // If undefined, we do nothing.

    if (browserId === undefined) {
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
            'isSupporter',
            'dailyArticleCount',
            'articleIdentifier',
            'editionId',
            'contentType',
            'sectionId',
            'tagIds',
            'gateDismissCount',
            'countryCode',
            'mvtId',
        ]),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const body = req.body as {
                    browserId: string | undefined; // optional field, will not be sent by the client is user has not consented to personal data use.
                    isSupporter: boolean;
                    dailyArticleCount: number; // [1]
                    articleIdentifier: string;
                    editionId: string;
                    contentType: string;
                    sectionId: string;
                    tagIds: string[];
                    gateDismissCount: number;
                    countryCode: string;
                    mvtId: number;
                    should_show_legacy_gate_tmp: boolean; // [2]
                };

                // [1] articleIdentifier examples:
                //  - 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
                //  - 'www.theguardian.com/tips'

                // [2] temporary attribute to help imminent rerouting of non Auxia audience share
                // to SDC, but without requiring a
                // full duplication of the client side logic into SDC.
                // See https://github.com/guardian/dotcom-rendering/pull/13944
                // for details.

                // As a first step of handling this request, we first check whether the call is from the Auxia
                // audience or the non Auxia audience. If it is from the non Auxia audience, then we follow the value of
                // should_show_legacy_gate_tmp to decide whether to return a default gate or not. If it is from the Auxia
                // audience, then we proceed with `callGetTreatments` as normal.

                let auxiaData;

                if (!mvtIdIsAuxiaAudienceShare(body.mvtId)) {
                    if (body.should_show_legacy_gate_tmp) {
                        auxiaData = guDefaultGateGetTreatmentsResponseData(
                            body.dailyArticleCount,
                            body.gateDismissCount,
                        );
                    } else {
                        auxiaData = undefined;
                    }
                } else {
                    auxiaData = await callGetTreatments(
                        config.apiKey,
                        config.projectId,
                        body.browserId,
                        body.isSupporter,
                        body.dailyArticleCount,
                        body.articleIdentifier,
                        body.editionId,
                        body.contentType,
                        body.sectionId,
                        body.tagIds,
                        body.gateDismissCount,
                        body.countryCode,
                    );
                }

                if (auxiaData !== undefined) {
                    const data = buildAuxiaProxyGetTreatmentsResponseData(auxiaData);
                    res.locals.auxiaTreatmentId = data?.userTreatment?.treatmentId;
                    res.locals.auxiaTreatmentTrackingId = data?.userTreatment?.treatmentTrackingId;
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
            'treatmentTrackingId',
            'treatmentId',
            'surface',
            'interactionType',
            'interactionTimeMicros',
            'actionName',
        ]),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const body = req.body as {
                    browserId: string | undefined; // optional field, will not be sent by the client is user has not consented to personal data use.
                    treatmentTrackingId: string;
                    treatmentId: string;
                    surface: string;
                    interactionType: string;
                    interactionTimeMicros: number;
                    actionName: string;
                };
                await callLogTreatmentInteration(
                    config.apiKey,
                    config.projectId,
                    body.browserId,
                    body.treatmentTrackingId,
                    body.treatmentId,
                    body.surface,
                    body.interactionType,
                    body.interactionTimeMicros,
                    body.actionName,
                );
                res.locals.auxiaTreatmentId = body.treatmentId;
                res.locals.auxiaTreatmentTrackingId = body.treatmentTrackingId;
                res.locals.auxiaInteractionType = body.interactionType;
                res.send({ status: true }); // this is the proxy's response, slightly more user's friendly than the api's response.
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
