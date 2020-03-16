import { getMondayFromDate, getArticleViewCountForWeeks } from './history';

const oneDay = 86400000;

describe('getMondayFromDate', () => {
    it('should return Monday midnight if today is Monday', () => {
        const mondayMidnight = new Date('2020-03-02T00:00:00');
        const mondayEvening = new Date('2020-03-02T19:25:00');

        const got = getMondayFromDate(mondayEvening);
        expect(got).toBe(mondayMidnight.getTime() / oneDay);
    });

    it('should return Monday midnight if today is some other day', () => {
        const mondayMidnight = new Date('2020-03-02T00:00:00');
        const fridayAfternoon = new Date('2020-03-06T16:35:00');

        const got = getMondayFromDate(fridayAfternoon);
        expect(got).toBe(mondayMidnight.getTime() / oneDay);
    });
});

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
