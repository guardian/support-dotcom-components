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

    it('matches front ids against pageId case-insensitively', () => {
        const targeting: Targeting = {
            pageId: 'uk',
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'front-rule', frontIds: ['UK'] }],
            }),
        ).toBe(true);
    });

    it('does not match front ids when pageId is absent', () => {
        expect(
            inExclusions(baseTargeting, {
                rules: [{ name: 'front-rule', frontIds: ['uk'] }],
            }),
        ).toBe(false);
    });

    it('matches rule with only frontIds (no sections or tags)', () => {
        const targeting: Targeting = {
            pageId: 'us',
            contentType: 'Network Front',
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'front-only-rule', frontIds: ['us'] }],
            }),
        ).toBe(true);
    });

    it('matches frontIds OR sectionIds (either suffices)', () => {
        const frontTargeting: Targeting = {
            pageId: 'au',
            contentType: 'Network Front',
        };
        const sectionTargeting: Targeting = {
            sectionId: 'sport',
            contentType: 'Article',
        };

        const rules = {
            rules: [{ name: 'front-or-section', frontIds: ['au'], sectionIds: ['sport'] }],
        };

        expect(inExclusions(frontTargeting, rules)).toBe(true);
        expect(inExclusions(sectionTargeting, rules)).toBe(true);
    });

    it('treats Tag contentType as Fronts', () => {
        const tagPageTargeting: Targeting = {
            contentType: 'Tag',
        };

        expect(
            inExclusions(tagPageTargeting, {
                rules: [{ name: 'fronts-only', contentTypes: ['Fronts'] }],
            }),
        ).toBe(true);

        expect(
            inExclusions(tagPageTargeting, {
                rules: [{ name: 'articles-only', contentTypes: ['Articles'] }],
            }),
        ).toBe(false);
    });
});
