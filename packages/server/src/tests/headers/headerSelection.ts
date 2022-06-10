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
    status: 'Live',
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
    status: 'Live',
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
    userCohort: 'Everyone',
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
    isSignedIn: false,
};

const baseSignInPromptVariant: Omit<HeaderVariant, 'content'> = {
    name: 'control',
    modulePathBuilder: signInPromptHeader.endpointPathBuilder,
    moduleName: 'SignInPromptHeader',
};

const subscriberContent = {
    heading: 'Thank you for subscribing',
    subheading: 'One more step to enjoy the Guardian',
};

const supporterContent = {
    heading: 'Thank you for your support',
    subheading: 'One more step to enjoy the Guardian',
};

const signInCTA = {
    baseUrl: 'https://profile.theguardian.com/signin',
    text: 'Sign in',
};

const registerCTA = {
    baseUrl: 'https://profile.theguardian.com/register',
    text: 'Complete registration',
};

const baseBenefits = ['Fewer interruptions', 'Newsletters and comments'];
const digiSubBenefits = ['Ad free', ...baseBenefits];

const signInPromptNewUserDigitalSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-user-digital-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['DigitalPack'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: registerCTA,
                benefits: digiSubBenefits,
            },
        },
    ],
};

const signInPromptNewUserPrintSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-user-print-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['GuardianWeekly', 'Paper'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: registerCTA,
                benefits: baseBenefits,
            },
        },
    ],
};

const signInPromptNewUserSupporterTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-user-supporter',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['Contribution'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...supporterContent,
                primaryCta: registerCTA,
                benefits: baseBenefits,
            },
        },
    ],
};

const signInPromptExistingUserDigitalSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-user-digital-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['DigitalPack'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: signInCTA,
                benefits: digiSubBenefits,
            },
        },
    ],
};

const signInPromptExistingUserPrintSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-user-print-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['GuardianWeekly', 'Paper'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: signInCTA,
                benefits: baseBenefits,
            },
        },
    ],
};

const signInPromptExistingUserSupporterTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-user-supporter',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['Contribution'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...supporterContent,
                primaryCta: signInCTA,
                benefits: baseBenefits,
            },
        },
    ],
};

const hardcodedTests = [
    supportersTest,
    nonSupportersTestUK,
    nonSupportersTestNonUK,
    signInPromptNewUserDigitalSubscriberTest,
    signInPromptNewUserPrintSubscriberTest,
    signInPromptNewUserSupporterTest,
    signInPromptExistingUserDigitalSubscriberTest,
    signInPromptExistingUserPrintSubscriberTest,
    signInPromptExistingUserSupporterTest,
];

const purchaseMatches = (
    test: HeaderTest,
    purchaseInfo: HeaderTargeting['purchaseInfo'],
    isSignedIn: boolean,
) => {
    const { purchaseInfo: testPurchaseInfo } = test;

    if (isSignedIn || !purchaseInfo) {
        return true;
    }

    const { product, userType } = purchaseInfo;
    const productValid = product && testPurchaseInfo?.product.includes(product);
    const userValid = userType && testPurchaseInfo?.userType.includes(userType);

    return productValid && userValid;
};

// Exported for Jest testing
export const selectBestTest = (
    targeting: HeaderTargeting,
    isMobile: boolean,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, countryCode, purchaseInfo, isSignedIn } = targeting;

    const selectedTest = allTests.find(test => {
        const { status, userCohort, locations } = test;

        return (
            status === 'Live' &&
            audienceMatches(showSupportMessaging, userCohort) &&
            inCountryGroups(countryCode, locations) &&
            userIsInTest(test, targeting.mvtId) &&
            deviceTypeMatches(test, isMobile) &&
            purchaseMatches(test, purchaseInfo, isSignedIn)
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