import type { Targeting } from './channelExclusionsMatcher';
import { inExclusions } from './channelExclusionsMatcher';

const baseTargeting: Targeting = {};

describe('inExclusions', () => {
    it('returns false when no rules are provided', () => {
        expect(inExclusions(baseTargeting, undefined)).toBe(false);
        expect(inExclusions(baseTargeting, { rules: [] })).toBe(false);
    });

    it('matches section ids case-insensitively', () => {
        const targeting: Targeting = {
            sectionId: 'Sport',
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'section-rule', sectionIds: ['sport'] }],
            }),
        ).toBe(true);
    });

    it('matches tag ids case-insensitively', () => {
        const targeting: Targeting = {
            tagIds: ['tone/news'],
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'tag-rule', tagIds: ['TONE/NEWS'] }],
            }),
        ).toBe(true);
    });

    it('applies date range checks', () => {
        expect(
            inExclusions(baseTargeting, {
                rules: [
                    {
                        name: 'active-range',
                        dateRange: { start: '1900-01-01', end: '2999-12-31' },
                    },
                ],
            }),
        ).toBe(true);

        expect(
            inExclusions(baseTargeting, {
                rules: [
                    {
                        name: 'inactive-range',
                        dateRange: { start: '1900-01-01', end: '1900-01-02' },
                    },
                ],
            }),
        ).toBe(false);
    });

    it('uses contentType to evaluate content type', () => {
        const frontTargeting: Targeting = {
            contentType: 'Network Front',
        };
        const articleTargeting: Targeting = {
            contentType: 'Article',
        };

        expect(
            inExclusions(frontTargeting, {
                rules: [{ name: 'front-only', contentTypes: ['Fronts'] }],
            }),
        ).toBe(true);
        expect(
            inExclusions(articleTargeting, {
                rules: [{ name: 'front-only', contentTypes: ['Fronts'] }],
            }),
        ).toBe(false);

        expect(
            inExclusions(frontTargeting, {
                rules: [{ name: 'any-content-empty', contentTypes: [] }],
            }),
        ).toBe(true);
        expect(
            inExclusions(articleTargeting, {
                rules: [{ name: 'any-content-empty', contentTypes: [] }],
            }),
        ).toBe(true);

        expect(
            inExclusions(frontTargeting, {
                rules: [{ name: 'both-content-types', contentTypes: ['Fronts', 'Articles'] }],
            }),
        ).toBe(true);
        expect(
            inExclusions(articleTargeting, {
                rules: [{ name: 'both-content-types', contentTypes: ['Fronts', 'Articles'] }],
            }),
        ).toBe(true);
    });

    it('matches tag ids case-insensitively (politics)', () => {
        const targeting: Targeting = {
            tagIds: ['politics/politics'],
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'epic-tag-rule', tagIds: ['POLITICS/POLITICS'] }],
            }),
        ).toBe(true);
    });
});
