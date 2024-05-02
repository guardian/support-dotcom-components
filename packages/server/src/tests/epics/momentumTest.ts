import { getWeeksInWindow } from '../../lib/history';
import { WeeklyArticleHistory, WeeklyArticleLog } from '@sdc/shared/types';
import { Filter } from './epicSelection';
import { subWeeks } from 'date-fns';
import { logger } from '../../utils/logging';

/*
We categorize into 6 buckets of article count/engagement.

    1. 1-10
    2. 11-20
    3. 21-30
    4. 31-40
    5.41-50
    6. 50+

We use the below logic to measure the momentum of engagement.
Low  -- jumped two categories
Medium -- jumped three categories
Medium-High -- jumped four categories
High -- jumped five categories
 */

const jumps = {
    low: 2,
    medium: 3,
    mediumHigh: 4,
    high: 5,
} as const;

export function getThreeMonthsHistory(
    articleHistory: WeeklyArticleHistory,
    now: Date = new Date(),
) {
    const mostRecentMonthHistory = getWeeksInWindow(articleHistory, 4, now);

    const startOfSecondMostRecentMonth = subWeeks(now, 5);

    const secondMostRecentMonthHistory = getWeeksInWindow(
        articleHistory,
        3,
        startOfSecondMostRecentMonth,
    );

    const startOfThirdMostRecentMonth = subWeeks(now, 9);

    const thirdMostRecentMonthHistory = getWeeksInWindow(
        articleHistory,
        3,
        startOfThirdMostRecentMonth,
    );

    return { mostRecentMonthHistory, secondMostRecentMonthHistory, thirdMostRecentMonthHistory };
}

export function getCategoriesForThreeMonths(articleHistory: WeeklyArticleHistory, now: Date) {
    const { mostRecentMonthHistory, secondMostRecentMonthHistory, thirdMostRecentMonthHistory } =
        getThreeMonthsHistory(articleHistory, now);

    const categoryForThirdMonth = getCategoryOfArticleViewed(mostRecentMonthHistory);
    const categoryForSecondMonth = getCategoryOfArticleViewed(secondMostRecentMonthHistory);
    const categoryForFirstMonth = getCategoryOfArticleViewed(thirdMostRecentMonthHistory);

    return { categoryForThirdMonth, categoryForSecondMonth, categoryForFirstMonth };
}

const getCategoryOfArticleViewed = (history: WeeklyArticleHistory): number => {
    const sum = history.reduce(
        (accumulator: number, articleLog: WeeklyArticleLog) => articleLog.count + accumulator,
        0,
    );
    return getCategory(sum);
};

const getCategory = (count: number): number => {
    if (count > 50) {
        return 6;
    }

    return Math.ceil(count / 10);
};

export function isIncreasedEngagement(
    articleHistory: WeeklyArticleHistory,
    now: Date = new Date(),
): boolean {
    const { categoryForThirdMonth, categoryForSecondMonth, categoryForFirstMonth } =
        getCategoriesForThreeMonths(articleHistory, now);

    const articleHistoryWithoutTags = articleHistory.map(({ week, count }) => ({
        week,
        count,
    }));

    if (
        categoryForThirdMonth > categoryForSecondMonth &&
        categoryForSecondMonth > categoryForFirstMonth
    ) {
        const isIncreasedEngagement =
            categoryForThirdMonth - categoryForFirstMonth >= jumps.mediumHigh;

        logger.info({
            message: 'Decision to show Momentum Epic',
            isIncreasedEngagement,
            categoryForFirstMonth,
            categoryForSecondMonth,
            categoryForThirdMonth,
            articleHistoryWithoutTags,
        });

        return isIncreasedEngagement;
    }

    logger.info({
        message: 'Decision to show Momentum Epic',
        isIncreasedEngagement: false,
        categoryForFirstMonth,
        categoryForSecondMonth,
        categoryForThirdMonth,
        articleHistoryWithoutTags,
    });

    return false;
}

export const momentumMatches: Filter = {
    id: 'momentumMatches',
    test: (test, targeting): boolean => {
        if (test.name.includes('MOMENTUM_EPIC')) {
            if (!targeting.weeklyArticleHistory) {
                return false;
            }

            // take only 13 as a small optimisation to not process 52 weeks
            const threeMonthsHistory = targeting.weeklyArticleHistory.slice(0, 13);
            return isIncreasedEngagement(threeMonthsHistory);
        }

        return true;
    },
};
