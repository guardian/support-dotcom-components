import express, { Router } from 'express';
import { getQueryParams, Params } from '../lib/params';
import {
    BannerProps,
    BannerTargeting,
    BannerTest,
    ModifiedChoiceCardAmounts,
    PageTracking,
    Prices,
    PuzzlesBannerProps,
    TestTracking,
} from '@sdc/shared/dist/types';
import { selectAmountsTestVariant } from '../lib/ab';
import { ChannelSwitches } from '../channelSwitches';
import { selectBannerTest } from '../tests/banners/bannerSelection';
import { baseUrl } from '../lib/env';
import { BannerDeployTimesProvider } from '../tests/banners/bannerDeployTimes';
import { buildBannerCampaignCode, countryCodeToCountryGroupId } from '@sdc/shared/dist/lib';
import { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCountForWeeks } from '../lib/history';
import { Debug } from '../tests/epics/epicSelection';
import { isMobile } from '../lib/deviceType';
import { puzzlesBanner } from '@sdc/shared/dist/config';
import { ValueProvider } from '../utils/valueReloader';

interface BannerDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: BannerProps;
        };
        meta: TestTracking;
    };
    debug?: Debug;
}

interface PuzzlesDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: PuzzlesBannerProps;
        };
        meta: Record<string, unknown>;
    };
    debug?: Debug;
}

export const buildBannerRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tickerData: TickerDataProvider,
    productPrices: ValueProvider<Prices | undefined>,
    bannerTests: ValueProvider<BannerTest[]>,
    bannerDeployTimes: BannerDeployTimesProvider,
    choiceCardAmounts: ValueProvider<ModifiedChoiceCardAmounts>,
): Router => {
    const router = Router();

    const buildBannerData = (
        pageTracking: PageTracking,
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): BannerDataResponse => {
        const {
            enableBanners,
            enableHardcodedBannerTests,
            enableScheduledBannerDeploys,
        } = channelSwitches.get();

        if (!enableBanners) {
            return {};
        }

        const selectedTest = selectBannerTest(
            targeting,
            pageTracking,
            isMobile(req),
            baseUrl(req),
            bannerTests.get(),
            bannerDeployTimes,
            enableHardcodedBannerTests,
            enableScheduledBannerDeploys,
            params.force,
        );

        if (selectedTest) {
            const { test, variant, moduleUrl, moduleName, targetingAbTest } = selectedTest;

            const testTracking: TestTracking = {
                abTestName: test.name,
                abTestVariant: variant.name,
                campaignCode: buildBannerCampaignCode(test, variant),
                componentType: variant.componentType,
                targetingAbTest,
                ...(variant.products && { products: variant.products }),
            };

            const tickerSettings =
                variant.tickerSettings &&
                tickerData.addTickerDataToSettings(variant.tickerSettings);

            const contributionAmounts = choiceCardAmounts.get();
            const requiredRegion = countryCodeToCountryGroupId(targeting.countryCode ?? 'GB');
            const targetingMvtId = targeting.mvtId || 1;
            const variantAmounts = selectAmountsTestVariant(
                contributionAmounts,
                requiredRegion,
                targetingMvtId,
            );

            const props: BannerProps = {
                tracking: { ...pageTracking, ...testTracking },
                bannerChannel: test.bannerChannel,
                isSupporter: !targeting.showSupportMessaging,
                countryCode: targeting.countryCode,
                content: variant.bannerContent,
                mobileContent: variant.mobileBannerContent,
                numArticles: getArticleViewCountForWeeks(
                    targeting.weeklyArticleHistory,
                    test.articlesViewedSettings?.periodInWeeks,
                ),
                hasOptedOutOfArticleCount: targeting.hasOptedOutOfArticleCount,
                tickerSettings,
                separateArticleCount: variant.separateArticleCount,
                prices: productPrices.get(),
                choiceCardAmounts: variantAmounts,
            };

            return {
                data: {
                    module: {
                        url: moduleUrl,
                        name: moduleName,
                        props: props,
                    },
                    meta: testTracking,
                },
            };
        } else {
            // No banner
            return { data: undefined };
        }
    };

    router.post(
        '/banner',
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);

                const response = buildBannerData(tracking, targeting, params, req);

                // for response logging
                res.locals.didRenderBanner = !!response.data;
                res.locals.clientName = tracking.clientName;
                // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
                res.locals.bannerTargeting = {
                    shouldHideReaderRevenue: targeting.shouldHideReaderRevenue,
                    showSupportMessaging: targeting.showSupportMessaging,
                    alreadyVisitedCount: targeting.alreadyVisitedCount,
                    countryCode: targeting.countryCode,
                    engagementBannerLastClosedAt: targeting.engagementBannerLastClosedAt,
                    subscriptionBannerLastClosedAt: targeting.subscriptionBannerLastClosedAt,
                    isPaidContent: targeting.isPaidContent,
                };

                res.send(response);
            } catch (error) {
                next(error);
            }
        },
    );

    const buildPuzzlesData = (
        pageTracking: PageTracking,
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): PuzzlesDataResponse => {
        const { enableBanners } = channelSwitches.get();
        if (!enableBanners) {
            return {};
        }
        if (targeting.showSupportMessaging) {
            return {
                data: {
                    module: {
                        url: `${baseUrl(req)}/${puzzlesBanner.endpointPathBuilder(
                            targeting ? targeting.modulesVersion : targeting,
                        )}`,
                        name: 'PuzzlesBanner',
                        props: {
                            tracking: {
                                ...pageTracking,
                                abTestName: 'default',
                                abTestVariant: 'control',
                                campaignCode: 'PUZZLES_BANNER',
                                componentType: 'ACQUISITIONS_OTHER',
                            },
                        },
                    },
                    meta: {},
                },
            };
        }
        return {};
    };

    router.post('/puzzles', (req: express.Request, res: express.Response) => {
        const { tracking, targeting } = req.body;
        const response = buildPuzzlesData(tracking, targeting, req.params, req);

        // for response logging
        res.locals.didRenderBanner = !!response.data;
        res.locals.clientName = tracking.clientName;
        // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
        res.locals.bannerTargeting = {
            shouldHideReaderRevenue: targeting.shouldHideReaderRevenue,
            showSupportMessaging: targeting.showSupportMessaging,
            alreadyVisitedCount: targeting.alreadyVisitedCount,
            countryCode: targeting.countryCode,
            engagementBannerLastClosedAt: targeting.engagementBannerLastClosedAt,
            subscriptionBannerLastClosedAt: targeting.subscriptionBannerLastClosedAt,
            isPaidContent: targeting.isPaidContent,
        };
        res.send(response);
    });

    return router;
};
