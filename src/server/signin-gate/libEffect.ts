// --------------------------------------------------------
// Effect Functions
// --------------------------------------------------------

import type { AuxiaRouterConfig } from '../api/auxiaProxyRouter';
import {
    buildGetTreatmentsRequestPayload,
    buildLogTreatmentInteractionRequestPayload,
    guDismissibleUserTreatment,
    guMandatoryUserTreatment,
} from './libPure';
import type { GetTreatmentsRequestPayload, UserTreatment, UserTreatmentsEnvelop } from './types';
import { GateType } from './types';

export const callAuxiaGetTreatments = async (
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
): Promise<UserTreatmentsEnvelop | undefined> => {
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
            userTreatments: UserTreatment[] | undefined;
        };

        // nb: In some circumstances, for instance if the payload although having the right
        // schema, is going to fail Auxia's validation then the response body may not contain
        // the userTreatments field. In this case we return undefined.
        if (responseBody['userTreatments'] === undefined) {
            return Promise.resolve(undefined);
        }
        const data = responseBody as UserTreatmentsEnvelop;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.resolve(undefined);
    }
};

export const gateTypeToUserTreatmentsEnvelop = async (
    config: AuxiaRouterConfig,
    gateType: GateType,
    getTreatmentsRequestPayload: GetTreatmentsRequestPayload,
): Promise<UserTreatmentsEnvelop | undefined> => {
    switch (gateType) {
        case GateType.None:
            return Promise.resolve(undefined);
        case GateType.GuDismissible:
            return {
                responseId: '',
                userTreatments: [guDismissibleUserTreatment()],
            };
        case GateType.GuMandatory:
            return {
                responseId: '',
                userTreatments: [guDismissibleUserTreatment()],
            };
        case GateType.Auxia:
            return await callAuxiaGetTreatments(
                config.apiKey,
                config.projectId,
                getTreatmentsRequestPayload.browserId,
                getTreatmentsRequestPayload.isSupporter,
                getTreatmentsRequestPayload.dailyArticleCount,
                getTreatmentsRequestPayload.articleIdentifier,
                getTreatmentsRequestPayload.editionId,
                getTreatmentsRequestPayload.countryCode,
                getTreatmentsRequestPayload.hasConsented,
                getTreatmentsRequestPayload.shouldServeDismissible,
            );
        case GateType.AuxiaAnalyticThenNone:
            await callAuxiaGetTreatments(
                config.apiKey,
                config.projectId,
                getTreatmentsRequestPayload.browserId,
                getTreatmentsRequestPayload.isSupporter,
                getTreatmentsRequestPayload.dailyArticleCount,
                getTreatmentsRequestPayload.articleIdentifier,
                getTreatmentsRequestPayload.editionId,
                getTreatmentsRequestPayload.countryCode,
                getTreatmentsRequestPayload.hasConsented,
                getTreatmentsRequestPayload.shouldServeDismissible,
            );
            return Promise.resolve(undefined);
        case GateType.AuxiaAnalyticThenGuDismissible:
            await callAuxiaGetTreatments(
                config.apiKey,
                config.projectId,
                getTreatmentsRequestPayload.browserId,
                getTreatmentsRequestPayload.isSupporter,
                getTreatmentsRequestPayload.dailyArticleCount,
                getTreatmentsRequestPayload.articleIdentifier,
                getTreatmentsRequestPayload.editionId,
                getTreatmentsRequestPayload.countryCode,
                getTreatmentsRequestPayload.hasConsented,
                getTreatmentsRequestPayload.shouldServeDismissible,
            );
            return {
                responseId: '',
                userTreatments: [guDismissibleUserTreatment()],
            };
        case GateType.AuxiaAnalyticThenGuMandatory:
            await callAuxiaGetTreatments(
                config.apiKey,
                config.projectId,
                getTreatmentsRequestPayload.browserId,
                getTreatmentsRequestPayload.isSupporter,
                getTreatmentsRequestPayload.dailyArticleCount,
                getTreatmentsRequestPayload.articleIdentifier,
                getTreatmentsRequestPayload.editionId,
                getTreatmentsRequestPayload.countryCode,
                getTreatmentsRequestPayload.hasConsented,
                getTreatmentsRequestPayload.shouldServeDismissible,
            );
            return {
                responseId: '',
                userTreatments: [guMandatoryUserTreatment()],
            };
        default:
            console.error('Unknown direction');
    }
};

export const callAuxiaLogTreatmentInteration = async (
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
