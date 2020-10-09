import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { readerRevenueRegionFromCountryCode } from './bannerSelection';

export const GuardianWeeklyBannerPath = 'guardian-weekly-banner.js';
const name = 'GuardianWeeklyBanner';

export const GuardianWeeklyBanner: BannerTest = {
    name,
    bannerChannel: 'subscriptions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        if (targeting.switches.remoteSubscriptionsBanner) {
            const region = readerRevenueRegionFromCountryCode(targeting.countryCode);
            return region === 'Australia';
        }
        return false;
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: GuardianWeeklyBannerPath,
            moduleName: name,
            bannerContent: {
                messageText:
                    "Make sense of a chaotic world with The Guardian's weekly news magazine.",
                heading: 'Read The Guardian in print',
            },
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
            products: ['PRINT_SUBSCRIPTION'],
        },
    ],
};
