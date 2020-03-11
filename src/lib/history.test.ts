import { getMondayFromDate, getArticleViewCountForWeeks } from './history';

const oneDay = 86400000;

describe('getMondayFromDate', () => {
    it('should return Monday midnight if today is Monday', () => {
        const mondayMorning = new Date('2020-03-02T09:15:30');
        const mondayMidnight = Math.floor(mondayMorning.getTime() / oneDay);

        const mondayEvening = new Date('2020-03-02T19:25:00');
        const got = getMondayFromDate(mondayEvening);
        expect(got).toBe(mondayMidnight);
    });

    it('should return Monday midnight if today is some other day', () => {
        const mondayMorning = new Date('2020-03-02T09:15:30');
        const mondayMidnight = Math.floor(mondayMorning.getTime() / oneDay);

        const fridayAfternoon = new Date('2020-03-06T16:35:00');
        const got = getMondayFromDate(fridayAfternoon);
        expect(got).toBe(mondayMidnight);
    });
});

describe('getArticleViewCountForWeeks', () => {
    it('should count views for one week properly', () => {
        const history = [{ week: 18330, count: 45 }];
        const numWeeks = 1;
        const got = getArticleViewCountForWeeks(history, numWeeks);
        expect(got).toBe(45);
    });

    it('should count views for several weeks properly', () => {
        const history = [
            { week: 18330, count: 15 },
            { week: 18323, count: 5 },
            { week: 18316, count: 5 },
        ];
        const numWeeks = 3;
        const got = getArticleViewCountForWeeks(history, numWeeks);
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
        const got = getArticleViewCountForWeeks(history, numWeeks);
        expect(got).toBe(25);
    });
});
