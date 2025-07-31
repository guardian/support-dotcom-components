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
    guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment,
    guDefaultGateGetTreatmentsResponseData,
    guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment,
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
    countryCode: string,
    hasConsented: boolean,
    shouldServeDismissible: boolean,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    // We now have clearance to call the Auxia API.

    // If the browser id could not be recovered client side, then we do not call auxia
    if (browserId === undefined) {
        return;
    }

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
        hasConsented,
        shouldServeDismissible,
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
    // If the browser id could not be recovered client side, then we do not call auxia
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

type ShowGateValues = 'true' | 'mandatory' | 'dismissible' | undefined;

export interface GetTreatmentRequestBody {
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
    hasConsented: boolean;
    shouldServeDismissible: boolean; // [3]
    showDefaultGate: ShowGateValues; // [4]
}

// [1] articleIdentifier examples:
//  - 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
//  - 'www.theguardian.com/tips'

// [2] temporary attribute to help imminent rerouting of non Auxia audience share
// to SDC, but without requiring a
// full duplication of the client side logic into SDC.
// See https://github.com/guardian/dotcom-rendering/pull/13944
// for details.

// [3]
// date: 03rd July 2025
// If shouldServeDismissible, we should show a dismissible (not mandatory) gate.

// [4]

// date: 25rd July 2025
// author: Pascal

// In order to facilitate internal testing, this attribute, when defined, forces
// the display of a sign-in gate. The values 'true' and 'dismissible' displays the
// dismissible variant of the gu default gate, and the value 'mandatory' displays
// the mandatory variant of the gu default gate.

// Note that this attributes override the value of should_show_legacy_gate_tmp.

export const getTreatments = async (
    config: AuxiaRouterConfig,
    body: GetTreatmentRequestBody,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    // This function gets the body of a '/auxia/get-treatments' request and return the data to post to the client
    // or undefined.

    // In the case that
    //
    //    1. body.shouldServeDismissible is true
    //       (which at the moment is controlled by
    //       utm_source=newsshowcase, via DRC:decideShouldServeDismissible), and
    //
    //    2. body.showDefaultGate is defined (regardless of its value)
    //
    // Then we serve a non dismissible gate. In other words
    // body.shouldServeDismissible take priority over the fact that body.showDefaultGate
    // could possibly have value 'mandatory'

    if (body.showDefaultGate !== undefined && body.shouldServeDismissible) {
        const data: AuxiaAPIGetTreatmentsResponseData = {
            responseId: '',
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        return data;
    }

    // The attribute showDefaultGate overrides any other behavior

    if (body.showDefaultGate) {
        if (body.showDefaultGate == 'mandatory') {
            const data: AuxiaAPIGetTreatmentsResponseData = {
                responseId: '',
                userTreatments: [guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment()],
            };
            return data;
        } else {
            const data: AuxiaAPIGetTreatmentsResponseData = {
                responseId: '',
                userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
            };
            return data;
        }
    }

    // Then, we need to check whether we are in Ireland ot not. If we are in Ireland
    // as a consequence of the great Ireland opening of May 2025 (tm), we send the entire
    // traffic (consented or not consented) to Auxia. (For privacy vigilantes reading this,
    // Auxia is not going to process non consented traffic for targetting.)

    if (body.countryCode === 'IE') {
        const answerFromAuxia = await callGetTreatments(
            config.apiKey,
            config.projectId,
            body.browserId,
            body.isSupporter,
            body.dailyArticleCount,
            body.articleIdentifier,
            body.editionId,
            body.countryCode,
            body.hasConsented,
            body.shouldServeDismissible,
        );

        if (body.hasConsented) {
            // If the user had consented we return the answer from Auxia
            return answerFromAuxia;
        } else {
            // Otherwise we still make the call, but we return the default gate

            // We have made the call to Auxia and synchronously waited for the answer
            // (We will improve this in a future change).
            // We now decide whether to send back the default gate
            if (body.should_show_legacy_gate_tmp) {
                const auxiaData = guDefaultGateGetTreatmentsResponseData(
                    body.dailyArticleCount,
                    body.gateDismissCount,
                );
                return Promise.resolve(auxiaData);
            } else {
                return Promise.resolve(undefined);
            }
        }
    }

    // Then, we check whether the call is from the Auxia audience or the non Auxia audience.
    // If it is from the non Auxia audience, then we follow the value of
    // should_show_legacy_gate_tmp to decide whether to return a default gate or not.

    // If it is from the Auxia audience, then  move to the next section

    // Note that "Auxia audience" and "non Auxia audience" are concepts from the way the audience
    // was split between 35% expose to the Auxia gate and 65% being shown the default GU gate
    // That split used to be done client side, but it's now been moved to SDC and is driven by
    // `mvtIdIsAuxiaAudienceShare`.

    if (!mvtIdIsAuxiaAudienceShare(body.mvtId)) {
        if (body.should_show_legacy_gate_tmp) {
            const auxiaData = guDefaultGateGetTreatmentsResponseData(
                body.dailyArticleCount,
                body.gateDismissCount,
            );
            return Promise.resolve(auxiaData);
        } else {
            return Promise.resolve(undefined);
        }
    }

    // ---------------------------------------------------------------------
    // If we reached this point, then we are the Auxia share of the audience
    // ---------------------------------------------------------------------

    // First we check page metada to comply with Guardian policies.
    // If the policies are not met, then we do not display a gate

    if (
        !isValidContentType(body.contentType) ||
        !isValidSection(body.sectionId) ||
        !isValidTagIdCollection(body.tagIds) ||
        !articleIdentifierIsAllowed(body.articleIdentifier)
    ) {
        return Promise.resolve(undefined);
    }

    // Then we check whether or not the user has consented for the use of third parties
    // If they have not, we attempt to return the default gate.
    // Note that `guDefaultGateGetTreatmentsResponseData` performs some checks
    // using `dailyArticleCount` and `dailyArticleCount`
    // Note: we could, one day, move the check outside the function itself (not very important right now)

    if (!body.hasConsented) {
        const data = guDefaultGateGetTreatmentsResponseData(
            body.dailyArticleCount,
            body.gateDismissCount,
        );
        return Promise.resolve(data);
    }

    return callGetTreatments(
        config.apiKey,
        config.projectId,
        body.browserId,
        body.isSupporter,
        body.dailyArticleCount,
        body.articleIdentifier,
        body.editionId,
        body.countryCode,
        body.hasConsented, // [1]
        body.shouldServeDismissible,
    );

    // [1] here the value should be true, because it's only in Ireland that we send non consented
    // requests to Auxia, and this should have happened earlier.
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
            'should_show_legacy_gate_tmp',
            'hasConsented',
            'shouldServeDismissible',
        ]),

        // The following attributes are used but are nullable,
        // so are not in the mandatory set of payload fields (as defined above).
        // Nullable attributes:
        //     'browserId'
        //     'showDefaultGate'

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const getTreatmentRequestBody = req.body as GetTreatmentRequestBody;
                const auxiaData = await getTreatments(config, getTreatmentRequestBody);
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
