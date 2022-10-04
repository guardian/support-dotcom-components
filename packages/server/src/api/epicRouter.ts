import express, { Router } from 'express';
import {
    ChoiceCardAmounts,
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
import { ChannelSwitches } from '../channelSwitches';
import { Debug, findForcedTestAndVariant, findTestAndVariant } from '../tests/epics/epicSelection';
import { TickerDataReloader } from '../lib/fetchTickerData';
import { buildCampaignCode, getReminderFields } from '@sdc/shared/dist/lib';
import { getArticleViewCounts } from '../lib/history';
import {
    epic as epicModule,
    liveblogEpic as liveblogEpicModule,
    ModuleInfo,
} from '@sdc/shared/dist/config';
import { fallbackEpicTest } from '../tests/epics/fallback';
import { logWarn } from '../utils/logging';
import { SuperModeArticle } from '../lib/superMode';
import { isMobile } from '../lib/deviceType';
import {
    climate_2022_AUS,
    climate_2022_EUROW,
    climate_2022_UKUS,
} from '../tests/epics/epicEnvironmentMoment2022';
import environmentArticleCountTest from '../tests/epics/environmentArticleCountTest';
import { ValueReloader } from '../utils/valueReloader';

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

// Any hardcoded epic tests should go here. They will take priority over any tests from the epic tool.
const hardcodedEpicTests: EpicTest[] = [
    climate_2022_AUS,
    climate_2022_EUROW,
    climate_2022_UKUS,
    ...environmentArticleCountTest,
];

export const buildEpicRouter = (
    channelSwitches: ValueReloader<ChannelSwitches>,
    superModeArticles: ValueReloader<SuperModeArticle[]>,
    articleEpicTests: ValueReloader<EpicTest[]>,
    liveblogEpicTests: ValueReloader<EpicTest[]>,
    holdbackEpicTests: ValueReloader<EpicTest[]>,
    choiceCardAmounts: ValueReloader<ChoiceCardAmounts>,
    tickerData: TickerDataReloader,
): Router => {
    const router = Router();

    const getArticleEpicTests = async (
        mvtId: number,
        isForcingTest: boolean,
        enableHardcodedEpicTests: boolean,
    ): Promise<EpicTest[]> => {
        try {
            const hardcodedTests = enableHardcodedEpicTests ? hardcodedEpicTests : [];

            if (isForcingTest) {
                return [
                    ...hardcodedTests,
                    ...articleEpicTests.get(),
                    ...holdbackEpicTests.get(),
                    fallbackEpicTest,
                ];
            }

            const shouldHoldBack = mvtId % 100 === 0; // holdback 1% of the audience
            if (shouldHoldBack) {
                return holdbackEpicTests.get();
            }

            return [...hardcodedTests, ...articleEpicTests.get(), fallbackEpicTest];
        } catch (err) {
            logWarn(`Error getting article epic tests: ${err}`);

            return [fallbackEpicTest];
        }
    };

    const buildEpicData = async (
        pageTracking: PageTracking,
        targeting: EpicTargeting,
        type: EpicType,
        params: Params,
        baseUrl: string,
        req: express.Request,
    ): Promise<EpicDataResponse> => {
        const { enableEpics, enableSuperMode, enableHardcodedEpicTests } = channelSwitches.get();
        if (!enableEpics) {
            return {};
        }

        const tests = await (type === 'ARTICLE'
            ? getArticleEpicTests(targeting.mvtId || 1, !!params.force, enableHardcodedEpicTests)
            : liveblogEpicTests.get());

        const result = params.force
            ? findForcedTestAndVariant(tests, params.force)
            : findTestAndVariant(
                  tests,
                  targeting,
                  isMobile(req),
                  enableSuperMode ? superModeArticles.get() : [],
                  params.debug,
              );

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

        const tickerSettings =
            variant.tickerSettings && tickerData.addTickerDataToSettings(variant.tickerSettings);
        const showReminderFields = getReminderFields(variant);

        const propsVariant = {
            ...variant,
            tickerSettings,
            showReminderFields,
            choiceCardAmounts: choiceCardAmounts.get(),
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
