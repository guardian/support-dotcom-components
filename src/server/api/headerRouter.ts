import type express from 'express';
import { Router } from 'express';
import type {
    HeaderProps,
    HeaderTargeting,
    HeaderTest,
    TestTracking,
    Tracking,
} from '../../shared/types';
import type { ExclusionSettings } from '../channelExclusions';
import type { ChannelSwitches } from '../channelSwitches';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import type { MParticle, MParticleProfile } from '../lib/mParticle';
import type { Okta } from '../lib/okta';
import { getQueryParams } from '../lib/params';
import type { Params } from '../lib/params';
import { bodyContainsAllFields } from '../middleware';
import { selectHeaderTest } from '../tests/headers/headerSelection';
import { inExclusions } from '../utils/channelExclusionsMatcher';
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
    mParticle: MParticle,
    okta: Okta,
    channelExclusions: ValueProvider<ExclusionSettings>,
): Router => {
    const router = Router();

    const buildHeaderData = async (
        targeting: HeaderTargeting,
        baseUrl: string,
        params: Params,
        req: express.Request,
        getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    ): Promise<HeaderDataResponse> => {
        const { enableHeaders } = channelSwitches.get();
        const channelExclusionsData = channelExclusions.get();
        if (!enableHeaders) {
            return {};
        }

        if (inExclusions(targeting, channelExclusionsData.header)) {
            return {};
        }

        const testSelection = await selectHeaderTest(
            targeting,
            tests.get(),
            getDeviceType(req),
            getMParticleProfile,
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
        async (
            req: express.Request<Record<string, never>, unknown, { targeting: HeaderTargeting }>,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                const { targeting } = req.body;
                const params = getQueryParams(req.query);

                const authHeader = req.headers.authorization;
                const { fetchProfile, forLogging } = mParticle.getProfileFetcher(
                    channelSwitches.get(),
                    okta,
                    authHeader,
                );

                const response = await buildHeaderData(
                    targeting,
                    baseUrl(req),
                    params,
                    req,
                    fetchProfile,
                );

                // for response logging
                res.locals.didRenderHeader = !!response.data;
                res.locals.hasAuthorization = !!authHeader;
                res.locals.gotMParticleProfile = forLogging() === 'found';
                res.locals.mParticleProfileStatus = forLogging();

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
