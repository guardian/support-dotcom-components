import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
} from '../../components/modules/banners/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const GuardianWeeklyBannerPath = 'guardian-weekly-banner.js';
const name = 'GuardianWeeklyBanner';

export const GuardianWeeklyBanner: BannerTest = {
    name,
    bannerType: 'subscriptions',
    testAudience: 'NonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        if (targeting.switches.remoteSubscriptionsBanner) {
            const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
            return region === 'australia' || region === 'rest-of-world';
        }
        return false;
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: GuardianWeeklyBannerPath,
            moduleName: name,
        },
    ],
};
