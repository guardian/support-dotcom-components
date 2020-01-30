import { isEpicContent, isEpicSuitable, isEpicWorthwhile } from './targeting';
// import testData from '../components/ContributionsEpic.testData';

describe('The isEpicContent function', () => {
    it('should return TRUE if content type IS Article', () => {
        const contentType = 'Article';
        expect(isEpicContent({ contentType })).toEqual(true);
    });

    it('should return FALSE if content type IS NOT Article', () => {
        const contentType = 'Feature';
        expect(isEpicContent({ contentType })).toEqual(false);
    });
});

describe('The isEpicSuitable function', () => {
    it('should return TRUE if all parameters ARE FALSE', () => {
        const testSuitableFlags = {
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
        };

        expect(isEpicSuitable(testSuitableFlags)).toEqual(true);
    });

    it('should return FALSE if one or more flags ARE TRUE', () => {
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

describe('The isEpicWorthwhile function', () => {
    it('should return TRUE if the Section IS NOT blacklisted', () => {
        const testSectionWorthwhile = {
            sectionName: 'culture',
            tags: [],
        };

        expect(isEpicWorthwhile(testSectionWorthwhile)).toEqual(true);
    });

    it('should return FALSE if the Section IS blacklisted', () => {
        const testSectionWorthwhile = {
            sectionName: 'football',
            tags: [],
        };

        expect(isEpicWorthwhile(testSectionWorthwhile)).toEqual(false);
    });

    it('should return TRUE if keywords ARE NOT blacklisted', () => {
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
            ],
        };
        expect(isEpicWorthwhile(testKeywordsWorthwhile)).toEqual(true);
    });
    it('should return FALSE if one or more keywords ARE blacklisted', () => {
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
                    id: 'environment/environment',
                    type: 'Keyword',
                    title: 'This IS NOT a blacklisted keyword',
                },
            ],
        };
        expect(isEpicWorthwhile(testKeywordsWorthwhile)).toEqual(false);
    });
});
