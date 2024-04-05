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

const buildBanditData = (variants: number): BanditData => {
    const bestVariants = [];
    for (let i = 0; i < variants; i++) {
        const variantName = `v${i + 1}`;
        const mean = i + 1;
        bestVariants.push({
            variantName,
            mean,
        });
    }
    return {
        testName: 'example-1',
        bestVariants,
    };
};

describe('selectVariantWithHighestMean', () => {
    it('should return the only variant with highest mean', () => {
        const banditData = buildBanditData(1);
        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return first of best variants', () => {
        // v1 and v2 are tied
        const banditData = buildBanditData(2);
        // fix Math.random to always choose v1
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v1');
    });

    it('should return second of best variants', () => {
        // v1 and v2 are tied
        const banditData = buildBanditData(2);
        // fix Math.random to always choose v2
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);

        expect(selectVariantWithHighestMean(banditData, epicTest)?.name).toEqual('v2');
    });
});
