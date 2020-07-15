import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
} from '../../components/modules/banners/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const WeeklyBannerPath = 'weekly-banner.js';

export const WeeklyBanner: BannerTest = {
    name: 'WeeklyBanner',
    path: WeeklyBannerPath,
    bannerType: 'subscriptions',
    testAudience: 'NonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
        return region === 'australia' || region === 'rest-of-world';
    },
    minPageViews: 2,
};
