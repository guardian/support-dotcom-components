import express, { Router } from 'express';
import {
    AmountsTests,
    EpicProps,
    EpicTargeting,
    EpicTest,
    EpicType,
    EpicVariant,
    PageTracking,
    TestTracking,
    WeeklyArticleLog,
} from '@sdc/shared/dist/types';
import {
    buildCampaignCode,
    getReminderFields,
    countryCodeToCountryGroupId,
    LocalLanguageEpicTestName,
    LocalLanguageEpicVariant,
    countryCodeToLocalLanguage,
} from '@sdc/shared/dist/lib';
import { getQueryParams, Params } from '../lib/params';
import { baseUrl } from '../lib/env';
import { ChannelSwitches } from '../channelSwitches';
import { Debug, findForcedTestAndVariant, findTestAndVariant } from '../tests/epics/epicSelection';
import { selectAmountsTestVariant } from '../lib/ab';
import { TickerDataProvider } from '../lib/fetchTickerData';
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
import { ValueProvider } from '../utils/valueReloader';

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
const hardcodedEpicTests: EpicTest[] = [];

export const buildEpicRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    superModeArticles: ValueProvider<SuperModeArticle[]>,
    articleEpicTests: ValueProvider<EpicTest[]>,
    liveblogEpicTests: ValueProvider<EpicTest[]>,
    choiceCardAmounts: ValueProvider<AmountsTests>,
    tickerData: TickerDataProvider,
): Router => {
    const router = Router();

    const getArticleEpicTests = (
        mvtId: number,
        isForcingTest: boolean,
        enableHardcodedEpicTests: boolean,
    ): EpicTest[] => {
        try {
            const hardcodedTests = enableHardcodedEpicTests ? hardcodedEpicTests : [];

            if (isForcingTest) {
                return [...hardcodedTests, ...articleEpicTests.get(), fallbackEpicTest];
            }

            return [...hardcodedTests, ...articleEpicTests.get(), fallbackEpicTest];
        } catch (err) {
            logWarn(`Error getting article epic tests: ${err}`);

            return [fallbackEpicTest];
        }
    };

    const buildEpicData = (
        pageTracking: PageTracking,
        targeting: EpicTargeting,
        type: EpicType,
        params: Params,
        baseUrl: string,
        req: express.Request,
    ): EpicDataResponse => {
        const { enableEpics, enableSuperMode, enableHardcodedEpicTests } = channelSwitches.get();
        if (!enableEpics) {
            return {};
        }

        const targetingMvtId = targeting.mvtId || 1;

        const tests =
            type === 'ARTICLE'
                ? getArticleEpicTests(targetingMvtId, !!params.force, enableHardcodedEpicTests)
                : liveblogEpicTests.get();

        const result = params.force
            ? findForcedTestAndVariant(tests, params.force)
            : findTestAndVariant(
                  tests,
                  targeting,
                  isMobile(req),
                  enableSuperMode ? superModeArticles.get() : [],
                  params.debug,
              );

        if (!result.result) {
            return { data: undefined, debug: result.debug };
        }

        const { test, variant } = result.result;

        const tickerSettings =
            variant.tickerSettings && tickerData.addTickerDataToSettings(variant.tickerSettings);
        const showReminderFields = variant.showReminderFields ?? getReminderFields();

        if (test.name === LocalLanguageEpicTestName && variant.name === LocalLanguageEpicVariant) {
            const localLanguage = countryCodeToLocalLanguage(targeting.countryCode);
            if (variant.heading && localLanguage.epicHeader !== '') {
                variant.heading = localLanguage.epicHeader;
            }
        }

        const contributionAmounts = choiceCardAmounts.get();
        const requiredCountry = targeting.countryCode ?? 'GB';
        const requiredRegion = countryCodeToCountryGroupId(requiredCountry);
        const variantAmounts = selectAmountsTestVariant(
            contributionAmounts,
            requiredCountry,
            requiredRegion,
            targetingMvtId,
        );

        const propsVariant = {
            ...variant,
            tickerSettings,
            showReminderFields,
            choiceCardAmounts: variantAmounts,
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
        (req: express.Request, res: express.Response, next: express.NextFunction): void => {
            try {
                const epicType: EpicType = 'ARTICLE';

                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildEpicData(
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
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const epicType: EpicType = 'LIVEBLOG';

                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildEpicData(
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
