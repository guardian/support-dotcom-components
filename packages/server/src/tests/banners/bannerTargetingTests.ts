import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting, DailyArticleHistory } from '@sdc/shared/types';

const getCountForToday = (dailyArticleHistory?: DailyArticleHistory): number => {
    if (dailyArticleHistory && dailyArticleHistory[0]) {
        return dailyArticleHistory[0].count;
    }
    return 0;
};

const isNetworkFront = (targeting: BannerTargeting): boolean =>
    // https://github.com/guardian/frontend/blob/5b970cd7308175cfc1bcae2d4fb8c06ee13c5fa0/common/app/model/DotcomContentType.scala#L33
    targeting.contentType.toLowerCase() === 'network front';

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2022-02-10_BannerTargeting_PageView',
        // Exclude browsers that have not consented to article counting
        canInclude: (targeting: BannerTargeting) => !!targeting.dailyArticleHistory,
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant1',
                canShow: (targeting: BannerTargeting) =>
                    getCountForToday(targeting.dailyArticleHistory) >= 1,
            },
            {
                name: 'variant2',
                canShow: (targeting: BannerTargeting): boolean => {
                    const count = getCountForToday(targeting.dailyArticleHistory);
                    return count >= 2 || (count >= 1 && isNetworkFront(targeting));
                },
            },
        ],
    },
];
