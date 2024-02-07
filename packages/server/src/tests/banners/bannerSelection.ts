import { countryCodeToCountryGroupId, inCountryGroups } from '@sdc/shared/lib';
import {
    BannerChannel,
    BannerTargeting,
    BannerTest,
    BannerTestSelection,
    BannerVariant,
    PageTracking,
    uiIsDesign,
} from '@sdc/shared/types';
import { selectVariant } from '../../lib/ab';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import { TestVariant } from '../../lib/params';
import {
    audienceMatches,
    correctSignedInStatus,
    deviceTypeMatches,
    pageContextMatches,
} from '../../lib/targeting';
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
    now: Date,
    scheduledBannerDeploys?: ScheduledBannerDeploys,
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
    return uiIsDesign(variant.template) ? DESIGNABLE_BANNER_TEMPLATE_NAME : variant.template;
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: BannerTest[],
    baseUrl: string,
    targeting: BannerTargeting,
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
            moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
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
    pageTracking: PageTracking,
    isMobile: boolean,
    baseUrl: string,
    tests: BannerTest[],
    bannerDeployTimes: BannerDeployTimesProvider,
    enableHardcodedBannerTests: boolean,
    enableScheduledDeploys: boolean,
    forcedTestVariant?: TestVariant,
    now: Date = new Date(),
): BannerTestSelection | null => {
    if (isTaylorReportPage(targeting)) {
        return null;
    }

    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, tests, baseUrl, targeting);
    }

    const targetingTest = selectTargetingTest(targeting.mvtId, targeting, bannerTargetingTests);
    if (targetingTest && !targetingTest.canShow) {
        return null;
    }

    for (const test of tests) {
        const deploySchedule = enableScheduledDeploys
            ? targetingTest?.deploySchedule ?? defaultDeploySchedule
            : undefined;

        if (
            test.status === 'Live' &&
            (!test.canRun || test.canRun(targeting, pageTracking)) &&
            (enableHardcodedBannerTests || !test.isHardcoded) &&
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.userCohort) &&
            inCountryGroups(targeting.countryCode, test.locations) &&
            !(test.articlesViewedSettings && targeting.hasOptedOutOfArticleCount) &&
            historyWithinArticlesViewedSettings(
                test.articlesViewedSettings,
                targeting.weeklyArticleHistory,
                now,
            ) &&
            deviceTypeMatches(test, isMobile) &&
            purchaseMatches(test, targeting.purchaseInfo, targeting.isSignedIn) &&
            canShowBannerAgain(
                targeting,
                test.bannerChannel,
                bannerDeployTimes,
                now,
                deploySchedule,
            ) &&
            correctSignedInStatus(targeting.isSignedIn, test.signedInStatus) &&
            pageContextMatches(
                targeting,
                test.contextTargeting ?? {
                    tagIds: [],
                    sectionIds: [],
                    excludedTagIds: [],
                    excludedSectionIds: [],
                },
            )
        ) {
            const variant: BannerVariant = selectVariant(test, targeting.mvtId);

            return {
                test,
                variant,
                moduleUrl: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
                moduleName: getModuleNameForVariant(variant),
                targetingAbTest: targetingTest ? targetingTest.test : undefined,
            };
        }
    }

    return null;
};
