import { BannerPageTracking, BannerTargeting, BannerTest } from '../../components/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const WeeklyBannerPath = 'weekly-banner.js';

export const WeeklyBanner: BannerTest = {
    name: 'WeeklyBanner',
    path: WeeklyBannerPath,
    bannerType: 'subscriptions',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
        return region === 'australia' || region === 'rest-of-world';
    },
    minPageViews: 2,
};
