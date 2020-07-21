import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
} from '../../components/modules/banners/BannerTypes';
import { TickerCountType, TickerEndType } from '../../lib/variants';

export const AusMomentThankYouBannerPath = 'aus-moment-thank-you-banner.js';
const name = 'AusMomentThankYouBanner';

export const AusMomentThankYouBanner: BannerTest = {
    name,
    bannerType: 'contributions',
    testAudience: 'All',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        targeting.countryCode === 'AU',
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            tickerSettings: {
                countType: TickerCountType.people,
                endType: TickerEndType.unlimited,
                currencySymbol: '$',
                // Usually we need the ticker copy, but this banner has a very custom ticker
                copy: {
                    countLabel: '',
                    goalReachedPrimary: '',
                    goalReachedSecondary: '',
                },
            },
            modulePath: AusMomentThankYouBannerPath,
            moduleName: name,
        },
    ],
};
