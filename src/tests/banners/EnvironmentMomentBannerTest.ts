import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';

export const EnvironmentMomentBannerPath = 'environment-moment-banner.js';

export const EnvironmentMomentBannerSupporters: BannerTest = {
    name: 'EnvironmentMomentBannerSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllExistingSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'fancy',
            modulePath: EnvironmentMomentBannerPath,
            moduleName: 'EnvironmentMomentBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};

export const EnvironmentMomentBannerNonSupporters: BannerTest = {
    name: 'EnvironmentMomentBannerNonSupporters',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'fancy',
            modulePath: EnvironmentMomentBannerPath,
            moduleName: 'EnvironmentMomentBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};
