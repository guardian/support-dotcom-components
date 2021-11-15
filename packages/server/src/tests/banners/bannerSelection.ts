import { countryCodeToCountryGroupId, inCountryGroups } from '@sdc/shared/lib';
import {
    BannerChannel,
    BannerTargeting,
    BannerTest,
    BannerTestSelection,
    BannerVariant,
    PageTracking,
    UserCohort,
} from '@sdc/shared/types';
import { selectVariant } from '../../lib/ab';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import { TestVariant } from '../../lib/params';
import { userIsInTest } from '../../lib/targeting';
import { BannerDeployCaches, ReaderRevenueRegion } from './bannerDeployCache';
import { selectTargetingTest } from '../../lib/targetingTesting';
import { bannerTargetingTests } from './bannerTargetingTests';
import { lastScheduledDeploy } from './bannerDeploySchedule';

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
    now: Date,
): Promise<boolean> => {
    const { subscriptionBannerLastClosedAt, engagementBannerLastClosedAt } = targeting;

    if (
        (bannerChannel === 'subscriptions' && !subscriptionBannerLastClosedAt) ||
        (bannerChannel === 'contributions' && !engagementBannerLastClosedAt)
    ) {
        return Promise.resolve(true);
    }

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    const canShow = async (
        lastClosedRaw: string | undefined,
        bannerChannel: 'contributions' | 'subscriptions',
    ): Promise<boolean> => {
        if (!lastClosedRaw) {
            return Promise.resolve(true); // banner not yet closed
        }

        const manualDeployTimes = await bannerDeployCaches[bannerChannel]();
        const lastClosed = new Date(lastClosedRaw);
        const lastManualDeploy = manualDeployTimes[region];
        return (
            lastManualDeploy > lastClosed || lastScheduledDeploy[bannerChannel](now) > lastClosed
        );
    };

    if (bannerChannel === 'subscriptions') {
        return canShow(subscriptionBannerLastClosedAt, bannerChannel);
    } else if (bannerChannel === 'contributions') {
        return canShow(engagementBannerLastClosedAt, bannerChannel);
    }

    return Promise.resolve(true);
};

const audienceMatches = (showSupportMessaging: boolean, testAudience: UserCohort): boolean => {
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
    pageTracking: PageTracking,
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

    const targetingTest = selectTargetingTest(targeting.mvtId, targeting, bannerTargetingTests);
    if (targetingTest && !targetingTest.canShow) {
        return Promise.resolve(null);
    }

    for (const test of tests) {
        if (
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.userCohort) &&
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
            (await redeployedSinceLastClosed(
                targeting,
                test.bannerChannel,
                bannerDeployCaches,
                now,
            ))
        ) {
            const variant: BannerVariant = selectVariant(test, targeting.mvtId);
            const bannerTestSelection = {
                test,
                variant,
                moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
                moduleName: variant.moduleName,
                targetingAbTest: targetingTest ? targetingTest.test : undefined,
            };

            return Promise.resolve(bannerTestSelection);
        }
    }

    return Promise.resolve(null);
};
