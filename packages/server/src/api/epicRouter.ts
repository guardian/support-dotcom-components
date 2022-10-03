import express, { Router } from 'express';
import {
    EpicProps,
    EpicTargeting,
    EpicTest,
    EpicType,
    EpicVariant,
    PageTracking,
    TestTracking,
    WeeklyArticleLog,
} from '@sdc/shared/dist/types';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import { cachedChannelSwitches } from '../channelSwitches';
import { Debug, findForcedTestAndVariant, findTestAndVariant } from '../tests/epics/epicSelection';
import { cachedChoiceCardAmounts } from '../choiceCardAmounts';
import { getTickerSettings } from '../lib/fetchTickerData';
import { buildCampaignCode, getReminderFields } from '@sdc/shared/dist/lib';
import { getArticleViewCounts } from '../lib/history';
import {
    epic as epicModule,
    liveblogEpic as liveblogEpicModule,
    ModuleInfo,
} from '@sdc/shared/dist/config';
import { fallbackEpicTest } from '../tests/epics/fallback';
import { logWarn } from '../utils/logging';
import { cacheAsync } from '../lib/cache';
import { fetchConfiguredEpicTests } from '../tests/epics/epicTests';
import { fetchSuperModeArticles } from '../lib/superMode';
import { isMobile } from '../lib/deviceType';
import {
    climate_2022_AUS,
    climate_2022_EUROW,
    climate_2022_UKUS,
} from '../tests/epics/epicEnvironmentMoment2022';
import environmentArticleCountTest from '../tests/epics/environmentArticleCountTest';

interface EpicDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: EpicProps;
        };
        variant: EpicVariant;
        meta: TestTracking;
    };
    debug?: Debug;
}

const fetchConfiguredArticleEpicTestsCached = cacheAsync(() => fetchConfiguredEpicTests('Epic'), {
    ttlSec: 60,
});

const fetchConfiguredArticleEpicHoldbackTestsCached = cacheAsync(
    () => fetchConfiguredEpicTests('EpicHoldback'),
    { ttlSec: 60 },
);

const fetchConfiguredLiveblogEpicTestsCached = cacheAsync(
    () => fetchConfiguredEpicTests('EpicLiveblog'),
    { ttlSec: 60 },
);

const fetchSuperModeArticlesCached = cacheAsync(fetchSuperModeArticles, { ttlSec: 60 });

// Any hardcoded epic tests should go here. They will take priority over any tests from the epic tool.
const hardcodedEpicTests: EpicTest[] = [
    climate_2022_AUS,
    climate_2022_EUROW,
    climate_2022_UKUS,
    ...environmentArticleCountTest,
];

// TODO - pass in dependencies instead of using cacheAsync
export const buildEpicRouter = (): Router => {
    const router = Router();

    const getArticleEpicTests = async (
        mvtId: number,
        isForcingTest: boolean,
        enableHardcodedEpicTests: boolean,
    ): Promise<EpicTest[]> => {
        try {
            const [regular, holdback] = await Promise.all([
                fetchConfiguredArticleEpicTestsCached(),
                fetchConfiguredArticleEpicHoldbackTestsCached(),
            ]);

            const hardcodedTests = enableHardcodedEpicTests ? hardcodedEpicTests : [];

            if (isForcingTest) {
                return [...hardcodedTests, ...regular, ...holdback, fallbackEpicTest];
            }

            const shouldHoldBack = mvtId % 100 === 0; // holdback 1% of the audience
            if (shouldHoldBack) {
                return [...holdback];
            }

            return [...hardcodedTests, ...regular, fallbackEpicTest];
        } catch (err) {
            logWarn(`Error getting article epic tests: ${err}`);

            return [fallbackEpicTest];
        }
    };

    const getLiveblogEpicTests = async (): Promise<EpicTest[]> => {
        return await fetchConfiguredLiveblogEpicTestsCached();
    };

    const buildEpicData = async (
        pageTracking: PageTracking,
        targeting: EpicTargeting,
        type: EpicType,
        params: Params,
        baseUrl: string,
        req: express.Request,
    ): Promise<EpicDataResponse> => {
        const {
            enableEpics,
            enableSuperMode,
            enableHardcodedEpicTests,
        } = await cachedChannelSwitches();
        if (!enableEpics) {
            return {};
        }

        const tests = await (type === 'ARTICLE'
            ? getArticleEpicTests(targeting.mvtId || 1, !!params.force, enableHardcodedEpicTests)
            : getLiveblogEpicTests());

        const superModeArticles = enableSuperMode ? await fetchSuperModeArticlesCached() : [];

        const result = params.force
            ? findForcedTestAndVariant(tests, params.force)
            : findTestAndVariant(tests, targeting, isMobile(req), superModeArticles, params.debug);

        if (process.env.log_targeting === 'true') {
            console.log(
                `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(
                    targeting,
                )}`,
            );
        }

        if (!result.result) {
            return { data: undefined, debug: result.debug };
        }

        const { test, variant } = result.result;

        const choiceCardAmounts = await cachedChoiceCardAmounts();
        const tickerSettings = await getTickerSettings(variant);
        const showReminderFields = getReminderFields(variant);

        const propsVariant = {
            ...variant,
            tickerSettings,
            showReminderFields,
            choiceCardAmounts,
        };

        const testTracking: TestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: buildCampaignCode(test, variant),
            campaignId: `epic_${test.campaignId || test.name}`,
            componentType: 'ACQUISITIONS_EPIC',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            labels: test.isSuperMode ? ['SUPER_MODE'] : undefined,
        };

        const props: EpicProps = {
            variant: propsVariant,
            tracking: { ...pageTracking, ...testTracking },
            articleCounts: getArticleViewCounts(
                targeting.weeklyArticleHistory,
                test.articlesViewedSettings?.periodInWeeks,
                test.articlesViewedSettings?.tagId,
            ),
            countryCode: targeting.countryCode,
        };

        const module: ModuleInfo = type === 'ARTICLE' ? epicModule : liveblogEpicModule;

        const modulePathBuilder: (version?: string) => string =
            propsVariant.modulePathBuilder || module.endpointPathBuilder;

        return {
            data: {
                variant: propsVariant,
                meta: testTracking,
                module: {
                    url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
                    name: type === 'ARTICLE' ? 'ContributionsEpic' : 'ContributionsLiveblogEpic',
                    props,
                },
            },
            debug: result.debug,
        };
    };

    router.post(
        '/epic',
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ): Promise<void> => {
            try {
                const epicType: EpicType = 'ARTICLE';

                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = await buildEpicData(
                    tracking,
                    targeting,
                    epicType,
                    params,
                    baseUrl(req),
                    req,
                );

                // for response logging
                res.locals.didRenderEpic = !!response.data;
                res.locals.clientName = tracking.clientName;
                res.locals.epicTargeting = {
                    weeklyArticleHistory: (targeting.weeklyArticleHistory ?? [])
                        .slice(0, 3)
                        .map((c: WeeklyArticleLog) => JSON.stringify(c)),
                };

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    router.post(
        '/liveblog-epic',
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const epicType: EpicType = 'LIVEBLOG';

                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = await buildEpicData(
                    tracking,
                    targeting,
                    epicType,
                    params,
                    baseUrl(req),
                    req,
                );

                // for response logging
                res.locals.didRenderEpic = !!response.data;
                res.locals.clientName = tracking.clientName;

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};
