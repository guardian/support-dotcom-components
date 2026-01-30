import { getMondayFromDate } from './history';

const oneDay = 86400000;

describe('getMondayFromDate', () => {
    it('should return Monday midnight if today is Monday', () => {
        const mondayMidnight = new Date('2020-03-02T00:00:00Z');
        const mondayEvening = new Date('2020-03-02T19:25:00Z');

        const got = getMondayFromDate(mondayEvening);
        expect(got).toBe(mondayMidnight.getTime() / oneDay);
    });

    it('should return Monday midnight if today is some other day', () => {
        const mondayMidnight = new Date('2020-03-02T00:00:00Z');
        const fridayAfternoon = new Date('2020-03-06T16:35:00Z');

        const got = getMondayFromDate(fridayAfternoon);
        expect(got).toBe(mondayMidnight.getTime() / oneDay);
    });
});
