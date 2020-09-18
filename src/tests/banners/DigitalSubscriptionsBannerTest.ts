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
        if (targeting.switches.remoteSubscriptionsBanner) {
            const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
            return !(region === 'australia' || region === 'rest-of-world');
        }
        return false;
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: DigitalSubscriptionsBannerPath,
            moduleName: name,
            bannerContent: {
                messageText:
                    'Support the Guardian with a Digital Subscription, enjoy our reporting without ads and get premium access to our Live app and The Daily',
                heading: 'Enjoy ad-free reading and the best of our apps',
            },
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
            products: ['DIGITAL_SUBSCRIPTION'],
        },
    ],
};
