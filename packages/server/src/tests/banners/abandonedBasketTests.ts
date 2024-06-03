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

const baseAbandonedBasketVariant: Omit<BannerVariant, 'bannerContent'> = {
    name: 'control',
    modulePathBuilder: designableBanner.endpointPathBuilder,
    // Requires this design to exist in the RRCP!
    template: { designName: 'ABANDONEDBASKET' },
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

const heading = 'Finalise your subscription';
const paragraphs = [
    'To ensure you enjoy the full benefits of our all-access digital subscription, please return to the checkout to complete your subscription. ',
];
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
            bannerContent: {
                heading,
                paragraphs,
                cta,
            },
        },
    ],
};

const tests = [abandonedBasketTest];

export const abandonedBasketTests: BannerTestGenerator = () => Promise.resolve(tests);
