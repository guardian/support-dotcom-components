import { BannerPageTracking, BannerTargeting, BannerTest } from '../../components/BannerTypes';
import { TickerCountType, TickerEndType } from '../../lib/variants';

export const AusMomentContributionsBannerPath = 'aus-moment-banner.js';

export const AusMomentContributionsBanner: BannerTest = {
    name: 'AusMomentContributionsBanner',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        // targeting.countryCode === 'AU',
        true,
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
            modulePath: AusMomentContributionsBannerPath,
            moduleName: 'AusMomentContributionsBanner',
        },
    ],
};
