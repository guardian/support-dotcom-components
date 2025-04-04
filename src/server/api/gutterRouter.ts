import type express from 'express';
import { Router } from 'express';
import type {
    GutterProps,
    GutterTargeting,
    GutterTest,
    TestTracking,
    Tracking,
} from '../../shared/types';
import { hideSRMessagingForInfoPageIds } from '../../shared/types';
import type { ChannelSwitches } from '../channelSwitches';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import { getQueryParams } from '../lib/params';
import type { Params } from '../lib/params';
import { buildGutterCampaignCode } from '../lib/tracking';
import { bodyContainsAllFields } from '../middleware';
import { selectGutterTest } from '../tests/gutters/gutterSelection';
import type { ValueProvider } from '../utils/valueReloader';

interface GutterDataResponse {
    data?: {
        module: {
            name: string;
            props: GutterProps;
        };
        meta: TestTracking;
    };
}

export const buildGutterRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tests: ValueProvider<GutterTest[]>,
): Router => {
    const router = Router();

    const buildGutterData = (
        targeting: GutterTargeting,
        baseUrl: string,
        params: Params,
        req: express.Request,
    ): GutterDataResponse => {
        const { enableGutterLiveblogs } = channelSwitches.get();
        if (!enableGutterLiveblogs) {
            return {};
        }

        if (hideSRMessagingForInfoPageIds(targeting)) {
            return {};
        }

        const testSelection = selectGutterTest(
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
                campaignCode: buildGutterCampaignCode(test, variant),
                componentType: 'ACQUISITIONS_GUTTER',
            };

            return {
                data: {
                    module: {
                        name: moduleName,
                        props: {
                            content: variant.content,
                            tracking: testTracking as Tracking, // PageTracking is added client-side
                            countryCode: targeting.countryCode,
                        },
                    },
                    meta: testTracking,
                },
            };
        }
        return { data: undefined };
    };

    router.post(
        '/gutter-liveblog',
        bodyContainsAllFields(['targeting']),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildGutterData(targeting, baseUrl(req), params, req);
                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
