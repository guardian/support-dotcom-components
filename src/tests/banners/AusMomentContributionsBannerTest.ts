import { BannerTest } from '../../components/BannerTypes';
import { TickerCountType, TickerEndType } from '../../lib/variants';

export const AusMomentContributionsBannerPath = 'aus-moment-banner.js';

export const AusMomentContributionsBanner: BannerTest = {
    name: 'AusMomentContributionsBanner',
    canRun: () => true,
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
        },
    ],
};
