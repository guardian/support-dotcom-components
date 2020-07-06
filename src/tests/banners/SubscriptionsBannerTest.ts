import { BannerPageTracking, BannerTargeting, BannerTest } from '../../components/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const SubscriptionsBannerPath = 'subscriptions-banner.js';

export const SubscriptionsBanner: BannerTest = {
    name: 'SubscriptionsBanner',
    path: SubscriptionsBannerPath,
    bannerType: 'subscriptions',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
        return region === 'united-kingdom' || region === 'united-states';
    },
    minPageViews: 2,
    variants: [],
};
