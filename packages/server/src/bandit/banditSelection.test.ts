import { EpicTest } from '@sdc/shared/dist/types';
import { BanditData } from './banditData';
import { selectVariantWithHighestMean } from './banditSelection';

const epicTest: EpicTest = {
    name: 'example-1',
    priority: 1,
    status: 'Live',
    locations: [],
    tagIds: [],
    sections: ['environment'],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    hasCountryName: false,
    variants: [
        {
            name: 'v1',
            heading: '',
            paragraphs: [''],
            highlightedText: '',
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
        },
        {
            name: 'v2',
            heading: '',
            paragraphs: [''],
            highlightedText: '',
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
        },
        {
            name: 'v3',
            heading: '',
            paragraphs: [''],
            highlightedText: '',
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    hasArticleCountInCopy: true,
};

const buildBanditData = (v1: number, v2: number, v3: number): BanditData => ({
    testName: 'example-1',
    variants: [
        {
            variantName: 'v1',
            mean: v1,
        },
        {
            variantName: 'v2',
            mean: v2,
        },
        {
            variantName: 'v3',
            mean: v3,
        },
    ],
});

describe('selectVariantWithHighestMean', () => {
    it('should return the only variant with highest mean', () => {
        const banditData = buildBanditData(3, 2, 1);
        expect(selectVariantWithHighestMean(banditData, epicTest)).toEqual(epicTest.variants[0]);
    });

    it('should return first of best variants', () => {
        // v1 and v2 are tied
        const banditData = buildBanditData(3, 3, 1);
        // fix Math.random to always choose v1
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return second of best variants', () => {
        // v1 and v2 are tied
        const banditData = buildBanditData(3, 3, 1);
        // fix Math.random to always choose v2
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v2');
    });
});
