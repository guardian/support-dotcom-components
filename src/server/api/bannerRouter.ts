import type express from 'express';
import { Router } from 'express';
import { countryCodeToCountryGroupId } from '../../shared/lib';
import type {
    AmountsTests,
    BannerDesignFromTool,
    BannerProps,
    BannerTargeting,
    BannerTest,
    Prices,
    TestTracking,
    Tracking} from '../../shared/types';
import {
    hideSRMessagingForInfoPageIds,
} from '../../shared/types';
import type { BanditData } from '../bandit/banditData';
import type { ChannelSwitches } from '../channelSwitches';
import { selectAmountsTestVariant } from '../lib/ab';
import { getDeviceType } from '../lib/deviceType';
import { baseUrl } from '../lib/env';
import type { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCounts } from '../lib/history';
import type { Params } from '../lib/params';
import { getQueryParams } from '../lib/params';
import { buildBannerCampaignCode } from '../lib/tracking';
import type { BannerDeployTimesProvider } from '../tests/banners/bannerDeployTimes';
import { selectBannerTest } from '../tests/banners/bannerSelection';
import { getDesignForVariant } from '../tests/banners/channelBannerTests';
import type { Debug } from '../tests/epics/epicSelection';
import type { ValueProvider } from '../utils/valueReloader';

interface BannerDataResponse {
    data?: {
        module: {
            name: string;
            props: BannerProps;
        };
        meta: TestTracking;
    };
    debug?: Debug;
}

export const buildBannerRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tickerData: TickerDataProvider,
    productPrices: ValueProvider<Prices | undefined>,
    bannerTests: ValueProvider<BannerTest[]>,
    bannerDeployTimes: BannerDeployTimesProvider,
    choiceCardAmounts: ValueProvider<AmountsTests>,
    bannerDesigns: ValueProvider<BannerDesignFromTool[]>,
    banditData: ValueProvider<BanditData[]>,
): Router => {
    const router = Router();

    const buildBannerData = (
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): BannerDataResponse => {
        const { enableBanners, enableHardcodedBannerTests, enableScheduledBannerDeploys } =
            channelSwitches.get();

        if (!enableBanners) {
            return {};
        }

        if (hideSRMessagingForInfoPageIds(targeting)) {
            return {};
        }

        const selectedTest = selectBannerTest(
            targeting,
            getDeviceType(req),
            baseUrl(req),
            bannerTests.get(),
            bannerDeployTimes,
            enableHardcodedBannerTests,
            enableScheduledBannerDeploys,
            banditData.get(),
            params.force,
        );

        if (selectedTest) {
            const { test, variant, moduleName, targetingAbTest } = selectedTest;

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
            const requiredCountry = targeting.countryCode ?? 'GB';
            const requiredRegion = countryCodeToCountryGroupId(requiredCountry);
            const targetingMvtId = targeting.mvtId || 1;
            const variantAmounts = selectAmountsTestVariant(
                contributionAmounts,
                requiredCountry,
                requiredRegion,
                targetingMvtId,
            );

            const props: BannerProps = {
                tracking: testTracking as Tracking, // PageTracking is added client-side
                bannerChannel: test.bannerChannel,
                isSupporter: !targeting.showSupportMessaging,
                countryCode: targeting.countryCode,
                content: variant.bannerContent,
                mobileContent: variant.mobileBannerContent,
                articleCounts: getArticleViewCounts(
                    targeting.weeklyArticleHistory,
                    test.articlesViewedSettings?.periodInWeeks,
                    test.articlesViewedSettings?.tagIds,
                ),
                hasOptedOutOfArticleCount: targeting.hasOptedOutOfArticleCount,
                tickerSettings,
                separateArticleCount: variant.separateArticleCount,
                separateArticleCountSettings: variant.separateArticleCountSettings,
                prices: productPrices.get(),
                choiceCardAmounts: variantAmounts,
                design: getDesignForVariant(variant, bannerDesigns.get()),
                abandonedBasket: targeting.abandonedBasket,
            };

            return {
                data: {
                    module: {
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
                const { targeting } = req.body;
                const params = getQueryParams(req.query);

                const response = buildBannerData(targeting, params, req);

                // for response logging
                res.locals.didRenderBanner = !!response.data;
                // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
                res.locals.bannerTargeting = {
                    shouldHideReaderRevenue: targeting.shouldHideReaderRevenue,
                    showSupportMessaging: targeting.showSupportMessaging,
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

    return router;
};
