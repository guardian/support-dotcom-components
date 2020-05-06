import { shouldNotRenderEpic, shouldThrottle } from './targeting';
import { factories } from '../factories';

describe('shouldNotRenderEpic', () => {
    it('returns true for non-article', () => {
        const data = factories.targeting.build({ contentType: 'Liveblog' });
        const got = shouldNotRenderEpic(data);
        expect(got).toBe(true);
    });

    it('returns true for blacklisted section', () => {
        const data = factories.targeting.build({ sectionName: 'careers' });
        const got = shouldNotRenderEpic(data);
        expect(got).toBe(true);
    });

    it('returns false for valid data', () => {
        const data = factories.targeting.build();
        const got = shouldNotRenderEpic(data);
        expect(got).toBe(false);
    });
});

describe('shouldThrottle', () => {
    it('returns true if epic was viewed just now', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 2 };
        const viewLog = [{ date: new Date('2019-06-12T10:23:59').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns true if epic was viewed yesterday', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 2 };
        const viewLog = [{ date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns true if epic was viewed nearly 2 days ago', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 2 };
        const viewLog = [{ date: new Date('2019-06-10T10:24:01').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns false if epic was viewed 2 days ago', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 2 };
        const viewLog = [{ date: new Date('2019-06-10T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(false);
    });

    it('returns false if epic was viewed longer than 2 days ago', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 2 };
        const viewLog = [{ date: new Date('2019-06-01T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(false);
    });

    it('returns true if epic was viewed just above the max number of times', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 5 };
        const now = new Date('2019-07-09T10:24:00');
        const viewLog = [
            { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-12T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-06-13T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-14T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-15T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-16T10:24:00').valueOf(), testId: 'A' },
        ];
        const got = shouldThrottle(viewLog, config, 'A', now);
        expect(got).toBe(true);
    });

    it('returns true if epic has reached the max number of views', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 5 };
        const now = new Date('2019-07-09T10:24:00');
        const viewLog = [
            { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-12T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-06-13T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-14T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-06-15T10:24:00').valueOf(), testId: 'A' },
        ];
        const got = shouldThrottle(viewLog, config, 'A', now);
        expect(got).toBe(true);
    });

    it('returns false if epic was viewed too many times even though test was not', () => {
        const config = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 5 };
        const viewLog = [
            { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-07-11T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-07-15T10:24:00').valueOf(), testId: 'A' },
            { date: new Date('2019-07-15T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-08-11T10:24:00').valueOf(), testId: 'A' },
        ];

        const now = new Date('2019-09-01T10:24:00');
        const got = shouldThrottle(viewLog, config, 'A', now);
        expect(got).toBe(false);
    });
});
