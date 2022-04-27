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

const baseSignInPromptTest: Omit<HeaderTest, 'name' | 'variants'> = {
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
};

const baseSignInPromptVariant: Omit<HeaderVariant, 'content'> = {
    name: 'control',
    modulePathBuilder: signInPromptHeader.endpointPathBuilder,
    moduleName: 'SignInPromptHeader',
};

const subscriberContent = {
    heading: 'Thank you for subscribing',
    subheading: 'Enjoy the Guardian',
};

const supporterContent = {
    heading: 'Thank you for your support',
    subheading: 'Enjoy the Guardian',
};

const signInCTA = {
    baseUrl: 'https://profile.theguardian.com/register',
    text: 'Sign in',
};

const registerCTA = {
    baseUrl: 'https://profile.theguardian.com/register',
    text: 'Complete registration',
};

const signInPromptNewSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        productType: ['DIGITAL_SUBSCRIPTION'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: registerCTA,
            },
        },
    ],
};

const signInPromptNewSupporterTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-supporter',
    ...baseSignInPromptTest,
    purchaseInfo: {
        productType: ['RECURRING_CONTRIBUTION'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...supporterContent,
                primaryCta: registerCTA,
            },
        },
    ],
};

const signInPromptExistingSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        productType: ['DIGITAL_SUBSCRIPTION'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: signInCTA,
            },
        },
    ],
};

const signInPromptExistingSupporterTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-supporter',
    ...baseSignInPromptTest,
    purchaseInfo: {
        productType: ['RECURRING_CONTRIBUTION'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...supporterContent,
                primaryCta: signInCTA,
            },
        },
    ],
};

const hardcodedTests = [
    supportersTest,
    nonSupportersTestUK,
    nonSupportersTestNonUK,
    signInPromptNewSubscriberTest,
    signInPromptNewSupporterTest,
    signInPromptExistingSubscriberTest,
    signInPromptExistingSupporterTest,
];

const purchaseMatches = (test: HeaderTest, purchaseInfo: HeaderTargeting['purchaseInfo']) => {
    const { purchaseInfo: testPurchaseInfo } = test;

    if (!purchaseInfo) {
        return true;
    }

    const { productType, userType } = purchaseInfo;
    const productValid = productType && testPurchaseInfo?.productType?.includes(productType);
    const userValid = userType && testPurchaseInfo?.userType?.includes(userType);

    return productValid && userValid;
};

// Exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    isMobile: boolean,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, countryCode, purchaseInfo } = targeting;

    const selectedTest = allTests.find(test => {
        const { isOn, userCohort, locations } = test;

        return (
            isOn &&
            audienceMatches(showSupportMessaging, userCohort) &&
            inCountryGroups(countryCode, locations) &&
            userIsInTest(test, targeting.mvtId) &&
            deviceTypeMatches(test, isMobile) &&
            purchaseMatches(test, purchaseInfo)
        );
    });

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
