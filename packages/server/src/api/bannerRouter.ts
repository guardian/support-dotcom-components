import express, { Router } from 'express';
import { getQueryParams, Params } from '../lib/params';
import {
    BannerProps,
    BannerTargeting,
    PageTracking,
    PuzzlesBannerProps,
    TestTracking,
} from '@sdc/shared/dist/types';
import { cachedChannelSwitches } from '../channelSwitches';
import { cachedProductPrices } from '../productPrices';
import { selectBannerTest } from '../tests/banners/bannerSelection';
import { baseUrl } from '../lib/env';
import { getCachedTests } from '../tests/banners/bannerTests';
import { bannerDeployCaches } from '../tests/banners/bannerDeployCache';
import { buildBannerCampaignCode } from '@sdc/shared/dist/lib';
import { addTickerDataToSettings } from '../lib/fetchTickerData';
import { getArticleViewCountForWeeks } from '../lib/history';
import { Debug } from '../tests/epics/epicSelection';
import { isMobile } from '../lib/deviceType';
import { puzzlesBanner } from '@sdc/shared/dist/config';

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

// TODO - pass in dependencies instead of using cacheAsync
export const buildBannerRouter = (): Router => {
    const router = Router();

    const buildBannerData = async (
        pageTracking: PageTracking,
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): Promise<BannerDataResponse> => {
        const { enableBanners, enableHardcodedBannerTests } = await cachedChannelSwitches();
        if (!enableBanners) {
            return {};
        }

        const productPrices = await cachedProductPrices();

        const selectedTest = await selectBannerTest(
            targeting,
            pageTracking,
            isMobile(req),
            baseUrl(req),
            getCachedTests,
            bannerDeployCaches,
            enableHardcodedBannerTests,
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

            const tickerSettings = variant.tickerSettings
                ? await addTickerDataToSettings(variant.tickerSettings)
                : undefined;

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
                prices: productPrices,
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
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { tracking, targeting } = req.body;
                const params = getQueryParams(req.query);

                const response = await buildBannerData(tracking, targeting, params, req);

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

    const buildPuzzlesData = async (
        pageTracking: PageTracking,
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): Promise<PuzzlesDataResponse> => {
        const { enableBanners } = await cachedChannelSwitches();
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

    router.post('/puzzles', async (req: express.Request, res: express.Response) => {
        const { tracking, targeting } = req.body;
        const response = await buildPuzzlesData(tracking, targeting, req.params, req);

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
