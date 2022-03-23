import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2022-03-18_BannerTargeting_PageView',
        // Exclude browsers that have not consented to article counting
        canInclude: (targeting: BannerTargeting) => targeting.articleCountToday !== undefined,
        variants: [
            {
                name: 'control',
                // show banner on first page view after redeploy
                canShow: () => true,
            },
            {
                name: 'variant1',
                // show on/after 1st article view of the day
                canShow: (targeting: BannerTargeting) => (targeting.articleCountToday || 0) >= 1,
            },
        ],
    },
];
