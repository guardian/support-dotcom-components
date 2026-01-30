import type { EpicTest } from '../../shared/types';
import { selectVariantWithHighestMean } from './epsilonGreedySelection';

const epicTest: EpicTest = {
    channel: 'Epic',
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

describe('selectVariantWithHighestMean', () => {
    it('should return the only variant', () => {
        const banditData = {
            testName: 'example-1',
            sortedVariants: [{ variantName: 'v1', mean: 1 }],
        };
        const testWithOneVariant = {
            ...epicTest,
            variants: [epicTest.variants[0]],
        };
        expect(selectVariantWithHighestMean(banditData, testWithOneVariant)?.name).toEqual('v1');
    });

    it('should return the only variant with highest mean', () => {
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                { variantName: 'v1', mean: 1 },
                { variantName: 'v2', mean: 0.5 },
                { variantName: 'v3', mean: 0.5 },
            ],
        };
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should randomly pick from tied best variants when not all variants are tied', () => {
        // v1 and v2 are tied
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                { variantName: 'v1', mean: 1 },
                { variantName: 'v2', mean: 1 },
                { variantName: 'v3', mean: 0.5 },
            ],
        };
        // fix Math.random to always choose v1
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');

        // fix Math.random to always choose v2
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v2');
    });

    it('should randomly pick from tied best variants when all variants are tied', () => {
        // all variants are tied
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                { variantName: 'v1', mean: 0 },
                { variantName: 'v2', mean: 0 },
                { variantName: 'v3', mean: 0 },
            ],
        };
        // fix Math.random to always choose v1
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');

        // fix Math.random to always choose v2
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v2');

        // fix Math.random to always choose v3
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v3');
    });

    it('should ignore variants in bandit data that are not in the test configuration', () => {
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                { variantName: 'ghost', mean: 2 }, // not in test.variants
                { variantName: 'v1', mean: 1 },
                { variantName: 'v2', mean: 0.5 },
                { variantName: 'v3', mean: 0.3 },
            ],
        };
        const result = selectVariantWithHighestMean(banditData, epicTest);
        expect(result?.name).toEqual('v1');
    });
});
