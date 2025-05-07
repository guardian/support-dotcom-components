import type express from 'express';
import { Router } from 'express';
import { countryCodeToCountryGroupId, getReminderFields } from '../../shared/lib';
import type {
    AmountsTests,
    EpicProps,
    EpicTargeting,
    EpicTest,
    EpicType,
    EpicVariant,
    TestTracking,
    Tracking,
    WeeklyArticleLog,
} from '../../shared/types';
import { hideSRMessagingForInfoPageIds } from '../../shared/types';
import type { BrazeEpicTest } from '../braze/brazeEpic';
import { brazeEpicSchema, transformBrazeEpic } from '../braze/brazeEpic';
import { addBrazeEpicTest, removeBrazeEpicTest } from '../braze/brazeTable';
import type { ChannelSwitches } from '../channelSwitches';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import type { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCounts } from '../lib/history';
import type { Params } from '../lib/params';
import { getQueryParams } from '../lib/params';
import type { SuperModeArticle } from '../lib/superMode';
import { buildEpicCampaignCode } from '../lib/tracking';
import { selectAmountsTestVariant } from '../selection/ab';
import type { BanditData } from '../selection/banditData';
import type { Debug } from '../tests/epics/epicSelection';
import { findForcedTestAndVariant, findTestAndVariant } from '../tests/epics/epicSelection';
import { logInfo, logWarn } from '../utils/logging';
import type { ValueProvider } from '../utils/valueReloader';

interface EpicDataResponse {
    data?: {
        module: {
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
    banditData: ValueProvider<BanditData[]>,
    brazeApiKey: string,
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
                return [...hardcodedTests, ...articleEpicTests.get()];
            }

            return [...hardcodedTests, ...articleEpicTests.get()];
        } catch (err) {
            logWarn(`Error getting article epic tests: ${err}`);

            return [];
        }
    };

    const getBrazeMessage = (
        clientTagIds: string[],
        brazeTests: BrazeEpicTest[],
    ): BrazeEpicTest | undefined =>
        brazeTests.find(
            (test) =>
                test.tagIds.length === 0 ||
                test.tagIds.some((tagId) => clientTagIds.includes(tagId)),
        );

    const buildEpicData = (
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
            targeting.tags.map((tag) => tag.id),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO
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
                // @ts-expect-error -- TODO
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
                articleCounts: { for52Weeks: 0, forTargetedWeeks: 0 },
                countryCode: targeting.countryCode,
                tracking: testTracking as Tracking,
            };

            return {
                data: {
                    variant: props.variant,
                    meta: testTracking,
                    module: {
                        name:
                            type === 'ARTICLE' ? 'ContributionsEpic' : 'ContributionsLiveblogEpic',
                        props,
                    },
                },
            };
        }

        if (hideSRMessagingForInfoPageIds(targeting)) {
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
                  getDeviceType(req),
                  enableSuperMode ? superModeArticles.get() : [],
                  banditData.get(),
                  params.debug,
              );

        if (!result.result) {
            return { data: undefined, debug: result.debug };
        }

        const { test, variant } = result.result;

        const tickerSettings =
            variant.tickerSettings && tickerData.addTickerDataToSettings(variant.tickerSettings);
        const showReminderFields =
            variant.showReminderFields ?? getReminderFields(targeting.countryCode);

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
            campaignCode: buildEpicCampaignCode(test, variant),
            campaignId: `epic_${test.campaignId || test.name}`,
            componentType: 'ACQUISITIONS_EPIC',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            labels: test.isSuperMode ? ['SUPER_MODE'] : undefined,
        };

        const props: EpicProps = {
            variant: propsVariant,
            tracking: testTracking as Tracking, // PageTracking is added client-side
            articleCounts: getArticleViewCounts(
                targeting.weeklyArticleHistory,
                test.articlesViewedSettings?.periodInWeeks,
                test.articlesViewedSettings?.tagIds,
            ),
            countryCode: targeting.countryCode,
        };

        return {
            data: {
                variant: propsVariant,
                meta: testTracking,
                module: {
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

                const { targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildEpicData(targeting, epicType, params, baseUrl(req), req, res);

                // for response logging
                res.locals.didRenderEpic = !!response.data;
                res.locals.epicTargeting = {
                    weeklyArticleHistory: (targeting.weeklyArticleHistory ?? [])
                        .slice(0, 3)
                        .map((c: WeeklyArticleLog) => JSON.stringify(c)),
                };
                if (response.data) {
                    res.locals.epicSuperMode = (response.data.meta.labels ?? []).includes(
                        'SUPER_MODE',
                    );
                }

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

                const { targeting } = req.body;
                const params = getQueryParams(req.query);
                const response = buildEpicData(targeting, epicType, params, baseUrl(req), req, res);

                // for response logging
                res.locals.didRenderEpic = !!response.data;
                if (response.data) {
                    res.locals.epicSuperMode = (response.data.meta.labels ?? []).includes(
                        'SUPER_MODE',
                    );
                }

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    router.post('/braze/epic', async (req: express.Request, res: express.Response) => {
        // No need for CORS here, this endpoint is requested server-to-server
        res.removeHeader('Access-Control-Allow-Origin');

        if (req.header('X-Api-Key') !== brazeApiKey) {
            res.status(401);
            res.send();
            return;
        }

        const parseResult = brazeEpicSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(400);
            res.send(parseResult.error);
            return;
        }

        const liveblogEpic = parseResult.data;
        const message: BrazeEpicTest = transformBrazeEpic(liveblogEpic);

        await addBrazeEpicTest(liveblogEpic.brazeUUID, message);
        logInfo(JSON.stringify(message));

        res.status(201);
        res.send();
    });

    router.post('/braze/epic-view', async (req: express.Request, res: express.Response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- TODO
        const { brazeMessageIdentifier, brazeUUID } = req.body;
        if (brazeUUID && brazeMessageIdentifier) {
            await removeBrazeEpicTest(brazeUUID as string, brazeMessageIdentifier as string);
            // TODO - send event to braze
            res.status(200);
        } else {
            res.status(400);
        }
        res.send();
    });

    return router;
};
