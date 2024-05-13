import {
    ArticleCounts,
    ArticlesViewedSettings,
    WeeklyArticleHistory,
    WeeklyArticleLog,
} from '@sdc/shared/types';
import { getMondayFromDate } from '@sdc/shared/lib';

/**
 *    Gets a window of entries from the weekly article history array
 *    Includes the week of the end date plus the number of window weeks
 */
export const getWeeksInWindow = (
    history: WeeklyArticleHistory = [],
    windowWeeks = 52,
    endDateInclusive: Date = new Date(),
): WeeklyArticleLog[] => {
    const mondayThisWeek = getMondayFromDate(endDateInclusive);
    const cutOffWeek = mondayThisWeek - windowWeeks * 7;

    // Filter only weeks within cutoff period
    return history.filter(
        (weeklyArticleLog: WeeklyArticleLog) =>
            weeklyArticleLog.week <= mondayThisWeek && weeklyArticleLog.week >= cutOffWeek,
    );
};

export const getArticleViewCountForWeeks = (
    history: WeeklyArticleHistory = [],
    weeks = 52,
    rightNow: Date = new Date(),
): number => {
    const weeksInWindow = getWeeksInWindow(history, weeks, rightNow);

    return weeksInWindow.reduce(
        (accumulator: number, articleLog: WeeklyArticleLog) => articleLog.count + accumulator,
        0,
    );
};

export const getArticleViewCountByTagForWeeks = (
    tagId: string,
    history: WeeklyArticleHistory = [],
    weeks = 52,
    rightNow: Date = new Date(),
): number => {
    const weeksInWindow = getWeeksInWindow(history, weeks, rightNow);

    return weeksInWindow.reduce((accumulator: number, articleLog: WeeklyArticleLog) => {
        const countForTag = articleLog.tags?.[tagId] ?? 0;
        return accumulator + countForTag;
    }, 0);
};

// If tagId is set then use this for the `forTargetedWeeks` count
export const getArticleViewCounts = (
    history: WeeklyArticleHistory = [],
    periodInWeeks = 52,
    tagId?: string,
): ArticleCounts => {
    const for52Weeks = getArticleViewCountForWeeks(history, 52);

    const getCountForTargetingWeeks = (): number => {
        if (tagId) {
            return getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks);
        }
        return periodInWeeks === 52
            ? for52Weeks
            : getArticleViewCountForWeeks(history, periodInWeeks);
    };

    return {
        for52Weeks,
        forTargetedWeeks: getCountForTargetingWeeks(),
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

    const { minViews, maxViews, periodInWeeks, tagId } = articlesViewedSettings;

    const viewCountForWeeks = tagId
        ? getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks, now)
        : getArticleViewCountForWeeks(history, periodInWeeks, now);

    const minViewsOk = minViews ? viewCountForWeeks >= minViews : true;
    const maxViewsOk = maxViews ? viewCountForWeeks <= maxViews : true;

    return minViewsOk && maxViewsOk;
};
