import type { BannerTargeting, EpicTargeting } from '../../shared/types';
import { inExclusions } from './channelExclusionsMatcher';

const baseBannerTargeting: BannerTargeting = {
    showSupportMessaging: true,
    mvtId: 1,
    countryCode: 'GB',
    hasOptedOutOfArticleCount: false,
    isSignedIn: false,
    hasConsented: true,
};

describe('inExclusions', () => {
    it('returns false when no rules are provided', () => {
        expect(inExclusions(baseBannerTargeting, undefined)).toBe(false);
        expect(inExclusions(baseBannerTargeting, { rules: [] })).toBe(false);
    });

    it('matches section ids case-insensitively', () => {
        const targeting: BannerTargeting = {
            ...baseBannerTargeting,
            sectionId: 'Sport',
        };

        expect(
            inExclusions(targeting, {
                rules: [{ name: 'section-rule', sectionIds: ['sport'] }],
            }),
        ).toBe(true);
    });

    it('matches tag ids case-insensitively', () => {
        const targeting: BannerTargeting = {
            ...baseBannerTargeting,
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
            inExclusions(baseBannerTargeting, {
                rules: [
                    {
                        name: 'active-range',
                        dateRange: { start: '1900-01-01', end: '2999-12-31' },
                    },
                ],
            }),
        ).toBe(true);

        expect(
            inExclusions(baseBannerTargeting, {
                rules: [
                    {
                        name: 'inactive-range',
                        dateRange: { start: '1900-01-01', end: '1900-01-02' },
                    },
                ],
            }),
        ).toBe(false);
    });

    it('uses isFront to evaluate content type', () => {
        const frontTargeting: BannerTargeting = {
            ...baseBannerTargeting,
            isFront: true,
        };
        const articleTargeting: BannerTargeting = {
            ...baseBannerTargeting,
            isFront: false,
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

    it('handles epic tags via tags[].id', () => {
        const epicTargeting: EpicTargeting = {
            contentType: 'Article',
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
            tags: [{ id: 'politics/politics', type: 'Keyword' }],
            hasOptedOutOfArticleCount: false,
            showSupportMessaging: true,
        };

        expect(
            inExclusions(epicTargeting, {
                rules: [{ name: 'epic-tag-rule', tagIds: ['POLITICS/POLITICS'] }],
            }),
        ).toBe(true);
    });
});
