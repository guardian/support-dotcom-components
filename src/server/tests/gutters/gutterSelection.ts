import { inCountryGroups } from '../../../shared/lib';
import {
    GutterTargeting,
    GutterTest,
    GutterTestSelection,
    GutterVariant,
    UserDeviceType,
} from '../../../shared/types';

import { selectVariantUsingMVT } from '../../lib/ab';
import { audienceMatches, correctSignedInStatus } from '../../lib/targeting';

import { TestVariant } from '../../lib/params';

// TODO: consider some suitable tests and remove unnecessary ones

const moduleName = 'Gutter';

// hard coded tests
const supportersTest: GutterTest = {
    channel: 'Gutter',
    name: 'gutter-supporter',
    priority: 99,
    userCohort: 'AllExistingSupporters',
    status: 'Live',
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'GBPCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    variants: [
        {
            name: 'control',
            moduleName,
            content: {
                image: {
                    mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
                    altText: 'Not for Sale',
                },
                bodyCopy: [
                    'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support us',
                },
            },
        },
    ],
};

const hardcodedTests = [supportersTest];

// Exported for Jest testing
export const selectBestTest = (
    targeting: GutterTargeting,
    userDeviceType: UserDeviceType,
    allTests: GutterTest[],
): GutterTestSelection | null => {
    const { showSupportMessaging, countryCode, isSignedIn } = targeting;

    const selectedTest = allTests.find((test) => {
        const { status, userCohort, locations, signedInStatus } = test;

        return (
            status === 'Live' &&
            audienceMatches(showSupportMessaging, userCohort) &&
            inCountryGroups(countryCode, locations) &&
            correctSignedInStatus(isSignedIn, signedInStatus)
        );
    });

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest || !selectedTest.variants.length) {
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
    const allTests = [...configuredTests, ...hardcodedTests];

    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, allTests);
    }
    return selectBestTest(targeting, userDeviceType, allTests);
};
