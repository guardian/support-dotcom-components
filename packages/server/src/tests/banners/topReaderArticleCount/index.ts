import {
    contributionsBanner,
    contributionsBannerTopReaderArticleCountV1,
    contributionsBannerTopReaderArticleCountV2,
} from '@sdc/shared/config';
import { BannerTest } from '@sdc/shared/types';
import { content } from './content';

export const topReaderArticleCount: BannerTest = {
    name: 'TopReaderArticleCount',
    status: 'Draft',
    bannerChannel: 'contributions',
    isHardcoded: true,
    userCohort: 'AllNonSupporters',
    minPageViews: 2,
    articlesViewedSettings: {
        minViews: 50,
        periodInWeeks: 52,
    },
    variants: [
        {
            name: 'CONTROL',
            modulePathBuilder: contributionsBanner.endpointPathBuilder,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: content,
            separateArticleCount: true,
        },
        {
            name: 'V1_AC_LEAD',
            modulePathBuilder: contributionsBannerTopReaderArticleCountV1.endpointPathBuilder,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: content,
            separateArticleCount: true,
        },
        {
            name: 'V2_CONGRATS_LEAD',
            modulePathBuilder: contributionsBannerTopReaderArticleCountV2.endpointPathBuilder,
            moduleName: 'ContributionsBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: content,
            separateArticleCount: true,
        },
    ],
};
