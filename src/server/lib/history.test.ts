import type { ArticlesViewedSettings } from '../../shared/types';
import {
    getArticleViewCountByMultipleTagForWeeks,
    getArticleViewCountForWeeks,
    getArticleViewCounts,
    getWeeksInWindow,
    historyWithinArticlesViewedSettings,
} from './history';

describe('getArticleViewCountForWeeks', () => {
    // Pass the current date into the tested function so the checks can be made
    // against a fixed date.
    const rightNow = new Date('2020-03-16T09:30:00');

    it('should count views for one week properly', () => {
        const history = [{ week: 18330, count: 45 }];
        const numWeeks = 1;
        const got = getArticleViewCountForWeeks(history, numWeeks, rightNow);
        expect(got).toBe(45);
    });

    it('should count views for several weeks properly', () => {
        const history = [
            { week: 18330, count: 15 },
            { week: 18323, count: 5 },
            { week: 18316, count: 5 },
        ];
        const numWeeks = 3;
        const got = getArticleViewCountForWeeks(history, numWeeks, rightNow);
        expect(got).toBe(25);
    });

    it('should not count views for all weeks in the history object', () => {
        const history = [
            { week: 18330, count: 15 },
            { week: 18323, count: 5 },
            { week: 18316, count: 5 },
            { week: 18309, count: 5 }, // not be be included as we only want 3 weeks
        ];
        const numWeeks = 3;
        const got = getArticleViewCountForWeeks(history, numWeeks, rightNow);
        expect(got).toBe(25);
    });
});

describe('getWeeksInWindow', () => {
    // day 19835 = 2024-04-22
    // calculate -> Date.UTC(2024, 3, 22) / 86400000;
    it('includes the current week', () => {
        const articleHistory = [
            { week: 19835, count: 2 },
            { week: 19828, count: 25 },
            { week: 19821, count: 20 },
            { week: 19814, count: 20 },
            { week: 19807, count: 20 },
            { week: 19800, count: 20 },
        ];

        const result = getWeeksInWindow(articleHistory, 4, new Date('2024-04-23'));
        expect(result.length).toBe(5);
        expect(result[0].week).toBe(19835);
    });

    it('includes correct window when end date is in the past', () => {
        const articleHistory = [
            { week: 19835, count: 2 },
            { week: 19828, count: 25 },
            { week: 19821, count: 20 },
            { week: 19814, count: 20 },
            { week: 19807, count: 20 },
            { week: 19800, count: 20 },
        ];

        const result = getWeeksInWindow(articleHistory, 4, new Date('2024-04-16'));
        expect(result.length).toBe(5);
        expect(result[0].week).toBe(19828);
    });
});

describe(' getArticleViewCountByMultipleTagForWeeks ', () => {
    const rightNow = new Date('2020-03-16T09:30:00');

    it('should count views for one week properly with multiple tags', () => {
        const numWeeks = 1;
        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];
        const got = getArticleViewCountForWeeks(
            articleHistoryWithOneWeekMultipleTags,
            numWeeks,
            rightNow,
        );

        const acTag = getArticleViewCountByMultipleTagForWeeks(
            ['science/science'],
            articleHistoryWithOneWeekMultipleTags,
            numWeeks,
            rightNow,
        );
        const acMultipleTag = getArticleViewCountByMultipleTagForWeeks(
            ['science/science', 'environment/environment', 'business/business'],
            articleHistoryWithOneWeekMultipleTags,
            numWeeks,
            rightNow,
        );
        expect(got).toBe(53);
        expect(acTag).toBe(1);
        expect(acMultipleTag).toBe(19);
    });
});

describe(' getArticleViewCounts ', () => {
    const rightNow = new Date('2020-03-16T09:30:00');

    it('should count views for one week properly with multiple tags', () => {
        const numWeeks = 52;
        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];
        const tagIds = ['science/science', 'environment/environment'];

        const got = getArticleViewCounts(
            articleHistoryWithOneWeekMultipleTags,
            numWeeks,
            tagIds,
            rightNow,
        );

        expect(got.for52Weeks).toBe(53);
        expect(got.forTargetedWeeks).toBe(16);
    });

    it('should count views for one week properly without tags ', () => {
        const numWeeks = 52;
        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];
        const tagIds: string[] = [];

        const got = getArticleViewCounts(
            articleHistoryWithOneWeekMultipleTags,
            numWeeks,
            tagIds,
            rightNow,
        );

        expect(got.for52Weeks).toBe(53);
        expect(got.forTargetedWeeks).toBe(53);
    });
});

describe(' historyWithinArticlesViewedSettings ', () => {
    const rightNow = new Date('2020-03-16T09:30:00');

    it('should return the check for count to be  between minViews and maxViews', () => {
        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];

        const articlesViewedSettings: ArticlesViewedSettings = {
            minViews: 5,
            maxViews: 100,
            periodInWeeks: 52,
            tagIds: ['science/science', 'environment/environment'],
        };

        const got = historyWithinArticlesViewedSettings(
            articlesViewedSettings,
            articleHistoryWithOneWeekMultipleTags,
            rightNow,
        );

        expect(got).toBe(true);
    });

    it('should count views for one week properly for a number of tags ', () => {
        const rightNow = new Date('2020-03-16T09:30:00');

        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];

        const articlesViewedSettings: ArticlesViewedSettings = {
            minViews: 5,
            maxViews: 100,
            periodInWeeks: 52,
            tagIds: ['science/science', 'environment/environment'],
        };

        const viewCountForWeeks =
            articlesViewedSettings.tagIds?.length === 0
                ? getArticleViewCountForWeeks(
                      articleHistoryWithOneWeekMultipleTags,
                      articlesViewedSettings.periodInWeeks,
                      rightNow,
                  )
                : getArticleViewCountByMultipleTagForWeeks(
                      articlesViewedSettings.tagIds,
                      articleHistoryWithOneWeekMultipleTags,
                      articlesViewedSettings.periodInWeeks,
                      rightNow,
                  );

        expect(viewCountForWeeks).toBe(16);
    });

    it('should count views for one week properly for no tags ', () => {
        const rightNow = new Date('2020-03-16T09:30:00');

        const articleHistoryWithOneWeekMultipleTags = [
            {
                week: 18330,
                count: 53,
                tags: {
                    'environment/environment': 15,
                    'environment/climate-crisis': 6,
                    'world/world': 5,
                    'business/business': 3,
                    'us-news/us-politics': 1,
                    'technology/technology': 1,
                    'science/science': 1,
                    'politics/politics': 3,
                    'books/books': 1,
                    'culture/culture': 1,
                },
            },
        ];

        const articlesViewedSettings: ArticlesViewedSettings = {
            minViews: 5,
            maxViews: 100,
            periodInWeeks: 52,
            tagIds: [],
        };

        const viewCountForWeeks =
            articlesViewedSettings.tagIds?.length === 0
                ? getArticleViewCountForWeeks(
                      articleHistoryWithOneWeekMultipleTags,
                      articlesViewedSettings.periodInWeeks,
                      rightNow,
                  )
                : getArticleViewCountByMultipleTagForWeeks(
                      articlesViewedSettings.tagIds,
                      articleHistoryWithOneWeekMultipleTags,
                      articlesViewedSettings.periodInWeeks,
                      rightNow,
                  );

        expect(viewCountForWeeks).toBe(53);
    });
});
