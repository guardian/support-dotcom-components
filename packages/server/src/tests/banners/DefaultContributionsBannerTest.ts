import { contributionsBanner } from '@sdc/shared/config';
import { BannerTest } from '@sdc/shared/types';
import { DefaultBannerContent } from './DefaultContributionsBannerContent';

export const DefaultContributionsBanner: BannerTest = {
    name: 'DefaultContributionsBanner',
    status: 'Live',
    bannerChannel: 'contributions',
    isHardcoded: false,
    userCohort: 'AllNonSupporters',
    minArticlesBeforeShowingBanner: 2,
    variants: [
        {
            name: 'control',
            modulePathBuilder: contributionsBanner.endpointPathBuilder,
            template: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: DefaultBannerContent,
        },
    ],
};
