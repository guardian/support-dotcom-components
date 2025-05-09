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
import type { ChannelSwitches } from '../channelSwitches';
import { getChoiceCardsSettings } from '../lib/choiceCards/choiceCards';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import type { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCounts } from '../lib/history';
import type { Params } from '../lib/params';
import { getQueryParams } from '../lib/params';
import type { SuperModeArticle } from '../lib/superMode';
import { buildEpicCampaignCode } from '../lib/tracking';
import type { ProductCatalog } from '../productCatalog';
import { selectAmountsTestVariant } from '../selection/ab';
import type { BanditData } from '../selection/banditData';
import type { Debug } from '../tests/epics/epicSelection';
import { findForcedTestAndVariant, findTestAndVariant } from '../tests/epics/epicSelection';
import { logWarn } from '../utils/logging';
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
    productCatalog: ValueProvider<ProductCatalog>,
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

    const buildEpicData = (
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

        /**
         * We assign the user to an amounts test even though this is not used for the newer choice cards.
         * This is because we also use the special VAT_COMPLIANCE amounts test to disable choice cards
         * if a user is in a non-VAT compliant country.
         * In future we should migrate to a better way of configuring this.
         */
        const contributionAmounts = choiceCardAmounts.get();
        const requiredCountry = targeting.countryCode ?? 'GB';
        const requiredRegion = countryCodeToCountryGroupId(requiredCountry);
        const variantAmounts = selectAmountsTestVariant(
            contributionAmounts,
            requiredCountry,
            requiredRegion,
            targetingMvtId,
        );
        const isVatCompliantCountry = variantAmounts?.testName !== 'VAT_COMPLIANCE';

        const choiceCardsSettings =
            variant.showChoiceCards && isVatCompliantCountry
                ? getChoiceCardsSettings(
                      requiredRegion,
                      'Epic',
                      productCatalog.get(),
                      variant.choiceCardsSettings ?? undefined,
                  )
                : undefined;

        const propsVariant: EpicVariant = {
            ...variant,
            tickerSettings,
            showReminderFields,
            choiceCardAmounts: variantAmounts, // deprecated, to be removed soon
            choiceCardsSettings,
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
                const response = buildEpicData(targeting, epicType, params, baseUrl(req), req);

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
                const response = buildEpicData(targeting, epicType, params, baseUrl(req), req);

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

    return router;
};
