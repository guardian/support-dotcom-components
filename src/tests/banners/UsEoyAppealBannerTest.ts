import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { usEoyAppealWithVisual } from '../../modules';
import { TickerCountType, TickerEndType } from '../../lib/variants';

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.unlimited,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: 'You can still give!',
        goalReachedSecondary: '',
    },
};

const isLive = true;

export const UsEoyAppealNonSupportersBanner: BannerTest = {
    name: 'UsEoyAppealXmasNonSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
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

export const UsEoyAppealSupportersBanner: BannerTest = {
    name: 'UsEoyAppealXmasSupporters',
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
