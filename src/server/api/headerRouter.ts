import type express from 'express';
import { Router } from 'express';
import type {
    HeaderProps,
    HeaderTargeting,
    HeaderTest,
    TestTracking,
    Tracking,
} from '../../shared/types';
import type { ChannelSwitches } from '../channelSwitches';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import { getQueryParams } from '../lib/params';
import type { Params } from '../lib/params';
import { bodyContainsAllFields } from '../middleware';
import { selectHeaderTest } from '../tests/headers/headerSelection';
import type { ValueProvider } from '../utils/valueReloader';

interface HeaderDataResponse {
    data?: {
        module: {
            name: string;
            props: HeaderProps;
        };
        meta: TestTracking;
    };
}

export const buildHeaderRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tests: ValueProvider<HeaderTest[]>,
): Router => {
    const router = Router();

    const buildHeaderData = (
        targeting: HeaderTargeting,
        baseUrl: string,
        params: Params,
        req: express.Request,
    ): HeaderDataResponse => {
        const { enableHeaders } = channelSwitches.get();
        if (!enableHeaders) {
            return {};
        }
        const testSelection = selectHeaderTest(
            targeting,
            tests.get(),
            getDeviceType(req),
            params.force,
        );
        if (testSelection) {
            const { test, variant, moduleName } = testSelection;
            const testTracking: TestTracking = {
                abTestName: test.name,
                abTestVariant: variant.name,
                campaignCode: `header_support_${test.name}_${variant.name}`,
                componentType: 'ACQUISITIONS_HEADER',
            };

            return {
                data: {
                    module: {
                        name: moduleName,
                        props: {
                            content: variant.content,
                            mobileContent: variant.mobileContent,
                            tracking: testTracking as Tracking, // PageTracking is added client-side
                            countryCode: targeting.countryCode,
                            numArticles: targeting.numArticles,
                        },
                    },
                    meta: testTracking,
                },
            };
        }
        return { data: undefined };
    };

    router.post(
        '/header',
        bodyContainsAllFields(['targeting']),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildHeaderData(targeting, baseUrl(req), params, req);
                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
