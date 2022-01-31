import { header } from '@sdc/shared/config';
import { inCountryGroups } from '@sdc/shared/lib';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';

import { selectVariant } from '../../lib/ab';
import { audienceMatches, userIsInTest } from '../../lib/targeting';

import { fetchConfiguredHeaderTestsCached } from './headerTests';
import { TestVariant } from '../../lib/params';

const modulePathBuilder = header.endpointPathBuilder;

// --- hardcoded tests
const nonSupportersTestNonUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__NonUK',
    userCohort: 'AllNonSupporters',
    isOn: true,
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'NZDCountries',
        'UnitedStates',
        'International',
    ],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
                secondaryCta: {
                    baseUrl: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
            },
        },
    ],
};

const nonSupportersTestUK: HeaderTest = {
    name: 'RemoteRrHeaderLinksTest__UK',
    userCohort: 'AllNonSupporters',
    isOn: true,
    locations: ['GBPCountries'],
    variants: [
        {
            name: 'remote',
            modulePathBuilder,
            content: {
                heading: 'Support the Guardian',
                subheading: 'Available for everyone, funded by readers',
                primaryCta: {
                    baseUrl: 'https://support.theguardian.com/subscribe',
                    text: 'Subscribe',
                },
                secondaryCta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Contribute',
                },
            },
        },
    ],
};

const supportersTest: HeaderTest = {
    name: 'header-supporter',
    userCohort: 'AllExistingSupporters',
    isOn: true,
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
            modulePathBuilder,
            content: {
                heading: 'Thank you',
                subheading: 'Your support powers our independent journalism',
            },
        },
    ],
};

const hardcodedTests = [supportersTest, nonSupportersTestUK, nonSupportersTestNonUK];

// Exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, countryCode } = targeting;

    const selectedTest: HeaderTest | undefined = allTests.find(test => {
        const { isOn, userCohort, locations } = test;

        if (!isOn) {
            return false;
        }

        if (!audienceMatches(showSupportMessaging, userCohort)) {
            return false;
        }

        if (!inCountryGroups(countryCode, locations)) {
            return false;
        }

        if (!userIsInTest(test, targeting.mvtId)) {
            return false;
        }

        return true;
    });

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest || !selectedTest.variants.length) {
        return null;
    }

    const selectedVariant: HeaderVariant = selectVariant(selectedTest, targeting.mvtId);

    selectedVariant.modulePathBuilder = modulePathBuilder;

    return {
        test: selectedTest,
        variant: selectedVariant,
        modulePathBuilder,
    };
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: HeaderTest[],
): HeaderTestSelection | null => {
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
            modulePathBuilder: variant.modulePathBuilder,
        };
    }
    return null;
};

export const selectHeaderTest = async (
    targeting: HeaderTargeting,
    forcedTestVariant?: TestVariant,
): Promise<HeaderTestSelection | null> => {
    const configuredTests = await fetchConfiguredHeaderTestsCached().catch(() => []);
    const allTests = [...configuredTests, ...hardcodedTests];

    if (forcedTestVariant) {
        return Promise.resolve(getForcedVariant(forcedTestVariant, allTests));
    }
    return selectBestTest(targeting, allTests);
};
