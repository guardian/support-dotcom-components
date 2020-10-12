import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { DefaultBannerContent } from './DefaultContributionsBannerContent';

export const DefaultContributionsBannerPath = 'contributions-banner.js';

export const DefaultContributionsBanner: BannerTest = {
    name: 'DefaultContributionsBanner',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => {
        // Do not serve to frontend for now
        return pageTracking.clientName === 'dcr';
    },
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: DefaultContributionsBannerPath,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: DefaultBannerContent,
        },
    ],
};
