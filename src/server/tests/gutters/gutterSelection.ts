import { inTargetedCountry } from '../../../shared/lib';
import type {
    GutterTargeting,
    GutterTest,
    GutterTestSelection,
    GutterVariant,
    UserDeviceType,
} from '../../../shared/types';
import { selectVariantUsingMVT } from '../../lib/ab';
import type { TestVariant } from '../../lib/params';
import { audienceMatches, correctSignedInStatus, pageContextMatches } from '../../lib/targeting';


const moduleName = 'Gutter';

export const isCountryTargetedForGutterAsks = (
    test: GutterTest,
    targeting: GutterTargeting,
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

// Exported for Jest testing
export const selectBestTest = (
    targeting: GutterTargeting,
    userDeviceType: UserDeviceType,
    allTests: GutterTest[],
): GutterTestSelection | null => {
    const { showSupportMessaging, isSignedIn } = targeting;

    const selectedTest = allTests.find((test) => {
        const { status, userCohort, signedInStatus, contextTargeting } = test;

        // build pageContext
        const pageContext = {
            tagIds: targeting.tagIds,
            sectionId: targeting.sectionId,
        };

        return (
            status === 'Live' &&
            audienceMatches(showSupportMessaging, userCohort) &&
            isCountryTargetedForGutterAsks(test, targeting) &&
            correctSignedInStatus(isSignedIn, signedInStatus) &&
            pageContextMatches(pageContext, contextTargeting)
        );
    });

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest?.variants.length) {
        return null;
    }

    const selectedVariant: GutterVariant = selectVariantUsingMVT(selectedTest, targeting.mvtId);

    return {
        test: selectedTest,
        variant: selectedVariant,
        moduleName: selectedVariant.moduleName || moduleName,
    };
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: GutterTest[],
): GutterTestSelection | null => {
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
            moduleName: variant.moduleName || moduleName,
        };
    }
    return null;
};

export const selectGutterTest = (
    targeting: GutterTargeting,
    configuredTests: GutterTest[],
    userDeviceType: UserDeviceType,
    forcedTestVariant?: TestVariant,
): GutterTestSelection | null => {
    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, configuredTests);
    }
    return selectBestTest(targeting, userDeviceType, configuredTests);
};
