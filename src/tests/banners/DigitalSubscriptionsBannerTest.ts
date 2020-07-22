import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const DigitalSubscriptionsBannerPath = 'digital-subscriptions-banner.js';
const name = 'DigitalSubscriptionsBanner';

export const DigitalSubscriptionsBanner: BannerTest = {
    name,
    bannerType: 'subscriptions',
    testAudience: 'NonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        if (targeting.switches.remoteSubscriptionsBanner) {
            const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
            return region === 'united-kingdom' || region === 'united-states';
        }
        return false;
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: DigitalSubscriptionsBannerPath,
            moduleName: name,
        },
    ],
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['DIGITAL_SUBSCRIPTION'],
};
