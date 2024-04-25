import { getWeeksInWindow } from '../../lib/history';
import { WeeklyArticleHistory, WeeklyArticleLog } from '@sdc/shared/types';
import { Filter } from './epicSelection';

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
    high: 5
} as const;

function isIncreasedEngagement(weeksInWindow: WeeklyArticleHistory): boolean {
    const categoryForThirdMonth = getCategoryOfArticleViewed(weeksInWindow.slice(0, 4));
    const categoryForSecondMonth = getCategoryOfArticleViewed(weeksInWindow.slice(4, 8));
    const categoryForFirstMonth = getCategoryOfArticleViewed(weeksInWindow.slice(8));
    if (
        categoryForThirdMonth >= categoryForSecondMonth &&
        categoryForSecondMonth >= categoryForFirstMonth
    ) {
        return categoryForThirdMonth - categoryForFirstMonth >= jumps.mediumHigh;
    }
    return false;
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

export const momentumMatches: Filter = {
    id: 'momentumMatches',
    test: (test, targeting): boolean => {
        if (test.name === 'momentumEpic') {
            if (!targeting.weeklyArticleHistory || targeting.weeklyArticleHistory.length < 12) {
                return false;
            }
            const weeksInWindow = getWeeksInWindow(targeting.weeklyArticleHistory, 12, new Date());
            if (weeksInWindow.length < 12) {
                return false;
            }
            return isIncreasedEngagement(weeksInWindow);
        }
        return true;
    },
};