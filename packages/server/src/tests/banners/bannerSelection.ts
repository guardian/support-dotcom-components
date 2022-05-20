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
import { BannerDeployCaches, ReaderRevenueRegion } from './bannerDeployCache';
import { selectTargetingTest } from '../../lib/targetingTesting';
import { bannerTargetingTests } from './bannerTargetingTests';
import {
    getLastScheduledDeploy,
    ScheduledBannerDeploys,
    defaultDeploySchedule,
} from './bannerDeploySchedule';
import {
    getPropensityModelTestVariantData,
    PROPENSITY_MODEL_TEST_NAME,
} from './propensityModelTest/propensityModelTest';

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
 * Has the banner been redeployed since the user last closed it?
 * Takes into account both the manual deploys (from RRCP) and the scheduled deploys.
 */
export const redeployedSinceLastClosed = (
    targeting: BannerTargeting,
    bannerChannel: BannerChannel,
    bannerDeployCaches: BannerDeployCaches,
    scheduledBannerDeploys: ScheduledBannerDeploys,
    now: Date,
): Promise<boolean> => {
    const { subscriptionBannerLastClosedAt, engagementBannerLastClosedAt } = targeting;

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    const canShow = async (lastClosedRaw: string | undefined): Promise<boolean> => {
        if (!lastClosedRaw) {
            return true; // banner not yet closed
        }

        const lastManualDeploy = await bannerDeployCaches[bannerChannel]().then(
            deployTimes => deployTimes[region],
        );
        const lastClosed = new Date(lastClosedRaw);
        const scheduledDeploysEnabled = targeting.countryCode !== 'AU';
        return (
            lastManualDeploy > lastClosed ||
            (scheduledDeploysEnabled &&
                getLastScheduledDeploy(now, scheduledBannerDeploys[bannerChannel]) > lastClosed)
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

const getVariant = (test: BannerTest, targeting: BannerTargeting): BannerVariant => {
    const variant: BannerVariant = selectVariant(test, targeting.mvtId);

    // This test is unusual because we decide what to show *after* assigning the browser to a variant
    if (test.name === PROPENSITY_MODEL_TEST_NAME) {
        return getPropensityModelTestVariantData(variant.name, targeting);
    } else {
        return variant;
    }
};

export const selectBannerTest = async (
    targeting: BannerTargeting,
    pageTracking: PageTracking,
    isMobile: boolean,
    baseUrl: string,
    getTests: () => Promise<BannerTest[]>,
    bannerDeployCaches: BannerDeployCaches,
    enableHardcodedBannerTests: boolean,
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
        const deploySchedule = targetingTest?.deploySchedule ?? defaultDeploySchedule;

        if (
            (enableHardcodedBannerTests || !test.isHardcoded) &&
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
            deviceTypeMatches(test, isMobile) &&
            (await redeployedSinceLastClosed(
                targeting,
                test.bannerChannel,
                bannerDeployCaches,
                deploySchedule,
                now,
            ))
        ) {
            const variant: BannerVariant = getVariant(test, targeting);

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
