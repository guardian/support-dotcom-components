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
    weeks: number = 52,
    rightNow: Date = new Date(),
): number => {
    const mondayThisWeek = getMondayFromDate(rightNow);
    const cutOffWeek = mondayThisWeek - weeks * 7;

    // Filter only weeks within cutoff period
    const weeksInWindow = history.filter(
        (weeklyArticleLog: WeeklyArticleLog) => weeklyArticleLog.week >= cutOffWeek,
    );

    return weeksInWindow.reduce(
        (accumulator: number, currentValue: WeeklyArticleLog) => currentValue.count + accumulator,
        0,
    );
};
