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
    Tracking,
} from '../../shared/types';
import { channelFromBannerChannel } from '../../shared/types';
import type { ChannelSwitches } from '../channelSwitches';
import { getChoiceCardsSettings } from '../lib/choiceCards/choiceCards';
import { getDeviceType } from '../lib/deviceType';
import type { TickerDataProvider } from '../lib/fetchTickerData';
import { getArticleViewCounts } from '../lib/history';
import type { MParticle, MParticleProfile } from '../lib/mParticle';
import type { Okta } from '../lib/okta';
import type { Params } from '../lib/params';
import { getQueryParams } from '../lib/params';
import type { PromotionsCache } from '../lib/promotions/promotions';
import { pageIdIsExcluded } from '../lib/targeting';
import { buildBannerCampaignCode } from '../lib/tracking';
import type { ProductCatalog } from '../productCatalog';
import { selectAmountsTestVariant } from '../selection/ab';
import type { BanditData } from '../selection/banditData';
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
    productCatalog: ValueProvider<ProductCatalog>,
    promotions: ValueProvider<PromotionsCache>,
    mParticle: MParticle,
    okta: Okta,
): Router => {
    const router = Router();

    const buildBannerData = async (
        targeting: BannerTargeting,
        params: Params,
        req: express.Request,
        getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    ): Promise<BannerDataResponse> => {
        const { enableBanners, enableHardcodedBannerTests, enableScheduledBannerDeploys } =
            channelSwitches.get();

        if (!enableBanners) {
            return {};
        }

        if (pageIdIsExcluded(targeting)) {
            return {};
        }

        const selectedTest = await selectBannerTest({
            targeting,
            userDeviceType: getDeviceType(req, params),
            tests: bannerTests.get(),
            bannerDeployTimes,
            enableHardcodedBannerTests,
            enableScheduledDeploys: enableScheduledBannerDeploys,
            banditData: banditData.get(),
            getMParticleProfile,
            now: new Date(),
            forcedTestVariant: params.force,
        });

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

            const design = getDesignForVariant(variant, bannerDesigns.get());

            const contributionAmounts = choiceCardAmounts.get();
            const requiredCountry = targeting.countryCode || 'GB';
            const requiredRegion = countryCodeToCountryGroupId(requiredCountry);
            const targetingMvtId = targeting.mvtId || 1;
            const variantAmounts = selectAmountsTestVariant(
                contributionAmounts,
                requiredCountry,
                requiredRegion,
                targetingMvtId,
            );
            const isVatCompliantCountry = variantAmounts?.testName !== 'VAT_COMPLIANCE';

            const choiceCardsSettings =
                design?.visual?.kind === 'ChoiceCards' && isVatCompliantCountry
                    ? getChoiceCardsSettings(
                          requiredRegion,
                          channelFromBannerChannel(test.bannerChannel),
                          productCatalog.get(),
                          promotions.get(),
                          variant.promoCodes ?? [],
                          variant.choiceCardsSettings ?? undefined,
                      )
                    : undefined;

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
                choiceCardsSettings,
                choiceCardAmounts: variantAmounts, // deprecated, to be removed soon
                design,
                abandonedBasket: targeting.abandonedBasket,
                isCollapsible: variant.isCollapsible ?? undefined,
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
        async (
            req: express.Request<Record<string, never>, unknown, { targeting: BannerTargeting }>,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                const { targeting } = req.body;
                const params = getQueryParams(req.query);
                const authHeader = req.headers.authorization;
                const { fetchProfile, forLogging } = mParticle.getProfileFetcher(
                    channelSwitches.get(),
                    okta,
                    authHeader,
                );

                const response = await buildBannerData(targeting, params, req, fetchProfile);

                // for response logging
                res.locals.didRenderBanner = !!response.data;
                res.locals.hasAuthorization = !!authHeader;
                res.locals.gotMParticleProfile = forLogging() === 'found';
                res.locals.mParticleProfileStatus = forLogging();
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
