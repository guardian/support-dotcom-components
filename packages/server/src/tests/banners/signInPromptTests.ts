import { BannerTemplate, BannerTest, BannerTestGenerator, BannerVariant } from '@sdc/shared/types';
import { SecondaryCtaType } from '@sdc/shared/types';

const baseSignInPromptTest: Omit<BannerTest, 'name' | 'variants'> = {
    bannerChannel: 'signIn',
    isHardcoded: true,
    userCohort: 'Everyone',
    status: 'Live',
    priority: 99,
    locations: [],
    contextTargeting: { tagIds: [], sectionIds: [], excludedTagIds: [], excludedSectionIds: [] },
};

const baseSignInPromptVariant: Omit<BannerVariant, 'bannerContent'> = {
    name: 'control',
    template: BannerTemplate.SignInPromptBanner,
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

const subscriberHeading = 'Thank you for subscribing';
const supporterHeading = 'Thank you for your support';
const subheading = 'Remember to sign in for a better experience';

const signInCTA = {
    baseUrl: 'https://profile.theguardian.com/signin',
    text: 'Sign in',
};

const registerCTA = {
    baseUrl: 'https://profile.theguardian.com/register',
    text: 'Complete registration',
};

const dismissAction = {
    type: SecondaryCtaType.Custom,
    cta: {
        baseUrl: '',
        text: 'Not now',
    },
};

const baseBenefits = ['Fewer interruptions', 'Newsletters and comments'];
const normalBenefits = [...baseBenefits, 'Manage your account'];
const supporterPlusBenefits = ['Ad free', ...baseBenefits];
const paragraphs = [subheading, ...normalBenefits];
const supporterPlusParagraphs = [subheading, ...supporterPlusBenefits];

const signInPromptNewUserDigitalSubscriberTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-new-user-digital-subscriber',
    purchaseInfo: {
        product: ['SupporterPlus'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: subscriberHeading,
                paragraphs: supporterPlusParagraphs,
                cta: registerCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const signInPromptNewUserPrintSubscriberTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-new-user-print-subscriber',
    purchaseInfo: {
        product: ['GuardianWeekly', 'Paper'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: subscriberHeading,
                paragraphs,
                cta: registerCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const signInPromptNewUserSupporterTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-new-user-supporter',
    purchaseInfo: {
        product: ['Contribution'],
        userType: ['new', 'guest'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: supporterHeading,
                paragraphs,
                cta: registerCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const signInPromptExistingUserDigitalSubscriberTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-existing-user-digital-subscriber',
    purchaseInfo: {
        product: ['SupporterPlus'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: subscriberHeading,
                paragraphs: supporterPlusParagraphs,
                cta: signInCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const signInPromptExistingUserPrintSubscriberTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-existing-user-print-subscriber',
    purchaseInfo: {
        product: ['GuardianWeekly', 'Paper'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: subscriberHeading,
                paragraphs,
                cta: signInCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const signInPromptExistingUserSupporterTest: BannerTest = {
    ...baseSignInPromptTest,
    name: 'banner-sign-in-prompt-existing-user-supporter',
    purchaseInfo: {
        product: ['Contribution'],
        userType: ['current'],
    },
    variants: [
        {
            ...baseSignInPromptVariant,
            bannerContent: {
                heading: supporterHeading,
                paragraphs,
                cta: signInCTA,
                secondaryCta: dismissAction,
            },
        },
    ],
};

const tests = [
    signInPromptNewUserDigitalSubscriberTest,
    signInPromptNewUserPrintSubscriberTest,
    signInPromptNewUserSupporterTest,
    signInPromptExistingUserDigitalSubscriberTest,
    signInPromptExistingUserPrintSubscriberTest,
    signInPromptExistingUserSupporterTest,
];

export const signInPromptTests: BannerTestGenerator = () => Promise.resolve(tests);
