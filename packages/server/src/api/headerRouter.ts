import express, { Router } from 'express';
import { bodyContainsAllFields } from '../middleware';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import { HeaderProps, HeaderTargeting, PageTracking, TestTracking } from '@sdc/shared/dist/types';
import { ChannelSwitches } from '../channelSwitches';
import { selectHeaderTest } from '../tests/headers/headerSelection';
import { isMobile } from '../lib/deviceType';
import { ValueReloader } from '../utils/valueReloader';

interface HeaderDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: HeaderProps;
        };
        meta: TestTracking;
    };
}

// TODO - pass in dependencies instead of using cacheAsync
export const buildHeaderRouter = (channelSwitches: ValueReloader<ChannelSwitches>): Router => {
    const router = Router();

    const buildHeaderData = async (
        pageTracking: PageTracking,
        targeting: HeaderTargeting,
        baseUrl: string,
        params: Params,
        req: express.Request,
    ): Promise<HeaderDataResponse> => {
        const { enableHeaders } = channelSwitches.get();
        if (!enableHeaders) {
            return {};
        }
        const testSelection = await selectHeaderTest(targeting, isMobile(req), params.force);
        if (testSelection) {
            const { test, variant, modulePathBuilder, moduleName } = testSelection;
            const testTracking: TestTracking = {
                abTestName: test.name,
                abTestVariant: variant.name,
                campaignCode: `header_support_${test.name}_${variant.name}`,
                componentType: 'ACQUISITIONS_HEADER',
            };

            return {
                data: {
                    module: {
                        url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
                        name: moduleName,
                        props: {
                            content: variant.content,
                            mobileContent: variant.mobileContent,
                            tracking: { ...pageTracking, ...testTracking },
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
        bodyContainsAllFields(['tracking', 'targeting']),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = await buildHeaderData(
                    tracking,
                    targeting,
                    baseUrl(req),
                    params,
                    req,
                );
                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
