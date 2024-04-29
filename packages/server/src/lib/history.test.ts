import { getArticleViewCountForWeeks, getWeeksInWindow } from './history';

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
