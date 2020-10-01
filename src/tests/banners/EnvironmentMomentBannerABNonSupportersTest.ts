import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';

export const environmentMomentIsLive = true;

export const EnvironmentMomentBannerPath = 'environment-moment-banner.js';
export const EnvironmentMomentSimpleBannerPath = 'environment-moment-simple-banner.js';
const name = 'EnvironmentMomentBannerABNonSupporters';

export const EnvironmentMomentBannerABNonSupporters: BannerTest = {
    name,
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        targeting.countryCode !== 'AU' && environmentMomentIsLive,
    minPageViews: 2,
    variants: [
        {
            name: 'fancy',
            modulePath: EnvironmentMomentBannerPath,
            moduleName: 'EnvironmentMomentBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
        {
            name: 'simple',
            modulePath: EnvironmentMomentSimpleBannerPath,
            moduleName: 'EnvironmentMomentSimpleBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
    audience: 0.2,
    audienceOffset: 0,
};
