import { daysSince, isRecentOneOffContributor } from './dates';

describe('daysSince', () => {
    const now = new Date('2020-02-18T10:30:00');
    it('should count the days properly', () => {
        const then = new Date('2020-02-14T13:30:00');
        expect(daysSince(then, now)).toBe(3);
    });
});

describe('isRecentOneOffContributor', () => {
    const now = new Date('2020-02-12T10:24:00');

    it('returns true for recent date', () => {
        const got = isRecentOneOffContributor(new Date('2020-02-10T10:24:00'), now);
        expect(got).toBe(true);
    });

    it('returns false for older date', () => {
        const got = isRecentOneOffContributor(new Date('2019-02-10T10:24:00'), now);
        expect(got).toBe(false);
    });

    it('returns false for someone that has never contributed', () => {
        const got = isRecentOneOffContributor(undefined, now);
        expect(got).toBe(false);
    });
});
