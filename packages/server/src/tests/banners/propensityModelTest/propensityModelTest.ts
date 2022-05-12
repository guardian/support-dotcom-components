import { contributionsBanner, guardianWeekly } from '@sdc/shared/dist/config';
import {
    BannerTestGenerator,
    BannerTargeting,
    OphanComponentType,
    BannerTemplate,
    BannerVariant,
} from '@sdc/shared/dist/types';
import { countryCodeToCountryGroupId, inCountryGroups } from '@sdc/shared/dist/lib';
import { UK_DIGISUB_CONTENT, DIGISUB_CONTENT } from './propensityModelTestDigisubCopy';
import { fetchHighPropensityIds, isInPropensityTest } from './propensityModelTestData';
import { GW_CONTENT } from './propensityModelTestGWCopy';

/**
 * This file defines a banner AB test based on ML propensity model data.
 *
 * All browsers are put into the test.
 *
 * In the control:
 *  - all European browsers see GW
 *  - all other browsers see DS
 *
 * In the variant:
 *  - all high-GW/low-DS browsers see GW
 *  - all other browsers see DS
 */

const channelName: OphanComponentType = 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'; // aka channel 2

export const PROPENSITY_MODEL_TEST_NAME = '2022-04-20_BannerTargeting_GW_DS_Propensity_v2';
const CONTROL_NAME = 'control';
const VARIANT_NAME = 'variant';

export const propensityModelBannerTest: BannerTestGenerator = () => {
    // Kick off streaming of browserIds into memory, but resolve immediately to avoid blocking other tests
    fetchHighPropensityIds();

    return Promise.resolve([
        {
            name: PROPENSITY_MODEL_TEST_NAME,
            bannerChannel: 'subscriptions',
            // Exclude AU/NZ, which has an offer
            locations: ['GBPCountries', 'UnitedStates', 'EURCountries', 'International', 'Canada'],
            isHardcoded: true,
            userCohort: 'AllNonSupporters',
            canRun: () => true,
            minPageViews: 4,
            variants: [
                {
                    name: CONTROL_NAME,
                    modulePathBuilder: contributionsBanner.endpointPathBuilder,
                    moduleName: BannerTemplate.ContributionsBanner,
                    bannerContent: UK_DIGISUB_CONTENT,
                    componentType: channelName,
                },
                {
                    name: VARIANT_NAME,
                    modulePathBuilder: guardianWeekly.endpointPathBuilder,
                    moduleName: BannerTemplate.GuardianWeeklyBanner,
                    bannerContent: GW_CONTENT,
                    componentType: channelName,
                },
            ],
        },
    ]);
};

const getGWBanner = (variantName: string): BannerVariant => ({
    name: variantName,
    modulePathBuilder: guardianWeekly.endpointPathBuilder,
    moduleName: BannerTemplate.GuardianWeeklyBanner,
    bannerContent: GW_CONTENT,
    componentType: channelName,
});

const getDSBanner = (variantName: string, targeting: BannerTargeting): BannerVariant => ({
    name: variantName,
    modulePathBuilder: contributionsBanner.endpointPathBuilder,
    moduleName: BannerTemplate.ContributionsBanner,
    bannerContent:
        DIGISUB_CONTENT[countryCodeToCountryGroupId(targeting.countryCode.toUpperCase())],
    componentType: channelName,
});

const getControlBanner = (variantName: string, targeting: BannerTargeting): BannerVariant =>
    // are they in Europe?
    inCountryGroups(targeting.countryCode, ['EURCountries'])
        ? getGWBanner(variantName)
        : getDSBanner(variantName, targeting);

const getVariantBanner = (variantName: string, targeting: BannerTargeting): BannerVariant =>
    // are they high-propensity?
    targeting.browserId && isInPropensityTest(targeting.browserId)
        ? getGWBanner(variantName)
        : getDSBanner(variantName, targeting);

// This test is unusual because we decide what to show *after* assigning the browser to a variant
export const getPropensityModelTestVariantData = (
    variantName: string,
    targeting: BannerTargeting,
): BannerVariant =>
    variantName === CONTROL_NAME
        ? getControlBanner(variantName, targeting)
        : getVariantBanner(variantName, targeting);
