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

interface AuxiaResponseData {
    shouldShowSignInGate: boolean;
}

export const buildAuxiaRouter = (): Router => {
    const router = Router();

    const makeResponse = (): AuxiaResponseData => {
        return { shouldShowSignInGate: false };
    };

    router.post(
        '/auxia',

        // We are disabling that check for now, we will re-enable itlater when we have a
        // better understanding of the request payload.
        // bodyContainsAllFields(['tracking', 'targeting']),

        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                // req.body is a JSON that can be easily decronstructed
                // const { tracking, targeting } = req.body;

                // We do not need to read query parameters in this case.
                // const params = getQueryParams(req.query);

                const response = makeResponse();
                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
