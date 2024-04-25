import { factories } from '../factories';
import {
    audienceMatches,
    consentStatusMatches,
    pageContextMatches,
    shouldNotRenderEpic,
    shouldThrottle,
} from './targeting';

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

describe('pageContextMatches', () => {
    const pageContext = {
        tagIds: ['politics/politics'],
        sectionId: 'politics',
    };
    const pageContextTargeting = {
        tagIds: [],
        sectionIds: [],
        excludedTagIds: [],
        excludedSectionIds: [],
    };

    it('returns true if no context targeting', () => {
        const result = pageContextMatches(pageContext, pageContextTargeting);
        expect(result).toBe(true);
    });

    // Required tags
    it('returns true if page has required tag', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            tagIds: ['politics/politics'],
        });
        expect(result).toBe(true);
    });
    it('returns false if page does not have required tag', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            tagIds: ['environment/environment'],
        });
        expect(result).toBe(false);
    });

    // Required sections
    it('returns true if page has required section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            sectionIds: ['politics'],
        });
        expect(result).toBe(true);
    });
    it('returns false if page does not have required section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            sectionIds: ['environment'],
        });
        expect(result).toBe(false);
    });

    // Required tags *and* sections
    it('returns true if page has required tag or required section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            tagIds: ['politics/politics'],
            sectionIds: ['environment'],
        });
        expect(result).toBe(true);
    });
    it('returns false if page does not have required tag or required section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            tagIds: ['environment/environment'],
            sectionIds: ['environment'],
        });
        expect(result).toBe(false);
    });

    // Excluded tags
    it('returns false if page has excluded tag', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            excludedTagIds: ['politics/politics'],
        });
        expect(result).toBe(false);
    });
    it('returns true if page does not have excluded tag', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            excludedTagIds: ['environment/environment'],
        });
        expect(result).toBe(true);
    });
    it('returns false if page has required tag but also excluded tag', () => {
        const result = pageContextMatches(
            { ...pageContext, tagIds: ['politics/politics', 'environment/environment'] },
            {
                ...pageContextTargeting,
                tagIds: ['politics/politics'],
                excludedTagIds: ['environment/environment'],
            },
        );
        expect(result).toBe(false);
    });

    // Excluded sections
    it('returns false if page has excluded section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            excludedSectionIds: ['politics'],
        });
        expect(result).toBe(false);
    });
    it('returns true if page does not have excluded section', () => {
        const result = pageContextMatches(pageContext, {
            ...pageContextTargeting,
            excludedSectionIds: ['environment'],
        });
        expect(result).toBe(true);
    });
});

describe('consentStatusMatches', () => {
    it('checks user consent when a test targets HasConsented', () => {
        expect(consentStatusMatches(true, 'HasConsented')).toBe(true);
        expect(consentStatusMatches(false, 'HasConsented')).toBe(false);
    });

    it('checks user consent when a test targets HasNotConsented', () => {
        expect(consentStatusMatches(true, 'HasNotConsented')).toBe(false);
        expect(consentStatusMatches(false, 'HasNotConsented')).toBe(true);
    });

    it('checks user consent when a test targets All', () => {
        expect(consentStatusMatches(true, 'All')).toBe(true);
        expect(consentStatusMatches(false, 'All')).toBe(true);
    });

    it('checks user consent when a test does not target by consent status', () => {
        expect(consentStatusMatches(true, undefined)).toBe(true);
        expect(consentStatusMatches(false, undefined)).toBe(true);
    });
});
