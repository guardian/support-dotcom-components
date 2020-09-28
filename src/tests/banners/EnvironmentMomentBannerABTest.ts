import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';

export const EnvironmentMomentBannerPath = 'environment-moment-banner.js';
export const EnvironmentMomentSimpleBannerPath = 'environment-moment-simple-banner.js';
const name = 'EnvironmentMomentBannerABTest';

export const EnvironmentMomentBannerABTest: BannerTest = {
    name,
    bannerType: 'contributions',
    testAudience: 'Everyone',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        targeting.countryCode !== 'AU',
    minPageViews: 2,
    variants: [
        {
            name: 'fancy',
            modulePath: EnvironmentMomentBannerPath,
            moduleName: name,
        },
        {
            name: 'simple',
            modulePath: EnvironmentMomentSimpleBannerPath,
            moduleName: name,
        },
    ],
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
    audience: 0.2,
    audienceOffset: 0,
};
