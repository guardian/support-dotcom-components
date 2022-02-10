import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

const isNetworkFront = (targeting: BannerTargeting): boolean =>
    // https://github.com/guardian/frontend/blob/5b970cd7308175cfc1bcae2d4fb8c06ee13c5fa0/common/app/model/DotcomContentType.scala#L33
    targeting.contentType?.toLowerCase() === 'network front';

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2022-02-10_BannerTargeting_PageView',
        // Exclude browsers that have not consented to article counting
        canInclude: (targeting: BannerTargeting) => targeting.articleCountToday !== undefined,
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant1',
                canShow: (targeting: BannerTargeting) => (targeting.articleCountToday || 0) >= 1,
            },
            {
                name: 'variant2',
                canShow: (targeting: BannerTargeting): boolean => {
                    const count = targeting.articleCountToday || 0;
                    return count >= 2 || (count >= 1 && isNetworkFront(targeting));
                },
            },
        ],
    },
];
