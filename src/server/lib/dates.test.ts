import { daysSince } from './dates';

describe('daysSince', () => {
    const now = new Date('2020-02-18T10:30:00');
    it('should count the days properly', () => {
        const then = new Date('2020-02-14T13:30:00');
        expect(daysSince(then, now)).toBe(3);
    });
});
