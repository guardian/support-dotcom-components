import type express from 'express';
import { Router } from 'express';
import { z } from 'zod';
import type { ChannelSwitches } from '../channelSwitches';
import {
    createAuxiaInteractionToken,
    isValidAuxiaInteractionTokenSecret,
    verifyAuxiaInteractionToken,
} from '../lib/auxiaInteractionToken';
import { isProd } from '../lib/env';
import { bodyContainsAllFields, interactionRateLimiter } from '../middleware';
import {
    callAuxiaLogTreatmentInteration,
    gateTypeToUserTreatmentsEnvelop,
} from '../signin-gate/libEffect';
import {
    getTreatmentsRequestPayloadToGateType,
    userTreatmentsEnvelopToProxyGetTreatmentsAnswerData,
} from '../signin-gate/libPure';
import type { GetTreatmentsRequestPayload } from '../signin-gate/types';
import { getSsmValue } from '../utils/ssm';
import type { ValueProvider } from '../utils/valueReloader';

export interface AuxiaRouterConfig {
    apiKey: string;
    projectId: string;
    interactionTokenSecret: string;
}

export const getAuxiaRouterConfig = async (): Promise<AuxiaRouterConfig> => {
    const stage = isProd ? 'PROD' : 'CODE';

    const apiKey = await getSsmValue(stage, 'auxia-api-key', false);
    if (apiKey === undefined) {
        throw new Error('auxia-api-key is undefined');
    }

    const projectId = await getSsmValue(stage, 'auxia-projectId', false);
    if (projectId === undefined) {
        throw new Error('auxia-projectId is undefined');
    }

    const interactionTokenSecret = await getSsmValue(stage, 'auxia-interaction-token-secret', true);
    if (
        interactionTokenSecret === undefined ||
        !isValidAuxiaInteractionTokenSecret(interactionTokenSecret)
    ) {
        throw new Error(
            'auxia-interaction-token-secret must be configured as a 32-byte SecureString encoded in hex',
        );
    }

    return Promise.resolve({
        apiKey,
        projectId,
        interactionTokenSecret,
    });
};

const logGateInteractionRequestSchema = z
    .object({
        interactionToken: z.string().min(1),
        interactionType: z.enum(['VIEWED', 'CLICKED', 'DISMISSED']),
        actionName: z.enum([
            'PRIVACY-BUTTON',
            'REGISTER-LINK',
            'SIGN-IN-LINK',
            'HOW-TO-LINK',
            'WHY-LINK',
            'HELP-LINK',
            '',
        ]),
    })
    .refine(
        ({ interactionType, actionName }) =>
            interactionType === 'CLICKED' ? actionName !== '' : actionName === '',
        'Action name must match the interaction type',
    );

// --------------------------------
// Router
// --------------------------------

export const buildAuxiaProxyRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    config: AuxiaRouterConfig,
): Router => {
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
        //     'hideSupportMessagingTimestamp'

        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const now = Date.now(); // current time in milliseconds since epoch
                const payload = req.body as GetTreatmentsRequestPayload;
                const { enableAuxia, enableGandalfSignInGate } = channelSwitches.get();
                const gateType = getTreatmentsRequestPayloadToGateType(
                    payload,
                    now,
                    enableAuxia,
                    // Tolerate old switch documents without the field: an
                    // absent switch means the Gandalf journey is off.
                    enableGandalfSignInGate ?? false,
                );
                res.locals.signInGateType = gateType;
                const envelop = await gateTypeToUserTreatmentsEnvelop(config, gateType, payload);
                if (envelop !== undefined) {
                    const data = userTreatmentsEnvelopToProxyGetTreatmentsAnswerData(envelop);
                    if (
                        gateType === 'AuxiaAPI' &&
                        payload.browserId &&
                        data?.userTreatment &&
                        data.userTreatment.treatmentId !== 'default-treatment-id'
                    ) {
                        data.interactionToken = createAuxiaInteractionToken(
                            config.interactionTokenSecret,
                            {
                                aud: 'sign-in-gate',
                                browserId: payload.browserId,
                                treatmentTrackingId: data.userTreatment.treatmentTrackingId,
                                treatmentId: data.userTreatment.treatmentId,
                                surface: data.userTreatment.surface,
                            },
                        );
                    }
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
        interactionRateLimiter,
        bodyContainsAllFields(['interactionToken', 'interactionType', 'actionName']),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const parsedBody = logGateInteractionRequestSchema.safeParse(req.body);
                if (!parsedBody.success) {
                    res.sendStatus(400);
                    return;
                }

                const { interactionToken, interactionType, actionName } = parsedBody.data;
                const claims = verifyAuxiaInteractionToken(
                    config.interactionTokenSecret,
                    interactionToken,
                    'sign-in-gate',
                );
                if (!claims) {
                    res.sendStatus(403);
                    return;
                }

                await callAuxiaLogTreatmentInteration(
                    config.apiKey,
                    config.projectId,
                    claims.browserId,
                    claims.treatmentTrackingId,
                    claims.treatmentId,
                    claims.surface,
                    interactionType,
                    Date.now() * 1000,
                    actionName,
                );
                res.locals.auxiaTreatmentId = claims.treatmentId;
                res.locals.auxiaTreatmentTrackingId = claims.treatmentTrackingId;
                res.locals.auxiaInteractionType = interactionType;
                res.send({ status: true }); // this is the proxy's response, slightly more user's friendly than the api's response.
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
