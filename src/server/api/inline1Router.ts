import type express from 'express';
import { Router } from 'express';
import type {
    Inline1Props,
    Inline1Targeting,
    Inline1Test,
    TestTracking,
    Tracking,
} from '../../shared/types';
import type { ChannelSwitches } from '../channelSwitches';
import type { ContributionsOnlyCountriesConfig } from '../contributionsOnly';
import { getDeviceType } from '../lib/deviceType';
import type { MParticle, MParticleProfile } from '../lib/mParticle';
import type { Okta } from '../lib/okta';
import { pageIdIsExcluded } from '../lib/targeting';
import { selectInline1Test } from '../tests/inline1/inline1Selection';
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

export const buildInline1Router = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tests: ValueProvider<Inline1Test[]>,
    mParticle: MParticle,
    okta: Okta,
    contributionsOnlyCountriesConfig: ValueProvider<ContributionsOnlyCountriesConfig>,
): Router => {
    const router = Router();

    const buildInline1Data = async (
        targeting: Inline1Targeting,
        req: express.Request,
        getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    ): Promise<Inline1DataResponse> => {
        const { enableInline1Tests } = channelSwitches.get();
        if (!enableInline1Tests) {
            return {};
        }

        if (pageIdIsExcluded(targeting)) {
            return {};
        }

        const testSelection = await selectInline1Test(
            targeting,
            tests.get(),
            getDeviceType(req),
            getMParticleProfile,
            contributionsOnlyCountriesConfig.get().contributionsOnlyCountries,
        );

        if (!testSelection) {
            return { data: undefined };
        }

        const { test, variant } = testSelection;
        const testTracking: TestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: `${test.name}_${variant.name}`,
            componentType: 'ACQUISITIONS_OTHER',
        };
        const inline1Props: Inline1Props = {
            variant: variant,
            tracking: testTracking as Tracking,
            countryCode: targeting.countryCode,
        };

        return {
            data: {
                module: {
                    name: variant.name,
                    props: inline1Props,
                },
                meta: testTracking,
            },
        };
    };

    router.post(
        '/inline1',
        async (
            req: express.Request<Record<string, never>, unknown, { targeting: Inline1Targeting }>,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                const { targeting } = req.body;
                const authHeader = req.headers.authorization;
                const { fetchProfile, forLogging: mParticleLogging } = mParticle.getProfileFetcher(
                    channelSwitches.get(),
                    okta,
                    authHeader,
                    targeting.isSignedIn ? undefined : targeting.browserId,
                );
                const response = await buildInline1Data(targeting, req, fetchProfile);

                // for response logging
                res.locals.didRenderInline1 = !!response.data;
                const { mParticleProfileStatus, mParticleProfileSource } = mParticleLogging();
                res.locals.hasAuthorization = !!authHeader;
                res.locals.gotMParticleProfile = mParticleProfileStatus === 'found';
                res.locals.mParticleProfileStatus = mParticleProfileStatus;
                res.locals.mParticleProfileSource = mParticleProfileSource;

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
