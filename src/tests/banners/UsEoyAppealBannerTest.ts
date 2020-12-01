import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { usEoyAppealWithVisual } from '../../modules';
import { TickerCountType, TickerEndType } from '../../lib/variants';

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.unlimited,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed so far',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
};

const isLive = true;

export const UsEoyAppealBanner: BannerTest = {
    name: 'UsEoyGTAppeal',
    bannerChannel: 'contributions',
    testAudience: 'AllExistingSupporters',
    locations: ['UnitedStates'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => isLive,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: usEoyAppealWithVisual.endpointPath,
            moduleName: 'UsEoyAppealBannerWithVisual',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings,
        },
    ],
};
