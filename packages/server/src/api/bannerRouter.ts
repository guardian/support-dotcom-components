import express, { Router } from 'express';
import { getQueryParams, Params } from '../lib/params';
import {
    BannerProps,
    BannerTargeting,
    BannerTest,
    AmountsTests,
    PageTracking,
    Prices,
    TestTracking,
    BannerDesignFromTool,
} from '@sdc/shared/dist/types';
import { selectAmountsTestVariant } from '../lib/ab';
import { ChannelSwitches } from '../channelSwitches';
import { selectBannerTest } from '../tests/banners/bannerSelection';
import { baseUrl } from '../lib/env';
import { BannerDeployTimesProvider } from '../tests/banners/bannerDeployTimes';
import { buildBannerCampaignCode, countryCodeToCountryGroupId } from '@sdc/shared/dist/lib';
import { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCountForWeeks, getArticleViewCounts } from '../lib/history';
import { Debug } from '../tests/epics/epicSelection';
import { getDeviceType } from '../lib/deviceType';
import { ValueProvider } from '../utils/valueReloader';
import { getDesignForVariant } from '../tests/banners/channelBannerTests';

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

export const buildBannerRouter = (
    channelSwitches: ValueProvider<ChannelSwitches>,
    tickerData: TickerDataProvider,
    productPrices: ValueProvider<Prices | undefined>,
    bannerTests: ValueProvider<BannerTest[]>,
    bannerDeployTimes: BannerDeployTimesProvider,
    choiceCardAmounts: ValueProvider<AmountsTests>,
    bannerDesigns: ValueProvider<BannerDesignFromTool[]>,
): Router => {
    const router = Router();

    const buildBannerData = (
        pageTracking: PageTracking,
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
    ): BannerDataResponse => {
        const { enableBanners, enableHardcodedBannerTests, enableScheduledBannerDeploys } =
            channelSwitches.get();

        if (!enableBanners) {
            return {};
        }

        const selectedTest = selectBannerTest(
            targeting,
            pageTracking,
            getDeviceType(req),
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
                tracking: { ...pageTracking, ...testTracking },
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
                numArticles: getArticleViewCountForWeeks(
                    targeting.weeklyArticleHistory,
                    test.articlesViewedSettings?.periodInWeeks,
                ),
                hasOptedOutOfArticleCount: targeting.hasOptedOutOfArticleCount,
                tickerSettings,
                separateArticleCount: variant.separateArticleCount,
                prices: productPrices.get(),
                choiceCardAmounts: variantAmounts,
                design: getDesignForVariant(variant, bannerDesigns.get()),
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
