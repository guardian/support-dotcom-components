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
        // const banditData = buildBanditData(1);
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                {variantName: 'v1', mean: 1}
            ]
        }
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return the only variant with highest mean', () => {
        // const banditData = buildBanditData(1);
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                {variantName: 'v1', mean: 1},
                {variantName: 'v2', mean: 0.5},
                {variantName: 'v3', mean: 0.5},
            ]
        }
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return first of tied best variants', () => {
        // v1 and v2 are tied
        // const banditData = buildBanditData(2);
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                {variantName: 'v1', mean: 1},
                {variantName: 'v2', mean: 1},
                {variantName: 'v3', mean: 0.5},
            ]
        }
        // fix Math.random to always choose v1
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return second of tied best variants', () => {
        // v1 and v2 are tied
        // const banditData = buildBanditData(2);
        const banditData = {
            testName: 'example-1',
            sortedVariants: [
                {variantName: 'v1', mean: 1},
                {variantName: 'v2', mean: 1},
                {variantName: 'v3', mean: 0.5},
            ]
        }
        // fix Math.random to always choose v2
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v2');
    });
});
