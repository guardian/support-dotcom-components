import { isEpicContent, isEpicSuitable, isEpicWorthwhile, shouldRenderEpic } from './targeting';

describe('isEpicContent()', () => {
    it('should return TRUE if content type IS Article', () => {
        const contentType = 'Article';
        expect(isEpicContent({ contentType })).toEqual(true);
    });

    it('should return FALSE if content type IS NOT Article', () => {
        const contentType = 'Feature';
        expect(isEpicContent({ contentType })).toEqual(false);
    });
});

describe('isEpicSuitable()', () => {
    it('should return TRUE if all parameters ARE FALSE', () => {
        const testSuitableFlags = {
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
        };

        expect(isEpicSuitable(testSuitableFlags)).toEqual(true);
    });

    it('should return FALSE if one or more parameters ARE TRUE', () => {
        const testSuitableFlags1 = {
            shouldHideReaderRevenue: true,
            isMinuteArticle: false,
            isPaidContent: false,
        };
        expect(isEpicSuitable(testSuitableFlags1)).toEqual(false);

        const testSuitableFlags2 = {
            shouldHideReaderRevenue: true,
            isMinuteArticle: true,
            isPaidContent: false,
        };
        expect(isEpicSuitable(testSuitableFlags2)).toEqual(false);
    });
});

describe('isEpicWorthwhile()', () => {
    it('should return TRUE if the section IS NOT blacklisted', () => {
        const testSectionWorthwhile = {
            sectionName: 'culture',
            tags: [],
        };

        expect(isEpicWorthwhile(testSectionWorthwhile)).toEqual(true);
    });

    it('should return FALSE if the section IS blacklisted', () => {
        const testSectionWorthwhile = {
            sectionName: 'football',
            tags: [],
        };

        expect(isEpicWorthwhile(testSectionWorthwhile)).toEqual(false);
    });

    it('should return TRUE if tags ARE NOT blacklisted', () => {
        const testKeywordsWorthwhile = {
            sectionName: '',
            tags: [
                {
                    id: 'culture/david-schwimmer',
                    type: 'Keyword',
                    title: 'This is NOT a blacklisted keyword',
                },
                {
                    id: 'tv-and-radio/friends',
                    type: 'Keyword',
                    title: 'This is NOT a blacklisted keyword',
                },
                {
                    id: 'tone/interview',
                    type: 'Tone',
                    title: 'This is NOT a blacklisted tone',
                },
            ],
        };
        expect(isEpicWorthwhile(testKeywordsWorthwhile)).toEqual(true);
    });
    it('should return FALSE if one or more tags ARE blacklisted', () => {
        const testKeywordsWorthwhile = {
            sectionName: '',
            tags: [
                {
                    id: 'guardian-masterclasses/guardian-masterclasses',
                    type: 'Keyword',
                    title: 'This IS a blacklisted keyword',
                },
                {
                    id: 'tv-and-radio/friends',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tone/interview',
                    type: 'Tone',
                    title: 'This is NOT a blacklisted tone',
                },
            ],
        };
        expect(isEpicWorthwhile(testKeywordsWorthwhile)).toEqual(false);
    });

    it('should return TRUE if NEITHER Section or Tags ARE blacklisted', () => {
        const testKeywordsWorthwhile = {
            sectionName: 'culture',
            tags: [
                {
                    id: 'culture/david-schwimmer',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tv-and-radio/friends',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tone/interview',
                    type: 'Tone',
                    title: 'This is NOT a blacklisted tone',
                },
            ],
        };
        expect(isEpicWorthwhile(testKeywordsWorthwhile)).toEqual(true);
    });
});

describe('shouldRenderEpic()', () => {
    it('should return TRUE if content IS of appropriate TYPE, IS of appropriate SECTION and IS of appropriate TAGS', () => {
        const testShouldRenderEpic = {
            contentType: 'Article',
            sectionName: 'culture',
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
            tags: [
                {
                    id: 'culture/david-schwimmer',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tv-and-radio/friends',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tone/interview',
                    type: 'Tone',
                    title: 'This is NOT a blacklisted tone',
                },
            ],
        };

        expect(shouldRenderEpic(testShouldRenderEpic)).toEqual(true);
    });

    it('should return FALSE if content if either TYPE, SECTION or TAGS are NOT appropriate', () => {
        const testShouldRenderEpic = {
            contentType: 'Article',
            sectionName: 'culture',
            shouldHideReaderRevenue: true, // must be false to render Epic
            isMinuteArticle: false,
            isPaidContent: false,
            tags: [
                {
                    id: 'culture/david-schwimmer',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'tv-and-radio/friends',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
                {
                    id: 'environment/environment',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
            ],
        };

        expect(shouldRenderEpic(testShouldRenderEpic)).toEqual(false);
    });
});
