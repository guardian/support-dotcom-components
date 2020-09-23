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
                heading: 'Progressive journalism',
                secondaryHeading: 'Powered by you',
                highlightedText:
                    'Two apps, to discover at your pace, uninterrupted by advertising.',

                messageText:
                    'The Guardian digital subscription gives you full access to the Guardian’s Live and Daily app for you to enjoy whenever and wherever you like.',
            },
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
            products: ['DIGITAL_SUBSCRIPTION'],
        },
    ],
};
