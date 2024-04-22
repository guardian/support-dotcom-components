import { EpicTargeting, EpicTest } from '@sdc/shared/dist/types';
import { momentumMatches } from './momentumTest';

const testDefault: EpicTest = {
    name: 'momentumEpic',
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
    beforeAll(() => {
        jest.spyOn(global.Date, 'UTC').mockImplementation(() => Date.parse('2024-04-19'));
    });

    afterAll(() => {
        jest.spyOn(global.Date, 'UTC').mockRestore();
    });

    it('should return true for momentum tests and increasing article count', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: weeklyArticleHistory,
        };
        const result = momentumMatches.test(testDefault, targeting);
        expect(result).toBe(true);
    });

    it('should return false for momentum tests and article count is same for all the months', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: weeklyArticleHistoryIdentical,
        };

        const result = momentumMatches.test(testDefault, targeting);
        expect(result).toBe(false);
    });

    it('should return true for any tests other than momentum test', () => {
        const test = { ...testDefault, name: 'test' };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: weeklyArticleHistoryIdentical,
        };

        const result = momentumMatches.test(test, targeting);
        expect(result).toBe(true);
    });

    it('should return false if the article history count is less than 12 weeks ', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: weeklyArticleHistory.slice(0, 4),
        };

        const result = momentumMatches.test(testDefault, targeting);
        expect(result).toBe(false);
    });
});
