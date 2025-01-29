import express, { Router } from 'express';
import { bodyContainsAllFields } from '../middleware';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import {
    GutterProps,
    GutterTest,
    PageTracking,
    TestTracking,
    GutterTargeting,
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
        pageTracking: PageTracking,
        targeting: GutterTargeting,
        baseUrl: string,
        params: Params,
        req: express.Request,
    ): GutterDataResponse => {
        const { enableGutterLiveblogs } = channelSwitches.get();
        if (!enableGutterLiveblogs) {
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
                campaignCode: buildGutterCampaignCode(test.name, variant.name),
                componentType: 'ACQUISITIONS_OTHER', // TODO: TBC - ACQUISITIONS_GUTTER? Changes will need to be made to the Ophan pipeline.
            };

            return {
                data: {
                    module: {
                        name: moduleName,
                        props: {
                            content: variant.content,
                            tracking: { ...pageTracking, ...testTracking },
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
        '/gutter',
        bodyContainsAllFields(['tracking', 'targeting']),
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildGutterData(tracking, targeting, baseUrl(req), params, req);
                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
