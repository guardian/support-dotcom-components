import { header, signInPromptHeader } from '@sdc/shared/config';
import { inCountryGroups } from '@sdc/shared/lib';
import { HeaderTargeting, HeaderTest, HeaderTestSelection, HeaderVariant } from '@sdc/shared/types';

import { selectVariant } from '../../lib/ab';
import { audienceMatches, deviceTypeMatches, userIsInTest } from '../../lib/targeting';

import { fetchConfiguredHeaderTestsCached } from './headerTests';
import { TestVariant } from '../../lib/params';

const modulePathBuilder = header.endpointPathBuilder;
const moduleName = 'Header';

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
            moduleName,
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
            moduleName,
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
            moduleName,
            content: {
                heading: 'Thank you',
                subheading: 'Your support powers our independent journalism',
            },
        },
    ],
};

const signInPromptTest: HeaderTest = {
    name: 'header-sign-in-prompt',
    userCohort: 'Everyone', // Not really true, but I don't think we have a matching cohort yet?
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
            modulePathBuilder: signInPromptHeader.endpointPathBuilder,
            moduleName: 'SignInPromptHeader',
            content: {
                heading: 'Thank you for subscribing',
                subheading: 'Enjoy the Guardian',
                primaryCta: {
                    baseUrl: 'https://profile.theguardian.com/register',
                    text: 'Complete registration',
                },
            },
        },
    ],
};

const hardcodedTests = [supportersTest, nonSupportersTestUK, nonSupportersTestNonUK];

// Exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    isMobile: boolean,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, countryCode } = targeting;

    let selectedTest: HeaderTest | undefined;

    if (targeting.showLoginMessaging) {
        selectedTest = signInPromptTest;
    } else {
        selectedTest = allTests.find(test => {
            const { isOn, userCohort, locations } = test;

            return (
                isOn &&
                audienceMatches(showSupportMessaging, userCohort) &&
                inCountryGroups(countryCode, locations) &&
                userIsInTest(test, targeting.mvtId) &&
                deviceTypeMatches(test, isMobile)
            );
        });
    }

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest || !selectedTest.variants.length) {
        return null;
    }

    const selectedVariant: HeaderVariant = selectVariant(selectedTest, targeting.mvtId);

    return {
        test: selectedTest,
        variant: selectedVariant,
        modulePathBuilder: selectedVariant.modulePathBuilder || modulePathBuilder,
        moduleName: selectedVariant.moduleName || moduleName,
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
            modulePathBuilder: variant.modulePathBuilder || modulePathBuilder,
            moduleName: variant.moduleName || moduleName,
        };
    }
    return null;
};

export const selectHeaderTest = async (
    targeting: HeaderTargeting,
    isMobile: boolean,
    forcedTestVariant?: TestVariant,
): Promise<HeaderTestSelection | null> => {
    const configuredTests = await fetchConfiguredHeaderTestsCached().catch(() => []);
    const allTests = [...configuredTests, ...hardcodedTests];

    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, allTests);
    }
    return selectBestTest(targeting, isMobile, allTests);
};
