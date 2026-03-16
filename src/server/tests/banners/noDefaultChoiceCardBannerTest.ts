import type { BannerTest, BannerTestGenerator, BannerVariant } from '../../../shared/types';

const choiceCardsSettings = {
    choiceCards: [
        {
            product: {
                supportTier: 'Contribution' as const,
                ratePlan: 'Monthly' as const,
            },
            label: '',
            isDefault: false,
            benefits: [
                { copy: 'Give to the Guardian every month with Support' },
            ],
            destination: 'LandingPage' as const,
        },
        {
            product: {
                supportTier: 'SupporterPlus' as const,
                ratePlan: 'Monthly' as const,
            },
            label: '',
            isDefault: false,
            benefitsLabel: 'Unlock <strong>All-access digital</strong> benefits:',
            benefits: [
                { copy: 'Far fewer asks for support' },
                { copy: 'Ad-free reading' },
                { copy: 'Unlimited access to the Guardian app' },
                { copy: 'Exclusive newsletter for supporters' },
                { copy: 'Unlimited access to the Feast App' },
            ],
            pill: {
                copy: 'Recommended',
            },
            destination: 'LandingPage' as const,
        },
        {
            product: {
                supportTier: 'OneOff' as const,
            },
            label: 'Support with another amount',
            isDefault: false,
            benefits: [
                { copy: 'We welcome support of any size, any time' },
            ],
            destination: 'LandingPage' as const,
        },
    ],
};

const baseNoDefaultChoiceCardTest: Omit<BannerTest, 'name' | 'variants'> = {
    channel: 'Banner1',
    bannerChannel: 'contributions',
    isHardcoded: true,
    userCohort: 'Everyone',
    status: 'Live',
    priority: 99,
    locations: [],
    contextTargeting: { tagIds: [], sectionIds: [], excludedTagIds: [], excludedSectionIds: [] },
};

const baseNoDefaultChoiceCardVariant: Omit<BannerVariant, 'bannerContent'> = {
    name: 'Variant',
    template: { designName: 'ChoiceCardsBannerDesign' }, // We must provide a valid design configured in the tool that supports choice cards.
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
	choiceCardsSettings,
};

const noDefaultChoiceCardBannerTest: BannerTest = {
    ...baseNoDefaultChoiceCardTest,
    name: 'NoDefaultChoiceCardBannerTest',
    variants: [
        {
            ...baseNoDefaultChoiceCardVariant,
            bannerContent: {
                heading: 'Fund our independent journalism',
                paragraphs: [
                    'The Guardian\'s open, independent journalism has never been more important. We need the help of readers like you to keep it free and available for everyone. Please support us today.',
                ],
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Continue',
                },
            },
        },
    ],
};

const tests = [noDefaultChoiceCardBannerTest];

export const noDefaultChoiceCardBannerTests: BannerTestGenerator = () => Promise.resolve(tests);
