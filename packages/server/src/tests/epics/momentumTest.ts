import { getWeeksInWindow } from '../../lib/history';
import { WeeklyArticleHistory, WeeklyArticleLog } from '@sdc/shared/types';
import { Filter } from './epicSelection';
import { subWeeks } from 'date-fns';

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
    const mostRecentMonthHistory = getWeeksInWindow(articleHistory, 4);

    const startOfSecondMostRecentMonth = subWeeks(now, 4);

    const secondMostRecentMonthHistory = getWeeksInWindow(
        articleHistory,
        4,
        startOfSecondMostRecentMonth,
    ).slice(1); // remove overlapping week

    const startOfThirdMostRecentMonth = subWeeks(now, 8);

    const thirdMostRecentMonthHistory = getWeeksInWindow(
        articleHistory,
        4,
        startOfThirdMostRecentMonth,
    ).slice(1); // remove overlapping week

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

    if (
        categoryForThirdMonth > categoryForSecondMonth &&
        categoryForSecondMonth > categoryForFirstMonth
    ) {
        return categoryForThirdMonth - categoryForFirstMonth >= jumps.mediumHigh;
    }

    return false;
}

export const momentumMatches: Filter = {
    id: 'momentumMatches',
    test: (test, targeting): boolean => {
        if (test.name === 'momentumEpic') {
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
