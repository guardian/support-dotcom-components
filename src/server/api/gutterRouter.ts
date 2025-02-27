import express, { Router } from 'express';
import { bodyContainsAllFields } from '../middleware';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import {
    GutterProps,
    GutterTest,
    TestTracking,
    GutterTargeting,
    Tracking,
    hideSRMessagingForInfoPageIds,
} from '../../shared/types';
import { ChannelSwitches } from '../channelSwitches';
import { getDeviceType } from '../lib/deviceType';
import { ValueProvider } from '../utils/valueReloader';
import { selectGutterTest } from '../tests/gutters/gutterSelection';
import { buildGutterCampaignCode } from '../lib/tracking';

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
                componentType: 'ACQUISITIONS_OTHER', // TODO: TBC - ACQUISITIONS_GUTTER? Changes will need to be made to the Ophan pipeline.
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
