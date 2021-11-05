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

// If articlesViewedByTagSettings is set then use this for the `forTargetedWeeks` count
export const getArticleViewCounts = (
    history: WeeklyArticleHistory = [],
    articlesViewedByTagSettings?: ArticlesViewedByTagSettings,
    weeks = 52,
): ArticleCounts => {
    const for52Weeks = getArticleViewCountForWeeks(history, 52);

    const getCountForTargetingWeeks = (): number => {
        if (articlesViewedByTagSettings) {
            // Sum the counts for each tag
            articlesViewedByTagSettings.tagIds.reduce((sum, tagId) => {
                const countForTag = getArticleViewCountByTagForWeeks(
                    tagId,
                    history,
                    articlesViewedByTagSettings.periodInWeeks,
                );
                return sum + countForTag;
            }, 0);
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

    const { minViews, periodInWeeks } = articlesViewedSettings;
    // At least one of the tags must match
    return articlesViewedSettings.tagIds.some(tagId => {
        const count = getArticleViewCountByTagForWeeks(tagId, history, periodInWeeks, now);
        return count >= minViews;
    });
};
