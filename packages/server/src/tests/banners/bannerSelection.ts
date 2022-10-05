import { countryCodeToCountryGroupId, inCountryGroups } from '@sdc/shared/lib';
import {
    BannerChannel,
    BannerTargeting,
    BannerTest,
    BannerTestSelection,
    BannerVariant,
    PageTracking,
} from '@sdc/shared/types';
import { selectVariant } from '../../lib/ab';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import { TestVariant } from '../../lib/params';
import { audienceMatches, deviceTypeMatches, userIsInTest } from '../../lib/targeting';
import { BannerDeployTimesProvider, ReaderRevenueRegion } from './bannerDeployTimes';
import { selectTargetingTest } from '../../lib/targetingTesting';
import { bannerTargetingTests } from './bannerTargetingTests';
import {
    getLastScheduledDeploy,
    ScheduledBannerDeploys,
    defaultDeploySchedule,
} from './bannerDeploySchedule';

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

/**
 * If the banner has been closed previously, can we show it again?
 * e.g. if changes have been deployed
 * Takes into account both the manual deploys (from RRCP) and the scheduled deploys.
 */
export const canShowBannerAgain = (
    targeting: BannerTargeting,
    bannerChannel: BannerChannel,
    bannerDeployTimes: BannerDeployTimesProvider,
    scheduledBannerDeploys: ScheduledBannerDeploys,
    now: Date,
): boolean => {
    const {
        subscriptionBannerLastClosedAt,
        engagementBannerLastClosedAt,
        signInBannerLastClosedAt,
    } = targeting;

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    // Never show a sign in prompt banner if it has been closed previously
    if (bannerChannel === 'signIn') {
        return !signInBannerLastClosedAt;
    }

    const canShow = (lastClosedRaw: string | undefined): boolean => {
        if (!lastClosedRaw) {
            return true; // banner not yet closed
        }

        const deployTimes = bannerDeployTimes.getDeployTimes(bannerChannel);
        const lastManualDeploy = deployTimes[region];
        const lastClosed = new Date(lastClosedRaw);
        return (
            lastManualDeploy > lastClosed ||
            getLastScheduledDeploy(now, scheduledBannerDeploys[bannerChannel]) > lastClosed
        );
    };

    return canShow(
        bannerChannel === 'subscriptions'
            ? subscriptionBannerLastClosedAt
            : engagementBannerLastClosedAt,
    );
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

const purchaseMatches = (
    test: BannerTest,
    purchaseInfo: BannerTargeting['purchaseInfo'],
    isSignedIn: boolean,
) => {
    const { purchaseInfo: testPurchaseInfo } = test;

    // Ignore tests specifying purchase info if user is signed in / if no purchase info in targeting
    if (isSignedIn || !purchaseInfo) {
        return !testPurchaseInfo;
    }

    const { product, userType } = purchaseInfo;
    const productValid = product && testPurchaseInfo?.product.includes(product);
    const userValid = userType && testPurchaseInfo?.userType.includes(userType);

    return productValid && userValid;
};

export const selectBannerTest = (
    targeting: BannerTargeting,
    pageTracking: PageTracking,
    isMobile: boolean,
    baseUrl: string,
    tests: BannerTest[],
    bannerDeployTimes: BannerDeployTimesProvider,
    enableHardcodedBannerTests: boolean,
    forcedTestVariant?: TestVariant,
    now: Date = new Date(),
): BannerTestSelection | null => {
    if (forcedTestVariant) {
        getForcedVariant(forcedTestVariant, tests, baseUrl, targeting);
    }

    const targetingTest = selectTargetingTest(targeting.mvtId, targeting, bannerTargetingTests);
    if (targetingTest && !targetingTest.canShow) {
        return null;
    }

    for (const test of tests) {
        const deploySchedule = targetingTest?.deploySchedule ?? defaultDeploySchedule;

        if (
            test.status === 'Live' &&
            (!test.canRun || test.canRun(targeting, pageTracking)) &&
            (enableHardcodedBannerTests || !test.isHardcoded) &&
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(
                targeting.showSupportMessaging,
                test.userCohort,
                targeting.lastOneOffContributionDate,
            ) &&
            inCountryGroups(targeting.countryCode, test.locations) &&
            targeting.alreadyVisitedCount >= test.minPageViews &&
            !(test.articlesViewedSettings && targeting.hasOptedOutOfArticleCount) &&
            historyWithinArticlesViewedSettings(
                test.articlesViewedSettings,
                targeting.weeklyArticleHistory,
                now,
            ) &&
            userIsInTest(test, targeting.mvtId) &&
            deviceTypeMatches(test, isMobile) &&
            purchaseMatches(test, targeting.purchaseInfo, targeting.isSignedIn) &&
            canShowBannerAgain(
                targeting,
                test.bannerChannel,
                bannerDeployTimes,
                deploySchedule,
                now,
            )
        ) {
            const variant: BannerVariant = selectVariant(test, targeting.mvtId);

            return {
                test,
                variant,
                moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
                moduleName: variant.moduleName,
                targetingAbTest: targetingTest ? targetingTest.test : undefined,
            };
        }
    }

    return null;
};
