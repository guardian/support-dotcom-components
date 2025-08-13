import type express from 'express';
import { Router } from 'express';
import { isProd } from '../lib/env';
import { bodyContainsAllFields } from '../middleware';
import {
    buildAuxiaProxyGetTreatmentsResponseData,
    buildLogTreatmentInteractionRequestPayload,
    decideGateTypeFromGetTreatmentsRequestPayload,
    gateTypeToGate,
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
    gateDisplayCount: number; // [5]
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

// [5] (comment group: 04f093f0)

// date: 11 Aug 2025
// author: Pascal

// gateDisplayCount was introduced to enrich the behavior of the default gate.
// That number represents the number of times the gate has been displayed, excluding the
// current rendering. Therefore the first time the number is 0.

// At the time these lines are written we want the experience for non consented users
// in Ireland, to be that the gates, as they display are (first line) corresponding
// to values of gateDisplayCount (second line)
//  -------------------------------------------------------------------------
// | dismissible | dismissible | dismissible | mandatory (remains mandatory) |
// |     0       |      1      |      2      |      3           etc          |
//  -------------------------------------------------------------------------

// For non consenting users outside ireland, the behavior doesn't change, we serve
// dismissible gates

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
            'gateDisplayCount',
        ]),

        // The following attributes are used but are nullable,
        // so are not in the mandatory set of payload fields (as defined above).
        // Nullable attributes:
        //     'browserId'
        //     'showDefaultGate'

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const getTreatmentRequestBody = req.body as GetTreatmentRequestBody;
                const gateType =
                    decideGateTypeFromGetTreatmentsRequestPayload(getTreatmentRequestBody);
                const auxiaData = await gateTypeToGate(config, gateType, getTreatmentRequestBody);
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
