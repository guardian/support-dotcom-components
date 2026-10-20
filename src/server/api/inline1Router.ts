import type express from 'express';
import { Router } from 'express';
import type { Inline1Props, Inline1Targeting, TestTracking } from '../../shared/types';
import type { ChannelSwitches } from '../channelSwitches';
import { pageIdIsExcluded } from '../lib/targeting';
import type { ValueProvider } from '../utils/valueReloader';

interface Inline1DataResponse {
    data?: {
        module: {
            name: string;
            props: Inline1Props;
        };
        meta: TestTracking;
    };
}

export const buildInline1Router = (channelSwitches: ValueProvider<ChannelSwitches>): Router => {
    const router = Router();

    const buildInline1Data = (targeting: Inline1Targeting): Inline1DataResponse => {
        const { enableInline1Tests } = channelSwitches.get();
        if (!enableInline1Tests) {
            return {};
        }

        if (pageIdIsExcluded(targeting)) {
            return {};
        }

        return { data: undefined };
    };

    router.post(
        '/inline1',
        (
            req: express.Request<Record<string, never>, unknown, { targeting: Inline1Targeting }>,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                const { targeting } = req.body;
                const authHeader = req.headers.authorization;

                const response = buildInline1Data(targeting);

                // for response logging
                res.locals.didRenderInline1 = !!response.data;
                res.locals.hasAuthorization = !!authHeader;

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
