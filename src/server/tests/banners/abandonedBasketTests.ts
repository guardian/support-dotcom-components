import type { BannerTest, BannerTestGenerator, BannerVariant } from '../../../shared/types';

const baseAbandonedBasketTest: Omit<BannerTest, 'name' | 'variants'> = {
    bannerChannel: 'abandonedBasket',
    isHardcoded: true,
    userCohort: 'AllNonSupporters',
    // We can use this as the feature switch
    status: 'Live',
    priority: 99,
    locations: [],
    contextTargeting: { tagIds: [], sectionIds: [], excludedTagIds: [], excludedSectionIds: [] },
};

const baseAbandonedBasketVariant: Omit<BannerVariant, 'bannerContent' | 'name'> = {
    // Requires this design to exist in the RRCP!
    template: { designName: 'ABANDONEDBASKET' },
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

const cta = {
    baseUrl: 'https://support.theguardian.com',
    text: 'Return to checkout',
};

const paragraphs = [
    'Your support is incredibly important to us and helps us keep our independent journalism open for all. Please consider completing your act of support today.',
];

const abandonedBasketTest: BannerTest = {
    ...baseAbandonedBasketTest,
    name: 'banner-abandoned-basket',
    variants: [
        {
            ...baseAbandonedBasketVariant,
            name: 'v1',
            bannerContent: {
                heading: 'Finish your order',
                paragraphs,
                cta,
            },
        },
        {
            ...baseAbandonedBasketVariant,
            name: 'v2',
            bannerContent: {
                heading: 'Unfinished business?',
                paragraphs,
                cta,
            },
        },
    ],
};

const tests = [abandonedBasketTest];

export const abandonedBasketTests: BannerTestGenerator = () => Promise.resolve(tests);
