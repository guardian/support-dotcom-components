import { inTargetedCountry } from '../../../shared/lib';
import type {
    HeaderTargeting,
    HeaderTest,
    HeaderTestSelection,
    HeaderVariant,
    UserDeviceType,
} from '../../../shared/types';
import type { TestVariant } from '../../lib/params';
import { audienceMatches, correctSignedInStatus, deviceTypeMatches } from '../../lib/targeting';
import { selectVariantUsingMVT } from '../../selection/ab';

const moduleName = 'Header';

// --- hardcoded tests
const nonSupportersTestNonUK: HeaderTest = {
    channel: 'Header',
    name: 'RemoteRrHeaderLinksTest__NonUK',
    priority: 99,
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
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'remote',
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
    channel: 'Header',
    name: 'RemoteRrHeaderLinksTest__UK',
    priority: 99,
    userCohort: 'AllNonSupporters',
    status: 'Live',
    locations: ['GBPCountries'],
    regionTargeting: {
        targetedCountryGroups: ['GBPCountries'],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'remote',
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
    channel: 'Header',
    name: 'header-supporter',
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
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'GBPCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'control',
            moduleName,
            content: {
                heading: 'Thank you',
                subheading: 'Your support powers our independent journalism',
            },
        },
    ],
};

const baseSignInPromptTest: Omit<HeaderTest, 'name' | 'variants'> = {
    channel: 'Header',
    userCohort: 'Everyone',
    priority: 99,
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
    regionTargeting: {
        targetedCountryGroups: [
            'AUDCountries',
            'Canada',
            'EURCountries',
            'GBPCountries',
            'NZDCountries',
            'UnitedStates',
            'International',
        ],
        targetedCountryCodes: [],
    },
};

const baseSignInPromptVariant: Omit<HeaderVariant, 'content'> = {
    name: 'control',
    moduleName: 'SignInPromptHeader',
};

const subscriberContent = {
    heading: 'Thank you for subscribing',
    subheading: 'Remember to sign in for a better experience',
};

const supporterContent = {
    heading: 'Thank you for your support',
    subheading: 'Remember to sign in for a better experience',
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
// Why are benefits repeated below? The header animation ends statically on last benefit so it should be the "strongest"
const normalBenefits = [...baseBenefits, 'Manage your account', 'Fewer interruptions'];
const supporterPlusBenefits = ['Ad free', ...baseBenefits, 'Ad free'];

const signInPromptNewUserDigitalSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-new-user-digital-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['SupporterPlus'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: registerCTA,
                benefits: supporterPlusBenefits,
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
                benefits: normalBenefits,
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
                benefits: normalBenefits,
            },
        },
    ],
};

const signInPromptExistingUserDigitalSubscriberTest: HeaderTest = {
    name: 'header-sign-in-prompt-existing-user-digital-subscriber',
    ...baseSignInPromptTest,
    purchaseInfo: {
        product: ['SupporterPlus'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            content: {
                ...subscriberContent,
                primaryCta: signInCTA,
                benefits: supporterPlusBenefits,
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
                benefits: normalBenefits,
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
                benefits: normalBenefits,
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

    // Ignore tests specifying purchase info if user is signed in / if no purchase info in targeting
    if (isSignedIn || !purchaseInfo) {
        return !testPurchaseInfo;
    }

    const { product, userType } = purchaseInfo;
    const productValid = product && testPurchaseInfo?.product.includes(product);
    const userValid = userType && testPurchaseInfo?.userType.includes(userType);

    return productValid && userValid;
};

export const isCountryTargetedForHeader = (
    test: HeaderTest,
    targeting: HeaderTargeting,
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
    targeting: HeaderTargeting,
    userDeviceType: UserDeviceType,
    allTests: HeaderTest[],
): HeaderTestSelection | null => {
    const { showSupportMessaging, purchaseInfo, isSignedIn } = targeting;

    const selectedTest = allTests.find((test) => {
        const { status, userCohort, signedInStatus } = test;

        return (
            status === 'Live' &&
            audienceMatches(showSupportMessaging, userCohort) &&
            isCountryTargetedForHeader(test, targeting) &&
            deviceTypeMatches(test, userDeviceType) &&
            purchaseMatches(test, purchaseInfo, isSignedIn) &&
            correctSignedInStatus(isSignedIn, signedInStatus)
        );
    });

    // Failed to find a matching test, or the matching test has an empty variants Array
    if (!selectedTest?.variants.length) {
        return null;
    }

    const selectedVariant: HeaderVariant = selectVariantUsingMVT(selectedTest, targeting.mvtId);

    return {
        test: selectedTest,
        variant: selectedVariant,
        moduleName: selectedVariant.moduleName || moduleName,
    };
};

const getForcedVariant = (
    forcedTestVariant: TestVariant,
    tests: HeaderTest[],
): HeaderTestSelection | null => {
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

export const selectHeaderTest = (
    targeting: HeaderTargeting,
    configuredTests: HeaderTest[],
    userDeviceType: UserDeviceType,
    forcedTestVariant?: TestVariant,
): HeaderTestSelection | null => {
    const allTests = [...configuredTests, ...hardcodedTests];

    if (forcedTestVariant) {
        return getForcedVariant(forcedTestVariant, allTests);
    }
    return selectBestTest(targeting, userDeviceType, allTests);
};
