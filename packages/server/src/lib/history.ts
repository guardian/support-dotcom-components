import {
    ArticleCounts,
    ArticlesViewedSettings,
    ArticlesViewedByTagSettings,
    WeeklyArticleHistory,
    WeeklyArticleLog,
} from '@sdc/shared/types';
import { getMondayFromDate } from '@sdc/shared/lib';

const getWeeksInWindow = (
    history: WeeklyArticleHistory = [],
    weeks = 52,
    rightNow: Date = new Date(),
): WeeklyArticleLog[] => {
    const mondayThisWeek = getMondayFromDate(rightNow);
    const cutOffWeek = mondayThisWeek - weeks * 7;

    // Filter only weeks within cutoff period
    return history.filter(
        (weeklyArticleLog: WeeklyArticleLog) => weeklyArticleLog.week >= cutOffWeek,
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

// If articlesViewedByTagSettings is set then use this for the `forTargetedWeeks` count
export const getArticleViewCounts = (
    history: WeeklyArticleHistory = [],
    articlesViewedByTagSettings?: ArticlesViewedByTagSettings,
    weeks = 52,
): ArticleCounts => {
    const for52Weeks = getArticleViewCountForWeeks(history, 52);

    const getCountForTargetingWeeks = (): number => {
        if (articlesViewedByTagSettings) {
            const { tagId, periodInWeeks } = articlesViewedByTagSettings;
            return getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks);
        }
        return weeks === 52 ? for52Weeks : getArticleViewCountForWeeks(history, weeks);
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

    const { minViews, maxViews, periodInWeeks } = articlesViewedSettings;

    const viewCountForWeeks = getArticleViewCountForWeeks(history, periodInWeeks, now);
    const minViewsOk = minViews ? viewCountForWeeks >= minViews : true;
    const maxViewsOk = maxViews ? viewCountForWeeks <= maxViews : true;

    return minViewsOk && maxViewsOk;
};

export const historyWithinArticlesViewedSettingsByTag = (
    articlesViewedSettings?: ArticlesViewedByTagSettings,
    history: WeeklyArticleHistory = [],
    now: Date = new Date(),
): boolean => {
    if (!articlesViewedSettings) {
        return true;
    }

    const { tagId, minViews, periodInWeeks } = articlesViewedSettings;
    const count = getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks, now);
    return count >= minViews;
};
