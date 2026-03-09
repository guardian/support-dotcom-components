import { shouldSuppressBannerForSectionDate } from './bannerSectionSuppression';

describe('shouldSuppressBannerForSectionDate', () => {
    it('suppresses sport banners on 10, 11 and 13 March 2026', () => {
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-10T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-11T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(true);
    });

    it('suppresses fashion banners on 13, 20 and 25 March 2026', () => {
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-13T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-20T12:00:00.000Z')),
        ).toBe(true);
        expect(
            shouldSuppressBannerForSectionDate('fashion', new Date('2026-03-25T12:00:00.000Z')),
        ).toBe(true);
    });

    it('does not suppress on other dates or sections', () => {
        expect(
            shouldSuppressBannerForSectionDate('sport', new Date('2026-03-12T12:00:00.000Z')),
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
