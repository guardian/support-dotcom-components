import {
    ArticleCounts,
    ArticlesViewedSettings,
    ArticlesViewedByTagSettings,
    WeeklyArticleHistory,
    WeeklyArticleLog,
} from '@sdc/shared/types';

// From https://github.com/guardian/automat-client-v2/blob/master/src/contributions/lib/dates.ts#L4
export const getMondayFromDate = (date: Date): number => {
    const day = date.getDay() || 7; // Sunday is 0, so set it to 7
    const time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - (day - 1));
    return time / 86400000;
};

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
        const countForTag = articleLog.tags ? articleLog.tags[tagId] : 0;
        return accumulator + countForTag;
    }, 0);
};

export const getArticleViewCounts = (
    history: WeeklyArticleHistory = [],
    weeks = 52,
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

export const historyWithinArticlesViewedSettingsByTag = (
    articlesViewedSettings?: ArticlesViewedByTagSettings,
    history: WeeklyArticleHistory = [],
    now: Date = new Date(),
): boolean => {
    if (!articlesViewedSettings) {
        return true;
    }

    // At least one of the tags must match
    return Object.entries(articlesViewedSettings).some(([tagId, settings]) => {
        const { minViews, maxViews, periodInWeeks } = settings;
        const count = getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks, now);
        const minViewsOk = minViews ? count >= minViews : true;
        const maxViewsOk = maxViews ? count <= maxViews : true;

        return minViewsOk && maxViewsOk;
    });
};
