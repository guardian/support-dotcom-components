import { contributionsBanner, guardianWeekly } from '@sdc/shared/dist/config';
import { BannerTestGenerator, BannerTargeting, BannerTest } from '@sdc/shared/dist/types';
import { CountryGroupId } from '@sdc/shared/dist/lib';
import { BannerContent } from '@sdc/shared/types';
import { GWContent, USDigisubContent, UKDigisubContent } from './propensityModelTestCopy';
import { isInPropensityTest } from './propensityModelTestData';

/**
 * This file defines a banner AB test based on ML propensity model data.
 * It targets browserIds identified as both:
 * - high-propensity Guardian Weekly
 * - low-propensity Digisub
 *
 * Only browserIds in this list are put into the test.
 * In the control, all browsers see Digisub banner.
 * In the variant, all browsers see GW banner.
 */

const buildTest = (
    locations: CountryGroupId[],
    name: string,
    digisubContent: BannerContent,
    gwContent: BannerContent,
): BannerTest => ({
    name: `2022-03-28_BannerTargeting_GW_DS_Propensity__${name}`,
    bannerChannel: 'subscriptions',
    userCohort: 'AllNonSupporters',
    locations,
    canRun: (targeting: BannerTargeting) =>
        !!targeting.browserId && isInPropensityTest(targeting.browserId),
    minPageViews: 4,
    variants: [
        {
            name: 'control',
            modulePathBuilder: contributionsBanner.endpointPathBuilder,
            moduleName: 'ContributionsBanner',
            bannerContent: digisubContent,
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
        },
        {
            name: 'variant',
            modulePathBuilder: guardianWeekly.endpointPathBuilder,
            moduleName: 'GuardianWeeklyBanner',
            bannerContent: gwContent,
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
        },
    ],
});

export const propensityModelBannerTest: BannerTestGenerator = () =>
    // On startup resolve immediately rather than wait to stream the browserIds, to avoid blocking all banner tests from running
    Promise.resolve([
        buildTest(['UnitedStates'], 'US', USDigisubContent, GWContent),
        buildTest(['GBPCountries'], 'UK', UKDigisubContent, GWContent),
        // TODO others
    ]);
