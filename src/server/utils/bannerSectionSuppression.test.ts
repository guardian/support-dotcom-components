import { shouldSuppressBannerForSectionDate } from './bannerSectionSuppression';

describe('shouldSuppressBannerForSectionDate', () => {
    it('suppresses sport banners from 10 to 13 March 2026', () => {
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-10T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-11T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-12T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(true);
    });

    it('suppresses fashion banners from 13 to 25 March 2026', () => {
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-14T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-20T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-24T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-25T12:00:00.000Z')),
        ).toBe(true);
    });

    it('does not suppress on other dates or sections', () => {
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-09T12:00:00.000Z')),
        ).toBe(false);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-14T12:00:00.000Z')),
        ).toBe(false);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-12T12:00:00.000Z')),
        ).toBe(false);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-26T12:00:00.000Z')),
        ).toBe(false);
        expect(
            shouldSuppressBannerForSectionDate('news', new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(false);
        expect(
            shouldSuppressBannerForSectionDate(undefined, new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(false);
    });

    it('matches section ids case-insensitively', () => {
        expect(
            shouldSuppressBannerForSectionDate('SPORT', new Date('2026-03-10T12:00:00.000Z')),
        ).toBe(true);
    });
});
