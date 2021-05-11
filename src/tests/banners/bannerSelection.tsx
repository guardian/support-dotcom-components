import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
    BannerChannel,
    BannerTest, BannerVariant,
} from '../../types/BannerTypes';
import { countryCodeToCountryGroupId, inCountryGroups } from '../../lib/geolocation';
import { BannerDeployCaches, ReaderRevenueRegion } from './bannerDeployCache';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import { TestVariant } from '../../lib/params';
import { userIsInTest } from '../../lib/targeting';
import { Audience } from '../../types/shared';
import { selectVariant } from '../../lib/ab';

export const readerRevenueRegionFromCountryCode = (countryCode: string): ReaderRevenueRegion => {
    switch (true) {
        case countryCode === 'GB':
            return 'UnitedKingdom';
        case countryCode === 'US':
            return 'UnitedStates';
        case countryCode === 'AU':
            return 'Australia';
        case countryCodeToCountryGroupId(countryCode) === 'EURCountries':
            return 'EuropeanUnion';
        default:
            return 'RestOfWorld';
    }
};

// Has the banner been redeployed since the user last closed it?
export const redeployedSinceLastClosed = (
    targeting: BannerTargeting,
    bannerChannel: BannerChannel,
    bannerDeployCaches: BannerDeployCaches,
): Promise<boolean> => {
    const { subscriptionBannerLastClosedAt, engagementBannerLastClosedAt } = targeting;

    if (
        (bannerChannel === 'subscriptions' && !subscriptionBannerLastClosedAt) ||
        (bannerChannel === 'contributions' && !engagementBannerLastClosedAt)
    ) {
        return Promise.resolve(true);
    }

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    if (bannerChannel === 'subscriptions') {
        return bannerDeployCaches.subscriptions().then(deployTimes => {
            return (
                !subscriptionBannerLastClosedAt ||
                deployTimes[region] > new Date(subscriptionBannerLastClosedAt)
            );
        });
    } else if (bannerChannel === 'contributions') {
        return bannerDeployCaches.contributions().then(deployTimes => {
            return (
                !engagementBannerLastClosedAt ||
                deployTimes[region] > new Date(engagementBannerLastClosedAt)
            );
        });
    }

    return Promise.resolve(true);
};

const audienceMatches = (showSupportMessaging: boolean, testAudience: Audience): boolean => {
    switch (testAudience) {
        case 'AllNonSupporters':
            return showSupportMessaging;
        case 'AllExistingSupporters':
            return !showSupportMessaging;
        default:
            return true;
    }
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: BannerTest[],
    baseUrl: string,
    targeting: BannerTargeting,
): BannerTestSelection | null => {
    const test = tests.find(
        test => test.name.toLowerCase() === forcedTestVariant.testName.toLowerCase(),
    );
    const variant = test?.variants.find(
        v => v.name.toLowerCase() === forcedTestVariant.variantName.toLowerCase(),
    );

    if (test && variant) {
        return {
            test,
            variant,
            moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
            moduleName: variant.moduleName,
        };
    }
    return null;
};

export const selectBannerTest = async (
    targeting: BannerTargeting,
    pageTracking: BannerPageTracking,
    baseUrl: string,
    getTests: () => Promise<BannerTest[]>,
    bannerDeployCaches: BannerDeployCaches,
    forcedTestVariant?: TestVariant,
    now: Date = new Date(),
): Promise<BannerTestSelection | null> => {
    const tests = await getTests();

    if (forcedTestVariant) {
        return Promise.resolve(getForcedVariant(forcedTestVariant, tests, baseUrl, targeting));
    }

    for (const test of tests) {
        if (
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.testAudience) &&
            inCountryGroups(targeting.countryCode, test.locations) &&
            targeting.alreadyVisitedCount >= test.minPageViews &&
            test.canRun(targeting, pageTracking) &&
            !(test.articlesViewedSettings && targeting.hasOptedOutOfArticleCount) &&
            historyWithinArticlesViewedSettings(
                test.articlesViewedSettings,
                targeting.weeklyArticleHistory,
                now,
            ) &&
            userIsInTest(test, targeting.mvtId) &&
            (await redeployedSinceLastClosed(targeting, test.bannerChannel, bannerDeployCaches))
        ) {
            const variant: BannerVariant = selectVariant(test, targeting.mvtId);
            const bannerTestSelection = {
                test,
                variant,
                moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
                moduleName: variant.moduleName,
            };

            return Promise.resolve(bannerTestSelection);
        }
    }

    return Promise.resolve(null);
};
