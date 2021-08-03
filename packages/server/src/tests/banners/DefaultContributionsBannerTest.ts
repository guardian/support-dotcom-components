import { contributionsBanner } from '@sdc/shared/config';
import { BannerTargeting, BannerTest, PageTracking } from '@sdc/shared/types';
import { DefaultBannerContent } from './DefaultContributionsBannerContent';

export const DefaultContributionsBanner: BannerTest = {
    name: 'DefaultContributionsBanner',
    bannerChannel: 'contributions',
    userCohort: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (_targeting: BannerTargeting, _pageTracking: PageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePathBuilder: contributionsBanner.endpointPathBuilder,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: DefaultBannerContent,
        },
    ],
};
