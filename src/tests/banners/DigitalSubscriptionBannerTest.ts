import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
} from '../../components/modules/banners/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const DigitalSubscriptionBannerPath = 'digital-subscriptions-banner.js';

export const DigitalSubscriptionBanner: BannerTest = {
    name: 'DigitalSubscriptionBanner',
    path: DigitalSubscriptionBannerPath,
    bannerType: 'subscriptions',
    testAudience: 'NonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        if (targeting.remoteSubscriptionsBannerSwitchIsOn) {
            const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
            return region === 'united-kingdom' || region === 'united-states';
        }
        return false;
    },
    minPageViews: 2,
};
