import { ArticlesViewedSettings, WeeklyArticleHistory, WeeklyArticleLog } from '@sdc/shared/types';
import { ArticleCounts } from '@sdc/shared/types';

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

export const getArticleViewCounts = (
    history: WeeklyArticleHistory = [],
    weeks: number = 52,
): ArticleCounts => {
    const for52Weeks = getArticleViewCountForWeeks(history, 52);
    const forTargetedWeeks =
        weeks === 52 ? for52Weeks : getArticleViewCountForWeeks(history, weeks);

    return {
        for52Weeks,
        forTargetedWeeks,
    };
};

export const historyWithinArticlesViewedSettings = (
    articlesViewedSettings?: ArticlesViewedSettings,
    history: WeeklyArticleHistory = [],
    now: Date = new Date(),
): boolean => {
    // Allow test to pass if no articles viewed settings have been set
    if (!articlesViewedSettings || !articlesViewedSettings.periodInWeeks) {
        return true;
    }

    const { minViews, maxViews, periodInWeeks } = articlesViewedSettings;

    const viewCountForWeeks = getArticleViewCountForWeeks(history, periodInWeeks, now);
    const minViewsOk = minViews ? viewCountForWeeks >= minViews : true;
    const maxViewsOk = maxViews ? viewCountForWeeks <= maxViews : true;

    return minViewsOk && maxViewsOk;
};
