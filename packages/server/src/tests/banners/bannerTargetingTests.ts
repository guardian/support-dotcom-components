import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting, DailyArticleHistory } from '@sdc/shared/types';

const getCountForToday = (dailyArticleHistory?: DailyArticleHistory): number => {
    if (dailyArticleHistory && dailyArticleHistory[0]) {
        return dailyArticleHistory[0].count;
    }
    return 0;
};

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
                    return count >= 2 || (count >= 1 && targeting.contentType === 'Network Front');
                },
            },
        ],
    },
];
