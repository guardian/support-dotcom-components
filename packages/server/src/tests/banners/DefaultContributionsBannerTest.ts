import { BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { DefaultBannerContent } from './DefaultContributionsBannerContent';
import { contributionsBanner } from '../../modules';
import { PageTracking } from '../../types/shared';

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
