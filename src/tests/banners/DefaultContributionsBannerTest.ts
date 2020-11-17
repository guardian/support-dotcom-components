import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { DefaultBannerContent } from './DefaultContributionsBannerContent';
import { contributionsBanner } from '../../modules';

export const DefaultContributionsBanner: BannerTest = {
    name: 'DefaultContributionsBanner',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (_targeting: BannerTargeting, _pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: contributionsBanner.endpointPath,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: DefaultBannerContent,
        },
    ],
};
