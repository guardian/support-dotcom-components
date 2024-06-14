import { designableBanner } from '@sdc/shared/src/config/modules';
import type { BannerTest, BannerTestGenerator, BannerVariant } from '@sdc/shared/types';

const baseAbandonedBasketTest: Omit<BannerTest, 'name' | 'variants'> = {
    bannerChannel: 'abandonedBasket',
    isHardcoded: true,
    userCohort: 'Everyone',
    // We can use this as the feature switch
    status: 'Draft',
    priority: 99,
    locations: [],
    contextTargeting: { tagIds: [], sectionIds: [], excludedTagIds: [], excludedSectionIds: [] },
};

const baseAbandonedBasketVariant: Omit<BannerVariant, 'bannerContent' | 'name'> = {
    modulePathBuilder: designableBanner.endpointPathBuilder,
    // Requires this design to exist in the RRCP!
    template: { designName: 'ABANDONEDBASKET' },
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

const cta = {
    baseUrl: 'https://support.theguardian.com',
    text: 'Return to checkout',
};

const abandonedBasketTest: BannerTest = {
    ...baseAbandonedBasketTest,
    name: 'banner-abandoned-basket',
    variants: [
        {
            ...baseAbandonedBasketVariant,
            name: 'v1',
            bannerContent: {
                heading: 'Finish your order',
                paragraphs: [
                    'Your support is incredibly important to us and helps us keep our independent journalism open for all. Please consider finalising your support today.',
                ],
                cta,
            },
        },
        {
            ...baseAbandonedBasketVariant,
            name: 'v2',
            bannerContent: {
                heading: 'Unfinished business?',
                paragraphs: [
                    'Your support is incredibly important to us and helps us keep our independent journalism open for all. Please consider finalising your support today.',
                ],
            },
        },
    ],
};

const tests = [abandonedBasketTest];

export const abandonedBasketTests: BannerTestGenerator = () => Promise.resolve(tests);
