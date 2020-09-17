import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';

export const EnvironmentMomentBannerPath = 'environment-moment-banner.js';
const name = 'EnvironmentMomentBanner';

export const EnvironmentMomentBanner: BannerTest = {
    name,
    bannerType: 'contributions',
    testAudience: 'Everyone',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: EnvironmentMomentBannerPath,
            moduleName: name,
        },
    ],
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};
