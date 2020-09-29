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
            return region === 'australia';
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
                    "Support The Guardian's independent journalism by subscribing to The Guardian Weekly, our essential world news magazine. Home delivery available wherever you are.",
                heading: 'Read The Guardian in print',
            },
            componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
            products: ['PRINT_SUBSCRIPTION'],
        },
    ],
};
