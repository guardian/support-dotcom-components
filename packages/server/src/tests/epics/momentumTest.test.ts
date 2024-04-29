import { EpicTargeting, EpicTest } from '@sdc/shared/dist/types';
import {
    getCategoriesForThreeMonths,
    getThreeMonthsHistory,
    isIncreasedEngagement,
    momentumMatches,
} from './momentumTest';

const testDefault: EpicTest = {
    name: '2024-04-29_MOMENTUM_EPIC',
    priority: 1,
    status: 'Live',
    locations: [],
    tagIds: [],
    sections: ['environment'],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    hasCountryName: false,
    variants: [],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    hasArticleCountInCopy: true,
};

const targetingDefault: EpicTargeting = {
    contentType: 'Article',
    sectionId: 'environment',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
    showSupportMessaging: true,
    isRecurringContributor: false,
    lastOneOffContributionDate: undefined,
    mvtId: 2,
    hasOptedOutOfArticleCount: false,
};

const weeklyArticleHistory = [
    { week: 19828, count: 24 },
    { week: 19821, count: 22 },
    { week: 19814, count: 20 },
    { week: 19807, count: 18 },
    { week: 19800, count: 6 },
    { week: 19793, count: 14 },
    { week: 19786, count: 12 },
    { week: 19779, count: 3 },
    { week: 19772, count: 0 },
    { week: 19765, count: 6 },
    { week: 19758, count: 4 },
    { week: 19751, count: 0 },
    { week: 19744, count: 0 },
];

const weeklyArticleHistoryIdentical = [
    { week: 19828, count: 2 },
    { week: 19821, count: 2 },
    { week: 19814, count: 2 },
    { week: 19807, count: 2 },
    { week: 19800, count: 2 },
    { week: 19793, count: 2 },
    { week: 19786, count: 2 },
    { week: 19779, count: 2 },
    { week: 19772, count: 2 },
    { week: 19765, count: 2 },
    { week: 19758, count: 2 },
    { week: 19751, count: 2 },
    { week: 19744, count: 2 },
];

describe('momentumMatches', () => {
    it('should return true for any tests other than momentum test', () => {
        const test = { ...testDefault, name: 'test' };
        const result = momentumMatches.test(test, targetingDefault);
        expect(result).toBe(true);
    });

    it('should return false when no article history', () => {
        const targeting = { ...targetingDefault, weeklyArticleHistory: [] };
        const result = momentumMatches.test(testDefault, targeting);
        expect(result).toBe(false);
    });
});

describe('isIncreasedEngagement', () => {
    const today = new Date('2024-04-23');

    it('should return true for increasing article count', () => {
        const result = isIncreasedEngagement(weeklyArticleHistory, today);
        expect(result).toBe(true);
    });

    it('should return true for increasing article count and missing weeks', () => {
        // a missing week is equivalent to a zero count week
        const weeklyArticleHistoryMissing = weeklyArticleHistory.filter((w) => w.week !== 19772);
        const result = isIncreasedEngagement(weeklyArticleHistoryMissing, today);
        expect(result).toBe(true);
    });

    it('should return false for article count the same for the months', () => {
        const result = isIncreasedEngagement(weeklyArticleHistoryIdentical, today);
        expect(result).toBe(false);
    });

    it('should return false for article count the same for two months, then increased in the third', () => {
        const weeklyArticleHistory = [...weeklyArticleHistoryIdentical, { week: 19828, count: 50 }];
        const result = isIncreasedEngagement(weeklyArticleHistory, today);
        expect(result).toBe(false);
    });
});

describe('getThreeMonthsHistory', () => {
    const weeklyArticleHistory = [
        { week: 19835, count: 2 },
        { week: 19828, count: 24 },
        { week: 19821, count: 22 },
        { week: 19814, count: 20 },
        { week: 19807, count: 18 },

        { week: 19800, count: 6 },
        { week: 19793, count: 14 },
        { week: 19786, count: 12 },
        { week: 19779, count: 3 },

        { week: 19772, count: 0 },
        { week: 19765, count: 6 },
        { week: 19758, count: 4 },
        { week: 19751, count: 0 },
        { week: 19744, count: 0 },
    ];

    it('gets correct Most Recent Month', () => {
        const { mostRecentMonthHistory: result } = getThreeMonthsHistory(
            weeklyArticleHistory,
            new Date('2024-04-22'),
        );
        expect(result.length).toBe(5);
        expect(result[0].week).toBe(19835);
        expect(result[4].week).toBe(19807);
    });

    it('gets correct Second Most Recent Month, today is a Monday', () => {
        const { secondMostRecentMonthHistory: result } = getThreeMonthsHistory(
            weeklyArticleHistory,
            new Date('2024-04-22'),
        );
        expect(result.length).toBe(4);
        expect(result[0].week).toBe(19800);
        expect(result[3].week).toBe(19779);
    });

    it('gets correct Third Most Recent Month, today is a Monday', () => {
        const { thirdMostRecentMonthHistory: result } = getThreeMonthsHistory(
            weeklyArticleHistory,
            new Date('2024-04-22'),
        );
        expect(result.length).toBe(4);
        expect(result[0].week).toBe(19772);
        expect(result[3].week).toBe(19751);
    });

    it('gets correct Second Most Recent Month, today is a Tuesday', () => {
        const { secondMostRecentMonthHistory: result } = getThreeMonthsHistory(
            weeklyArticleHistory,
            new Date('2024-04-23'),
        );
        expect(result.length).toBe(4);
        expect(result[0].week).toBe(19800);
        expect(result[3].week).toBe(19779);
    });

    it('gets correct Third Most Recent Month, today is a Tuesday', () => {
        const { thirdMostRecentMonthHistory: result } = getThreeMonthsHistory(
            weeklyArticleHistory,
            new Date('2024-04-23'),
        );
        expect(result.length).toBe(4);
        expect(result[0].week).toBe(19772);
        expect(result[3].week).toBe(19751);
    });
});

describe('getCategoriesForThreeMonths', () => {
    const weeklyArticleHistory = [
        { week: 19835, count: 2 },
        { week: 19828, count: 24 },
        { week: 19821, count: 22 },
        { week: 19814, count: 20 },
        { week: 19807, count: 18 },

        { week: 19800, count: 6 },
        { week: 19793, count: 14 },
        { week: 19786, count: 12 },
        { week: 19779, count: 3 },

        { week: 19772, count: 0 },
        { week: 19765, count: 6 },
        { week: 19758, count: 4 },
        { week: 19751, count: 0 },
        { week: 19744, count: 0 },
    ];

    it('gets correct categories for each month', () => {
        const result = getCategoriesForThreeMonths(weeklyArticleHistory, new Date('2024-04-23'));
        expect(result.categoryForFirstMonth).toBe(1);
        expect(result.categoryForSecondMonth).toBe(4);
        expect(result.categoryForThirdMonth).toBe(6);
    });
});
