import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { usEoyAppeal, usEoyAppealWithVisual } from '../../modules';
import { TickerCountType, TickerEndType } from '../../lib/variants';

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.unlimited,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributions',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
};

const isLive = true;

export const UsEoyAppealNonSupportersBanner: BannerTest = {
    name: 'UsEoyAppealNonSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    locations: ['UnitedStates'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => isLive,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: usEoyAppeal.endpointPath,
            moduleName: 'UsEoyAppealBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings,
        },
        {
            name: 'variant',
            modulePath: usEoyAppealWithVisual.endpointPath,
            moduleName: 'UsEoyAppealBannerWithVisual',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings,
        },
    ],
};

export const UsEoyAppealSupportersBanner: BannerTest = {
    name: 'UsEoyAppealSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllExistingSupporters',
    locations: ['UnitedStates'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => isLive,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: usEoyAppeal.endpointPath,
            moduleName: 'UsEoyAppealBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings,
        },
        {
            name: 'variant',
            modulePath: usEoyAppealWithVisual.endpointPath,
            moduleName: 'UsEoyAppealBannerWithVisual',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings,
        },
    ],
};
