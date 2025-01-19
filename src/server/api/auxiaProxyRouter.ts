import express, { Router } from 'express';
import { bodyContainsAllFields } from '../middleware';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import {
    HeaderProps,
    HeaderTargeting,
    HeaderTest,
    PageTracking,
    TestTracking,
} from '../../shared/types';
import { ChannelSwitches } from '../channelSwitches';
import { selectHeaderTest } from '../tests/headers/headerSelection';
import { getDeviceType } from '../lib/deviceType';
import { ValueProvider } from '../utils/valueReloader';

interface AuxiaAPIRequestPayload {
    data: string;
}

interface AuxiaAPIAnswerData {
    data: string;
}

interface AuxiaProxyResponseData {
    shouldShowSignInGate: boolean;
}

const buildAuxiaAPIRequestPayload = (): AuxiaAPIRequestPayload => {
    return {
        data: '',
    };
};

const fetchAuxiaData = async (): Promise<AuxiaAPIAnswerData> => {
    const payload = buildAuxiaAPIRequestPayload();
    const answer = {
        data: '',
    };
    return Promise.resolve(answer);
};

const buildAuxiaProxyResponseData = (auxiaData: AuxiaAPIAnswerData): AuxiaProxyResponseData => {
    return { shouldShowSignInGate: false };
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
                // req.body is a JSON that can be easily decronstructed
                // const { tracking, targeting } = req.body;

                // We do not need to read query parameters in this case.
                // const params = getQueryParams(req.query);

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
