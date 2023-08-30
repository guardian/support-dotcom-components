import express, { Router } from 'express';
import {
    ModifiedChoiceCardAmounts,
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
import { selectAmountsTestVariant } from '../lib/ab';
import { TickerDataProvider } from '../lib/fetchTickerData';
import {
    buildCampaignCode,
    getReminderFields,
    countryCodeToCountryGroupId,
} from '@sdc/shared/dist/lib';
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
import { BrazeEpicTest } from '../lib/brazeMessages';

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
    choiceCardAmounts: ValueProvider<ModifiedChoiceCardAmounts>,
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

    const getBrazeMessage = (
        clientTagIds: string[],
        brazeTests: BrazeEpicTest[],
    ): BrazeEpicTest | undefined =>
        brazeTests.find(
            test =>
                test.tagIds.length === 0 || test.tagIds.some(tagId => clientTagIds.includes(tagId)),
        );

    const buildEpicData = (
        pageTracking: PageTracking,
        targeting: EpicTargeting,
        type: EpicType,
        params: Params,
        baseUrl: string,
        req: express.Request,
        res: express.Response,
    ): EpicDataResponse => {
        const { enableEpics, enableSuperMode, enableHardcodedEpicTests } = channelSwitches.get();
        if (!enableEpics) {
            return {};
        }

        const brazeTest = getBrazeMessage(
            targeting.tags.map(tag => tag.id),
            res.locals.brazeMessages ?? [],
        );

        if (brazeTest) {
            const testTracking: TestTracking = {
                abTestName: brazeTest.testName,
                abTestVariant: brazeTest.variantName,
                campaignCode: `${brazeTest.testName}_${brazeTest.variantName}`,
                campaignId: `${brazeTest.testName}_${brazeTest.variantName}`,
                componentType: 'ACQUISITIONS_EPIC',
                products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
                brazeMessageIdentifier: brazeTest.testName,
            };

            const props: EpicProps = {
                variant: {
                    name: brazeTest.testName,
                    heading: brazeTest.heading,
                    paragraphs: brazeTest.paragraphs,
                    highlightedText: brazeTest.highlightedText,
                    cta: brazeTest.cta,
                },
                tracking: { ...pageTracking, ...testTracking },
                articleCounts: { for52Weeks: 0, forTargetedWeeks: 0 },
                countryCode: targeting.countryCode,
            };

            const module: ModuleInfo = type === 'ARTICLE' ? epicModule : liveblogEpicModule;

            const modulePathBuilder: (version?: string) => string = module.endpointPathBuilder;

            return {
                data: {
                    variant: props.variant,
                    meta: testTracking,
                    module: {
                        url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
                        name:
                            type === 'ARTICLE' ? 'ContributionsEpic' : 'ContributionsLiveblogEpic',
                        props,
                    },
                },
            };
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

        const contributionAmounts = choiceCardAmounts.get();
        const requiredRegion = countryCodeToCountryGroupId(targeting.countryCode ?? 'GB');
        const variantAmounts = selectAmountsTestVariant(
            contributionAmounts,
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
                    res,
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
                    res,
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
