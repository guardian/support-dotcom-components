import { getWeeksInWindow } from '../../lib/history';
import { WeeklyArticleHistory, WeeklyArticleLog } from '@sdc/shared/types';
import { Filter } from './epicSelection';

export const momentumMatches: Filter = {
    id: 'momentumMatches',
    test: (test, targeting): boolean => {
        if (test.name === 'momentumEpic') {
            if (!targeting.weeklyArticleHistory || targeting.weeklyArticleHistory.length < 12) {
                return false;
            }
            const weeksInWindow = getWeeksInWindow(targeting.weeklyArticleHistory, 12, new Date());
            console.log("weeksInWindow", weeksInWindow);
            const categoryForThirdMonth = getCategoryOfArticleViewed(weeksInWindow.slice(0, 4));
            const categoryForSecondMonth = getCategoryOfArticleViewed(weeksInWindow.slice(4, 8));
            const categoryForFirstMonth = getCategoryOfArticleViewed(weeksInWindow.slice(8));
            if (
                categoryForThirdMonth >= categoryForSecondMonth &&
                categoryForSecondMonth >= categoryForFirstMonth
            ) {
                return categoryForThirdMonth - categoryForFirstMonth >= 4;
            }
            return false;
        }
        return true;
    },
};

const getCategoryOfArticleViewed = (history: WeeklyArticleHistory): number => {
    const sum = history.reduce(
        (accumulator: number, articleLog: WeeklyArticleLog) => articleLog.count + accumulator,
        0,
    );
    return getCategory(sum);
};

const getCategory = (count: number): number => {
    if (count >= 50) {
        return 5;
    }
    return Math.ceil(count / 10);
};
