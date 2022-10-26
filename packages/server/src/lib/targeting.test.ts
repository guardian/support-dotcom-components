import { factories } from '../factories';
import {
    audienceMatches,
    shouldNotRenderEpic,
    shouldThrottle,
    supporterStatusMatches,
} from './targeting';
import { SupporterStatusRules } from '@sdc/shared/dist/types';

describe('shouldNotRenderEpic', () => {
    it('returns true for blacklisted section', () => {
        const data = factories.targeting.build({ sectionId: 'careers' });
        const got = shouldNotRenderEpic(data);
        expect(got).toBe(true);
    });

    it('returns false for valid data', () => {
        const data = factories.targeting.build();
        const got = shouldNotRenderEpic(data);
        expect(got).toBe(false);
    });
});

describe('audienceMatches', () => {
    it('returns true for non-supporter if test is for AllNonSupporters', () => {
        const got = audienceMatches(true, 'AllNonSupporters');
        expect(got).toBe(true);
    });
    it('returns false for non-supporter if test is for AllExistingSupporters', () => {
        const got = audienceMatches(true, 'AllExistingSupporters');
        expect(got).toBe(false);
    });

    it('returns false for supporter if test is for AllNonSupporters', () => {
        const got = audienceMatches(false, 'AllNonSupporters');
        expect(got).toBe(false);
    });
    it('returns true for supporter if test is for AllExistingSupporters', () => {
        const got = audienceMatches(false, 'AllExistingSupporters');
        expect(got).toBe(true);
    });

    it('returns false for recent contributor if test is for AllExistingSupporters', () => {
        const got = audienceMatches(
            false,
            'AllExistingSupporters',
            new Date('2022-01-01'),
            new Date('2022-01-02'),
        );
        expect(got).toBe(false);
    });
    it('returns false for recent contributor if test is for AllNonSupporters', () => {
        const got = audienceMatches(
            false,
            'AllNonSupporters',
            new Date('2022-01-01'),
            new Date('2022-01-02'),
        );
        expect(got).toBe(false);
    });

    it('returns true for old contributor if test is for AllNonSupporters', () => {
        const got = audienceMatches(
            true,
            'AllNonSupporters',
            new Date('2021-01-01'),
            new Date('2022-01-02'),
        );
        expect(got).toBe(true);
    });
    it('returns false for old contributor if test is for AllExistingSupporters', () => {
        const got = audienceMatches(
            true,
            'AllExistingSupporters',
            new Date('2021-01-01'),
            new Date('2022-01-02'),
        );
        expect(got).toBe(false);
    });
});

describe('supporterStatusMatches', () => {
    const date = new Date('2022-01-02');

    describe('Not recurring supporter and no recent single contribution', () => {
        const nonSupporterTargeting: SupporterStatusRules = {
            include: [],
            exclude: ['RecurringSupporter', 'RecentSingleContributor'],
            recentSingleContributorCutOffInDays: 50,
        };

        it('returns true for "Not recurring supporter and no recent contribution" if not a supporter', () => {
            const result = supporterStatusMatches(nonSupporterTargeting, false, undefined, date);
            expect(result).toBe(true);
        });
        it('returns true for "Not recurring supporter and no recent contribution" if old contribution', () => {
            const result = supporterStatusMatches(
                nonSupporterTargeting,
                false,
                new Date('2021-01-01'),
                date,
            );
            expect(result).toBe(true);
        });
        it('returns false for "Not recurring supporter and no recent contribution" if isRecurringSupporter', () => {
            const result = supporterStatusMatches(nonSupporterTargeting, true, undefined, date);
            expect(result).toBe(false);
        });
        it('returns false for "Not recurring supporter and no recent contribution" if recent contribution', () => {
            const result = supporterStatusMatches(
                nonSupporterTargeting,
                false,
                new Date('2022-01-01'),
                date,
            );
            expect(result).toBe(false);
        });
    });

    describe('Recurring supporter without a recent single contribution', () => {
        const recurringSupporterTargeting: SupporterStatusRules = {
            include: ['RecurringSupporter'],
            exclude: ['RecentSingleContributor'],
            recentSingleContributorCutOffInDays: 50,
        };

        it('returns true for "Recurring supporter without a recent single contribution" if isRecurringSupporter', () => {
            const result = supporterStatusMatches(
                recurringSupporterTargeting,
                true,
                undefined,
                date,
            );
            expect(result).toBe(true);
        });
        it('returns true for "Recurring supporter without a recent single contribution" if isRecurringSupporter and has old contribution', () => {
            const result = supporterStatusMatches(
                recurringSupporterTargeting,
                true,
                new Date('2021-01-01'),
                date,
            );
            expect(result).toBe(true);
        });
        it('returns false for "Recurring supporter without a recent single contribution" if !isRecurringSupporter', () => {
            const result = supporterStatusMatches(
                recurringSupporterTargeting,
                false,
                undefined,
                date,
            );
            expect(result).toBe(false);
        });
        it('returns false for "Recurring supporter without a recent single contribution" if isRecurringSupporter but has recent contribution', () => {
            const result = supporterStatusMatches(
                recurringSupporterTargeting,
                true,
                new Date('2022-01-01'),
                date,
            );
            expect(result).toBe(false);
        });
    });

    describe('Recurring supporter and/or recent single contributor', () => {
        const supporterTargeting: SupporterStatusRules = {
            include: ['RecurringSupporter', 'RecentSingleContributor'],
            exclude: [],
            recentSingleContributorCutOffInDays: 50,
        };

        it('returns true for "Recurring supporter and/or recent single contributor" if isRecurringSupporter', () => {
            const result = supporterStatusMatches(supporterTargeting, true, undefined, date);
            expect(result).toBe(true);
        });
        it('returns true for "Recurring supporter and/or recent single contributor" if has recent contribution', () => {
            const result = supporterStatusMatches(
                supporterTargeting,
                false,
                new Date('2022-01-01'),
                date,
            );
            expect(result).toBe(true);
        });
        it('returns false for "Recurring supporter and/or recent single contributor" if has old contribution', () => {
            const result = supporterStatusMatches(
                supporterTargeting,
                false,
                new Date('2021-01-01'),
                date,
            );
            expect(result).toBe(false);
        });
    });
});

describe('shouldThrottle', () => {
    it('returns true if epic was viewed just now', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 2,
        };
        const viewLog = [{ date: new Date('2019-06-12T10:23:59').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns true if epic was viewed yesterday', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 2,
        };
        const viewLog = [{ date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns true if epic was viewed nearly 2 days ago', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 2,
        };
        const viewLog = [{ date: new Date('2019-06-10T10:24:01').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(true);
    });

    it('returns false if epic was viewed 2 days ago', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 2,
        };
        const viewLog = [{ date: new Date('2019-06-10T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(false);
    });

    it('returns false if epic was viewed longer than 2 days ago', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 2,
        };
        const viewLog = [{ date: new Date('2019-06-01T10:24:00').valueOf(), testId: 'A' }];
        const now = new Date('2019-06-12T10:24:00');
        const got = shouldThrottle(viewLog, config, undefined, now);
        expect(got).toBe(false);
    });

    it('returns true if epic was viewed just above the max number of times', () => {
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 5,
        };
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
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 5,
        };
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
        const config = {
            maxViewsDays: 90,
            maxViewsCount: 4,
            minDaysBetweenViews: 5,
        };
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
