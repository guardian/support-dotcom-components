import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const DigitalSubscriptionsBannerPath = 'digital-subscriptions-banner.js';
const name = 'DigitalSubscriptionsBanner';

export const DigitalSubscriptionsBanner: BannerTest = {
    name,
    bannerChannel: 'subscriptions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
        return region !== 'EuropeanUnion';
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: DigitalSubscriptionsBannerPath,
            moduleName: name,
            bannerContent: {
                heading: 'Start a digital subscription today',
                messageText:
                    'Enjoy our journalism <strong>without ads</strong>, as well as Premium access to <strong>our Live and Editions apps</strong>. And for a few weeks only, read <strong>Edition Earth</strong>, a digital exclusive showcase of the best Guardian journalism on climate, wildlife, air pollution, environmental justice – and solutions too.',
            },
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
            products: ['DIGITAL_SUBSCRIPTION'],
        },
    ],
};
