import { isAfter, subDays } from 'date-fns';
import { countryCodeToCountryGroupId, inTargetedCountry } from '../../../shared/lib';
import type {
    BannerTargeting,
    BannerTest,
    BannerTestSelection,
    BannerVariant,
    UserDeviceType,
} from '../../../shared/types';
import { uiIsDesign } from '../../../shared/types';
import { daysSince } from '../../lib/dates';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import type { TestVariant } from '../../lib/params';
import {
    abandonedBasketMatches,
    audienceMatches,
    consentStatusMatches,
    correctSignedInStatus,
    deviceTypeMatches,
    pageContextMatches,
} from '../../lib/targeting';
import { selectTargetingTest } from '../../lib/targetingTesting';
import type { BanditData } from '../../selection/banditData';
import { selectVariant } from '../../selection/selectVariant';
import type { ScheduledBannerDeploys } from './bannerDeploySchedule';
import { defaultDeploySchedule, getLastScheduledDeploy } from './bannerDeploySchedule';
import type { BannerDeployTimesProvider, ReaderRevenueRegion } from './bannerDeployTimes';
import { bannerTargetingTests } from './bannerTargetingTests';

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

// Don't show the abandonedBasket banner if it was closed less than 1 day ago
function canShowAbandonedBasketBanner(
    abandonedBasketBannerLastClosedAt: string | undefined,
    now: Date,
): boolean {
    if (!abandonedBasketBannerLastClosedAt) {
        return true;
    }

    return daysSince(new Date(abandonedBasketBannerLastClosedAt), now) > 0;
}

export const isCountryTargetedForBanner = (
    test: BannerTest,
    targeting: BannerTargeting,
): boolean => {
    const targetedCountryGroups = test.regionTargeting
        ? test.regionTargeting.targetedCountryGroups
        : test.locations;
    const targetedCountryCodes = test.regionTargeting
        ? test.regionTargeting.targetedCountryCodes
        : [];
    return inTargetedCountry(
        targeting.countryCode,
        targetedCountryGroups, // Country groups/region
        targetedCountryCodes, // Individual country codes
    );
};

/**
 * If the banner has been closed previously, can we show it again?
 * Takes into account both the manual deploys (from RRCP) and the scheduled deploys.
 *
 * @param targeting - the targeting data from the client
 * @param test - the banner test config
 * @param manualBannerDeployTimes - holds the times of manual banner deploys
 * @param now - the time now
 * @param scheduledBannerDeploys - the configured banner channel deploy schedule
 */
export const canShowBannerAgain = (
    targeting: BannerTargeting,
    test: BannerTest,
    manualBannerDeployTimes: BannerDeployTimesProvider,
    now: Date,
    scheduledBannerDeploys?: ScheduledBannerDeploys,
): boolean => {
    const {
        subscriptionBannerLastClosedAt,
        engagementBannerLastClosedAt,
        signInBannerLastClosedAt,
        abandonedBasketBannerLastClosedAt,
    } = targeting;
    const { bannerChannel, deploySchedule } = test;

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    // Never show a sign in prompt banner if it has been closed previously
    if (bannerChannel === 'signIn') {
        return !signInBannerLastClosedAt;
    }

    if (bannerChannel === 'abandonedBasket') {
        return canShowAbandonedBasketBanner(abandonedBasketBannerLastClosedAt, now);
    }

    const canShow = (lastClosedRaw: string | undefined): boolean => {
        if (!lastClosedRaw) {
            return true; // banner not yet closed
        }

        if (deploySchedule) {
            // this test has its own deploy schedule
            const lastClosed = new Date(lastClosedRaw);
            return isAfter(subDays(now, deploySchedule.daysBetween), lastClosed);
        }

        const deployTimes = manualBannerDeployTimes.getDeployTimes(bannerChannel);
        const lastManualDeploy = deployTimes[region];
        const lastClosed = new Date(lastClosedRaw);
        return (
            lastManualDeploy > lastClosed ||
            (!!scheduledBannerDeploys &&
                getLastScheduledDeploy(now, scheduledBannerDeploys[bannerChannel]) > lastClosed)
        );
    };

    return canShow(
        bannerChannel === 'subscriptions'
            ? subscriptionBannerLastClosedAt
            : engagementBannerLastClosedAt,
    );
};

const DESIGNABLE_BANNER_TEMPLATE_NAME = 'DesignableBanner';

const getModuleNameForVariant = (variant: BannerVariant): string => {
    if (uiIsDesign(variant.template)) {
        return DESIGNABLE_BANNER_TEMPLATE_NAME;
    } else {
        return variant.template;
    }
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: BannerTest[],
): BannerTestSelection | null => {
    const test = tests.find(
        (test) => test.name.toLowerCase() === forcedTestVariant.testName.toLowerCase(),
    );
    const variant = test?.variants.find(
        (v) => v.name.toLowerCase() === forcedTestVariant.variantName.toLowerCase(),
    );

    if (test && variant) {
        return {
            test,
            variant,
            moduleName: getModuleNameForVariant(variant),
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

const TAYLOR_REPORT_TAG_ID = 'news/series/cotton-capital';
const isTaylorReportPage = (targeting: BannerTargeting): boolean => {
    return Boolean(targeting.tagIds?.includes(TAYLOR_REPORT_TAG_ID));
};

export const selectBannerTest = (
    targeting: BannerTargeting,
    userDeviceType: UserDeviceType,
    baseUrl: string,
    tests: BannerTest[],
    bannerDeployTimes: BannerDeployTimesProvider,
    enableHardcodedBannerTests: boolean,
    enableScheduledDeploys: boolean,
    banditData: BanditData[],
    forcedTestVariant?: TestVariant,
    now: Date = new Date(),
): BannerTestSelection | null => {
    if (isTaylorReportPage(targeting)) {
        return null;
    }

    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, tests);
    }

    const targetingTest = selectTargetingTest(targeting.mvtId, targeting, bannerTargetingTests);
    if (targetingTest && !targetingTest.canShow) {
        return null;
    }

    for (const test of tests) {
        const deploySchedule = enableScheduledDeploys
            ? (targetingTest?.deploySchedule ?? defaultDeploySchedule)
            : undefined;

        if (
            test.status === 'Live' &&
            (!test.canRun || test.canRun(targeting)) &&
            (enableHardcodedBannerTests || !test.isHardcoded) &&
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.userCohort) &&
            isCountryTargetedForBanner(test, targeting) &&
            !(test.articlesViewedSettings && targeting.hasOptedOutOfArticleCount) &&
            historyWithinArticlesViewedSettings(
                test.articlesViewedSettings,
                targeting.weeklyArticleHistory,
                now,
            ) &&
            deviceTypeMatches(test, userDeviceType) &&
            purchaseMatches(test, targeting.purchaseInfo, targeting.isSignedIn) &&
            canShowBannerAgain(targeting, test, bannerDeployTimes, now, deploySchedule) &&
            correctSignedInStatus(targeting.isSignedIn, test.signedInStatus) &&
            pageContextMatches(
                targeting,
                test.contextTargeting ?? {
                    tagIds: [],
                    sectionIds: [],
                    excludedTagIds: [],
                    excludedSectionIds: [],
                },
            ) &&
            consentStatusMatches(targeting.hasConsented, test.consentStatus) &&
            abandonedBasketMatches(test.bannerChannel, targeting.abandonedBasket)
        ) {
            const result = selectVariant<BannerVariant, BannerTest>(
                test,
                targeting.mvtId,
                banditData,
            );

            if (result) {
                return {
                    test: result.test,
                    variant: result.variant,
                    moduleName: getModuleNameForVariant(result.variant),
                    targetingAbTest: targetingTest ? targetingTest.test : undefined,
                };
            }
        }
    }

    return null;
};
