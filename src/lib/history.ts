import { WeeklyArticleLog, WeeklyArticleHistory } from '../components/ContributionsEpicTypes';

export const getMondayFromDate = (date: Date): number => {
    const day = date.getDay() || 7;
    if (day !== 1) {
        date.setHours(-24 * (day - 1));
    }
    return Math.floor(date.getTime() / 86400000);
};

export const getArticleViewCountForWeeks = (
    history: WeeklyArticleHistory = [],
    weeks: number,
): number => {
    const mondayThisWeek = getMondayFromDate(new Date());
    const cutOff = mondayThisWeek - weeks * 7;

    const firstOldWeekIndex = history.findIndex(
        (c: WeeklyArticleLog) => c.week && c.week <= cutOff,
    );

    const articleCountWindow =
        firstOldWeekIndex >= 0 ? history.slice(0, firstOldWeekIndex) : history;

    return articleCountWindow.reduce(
        (accumulator: number, currentValue: WeeklyArticleLog) => currentValue.count + accumulator,
        0,
    );
};
