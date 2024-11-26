import { EpicTest } from '../../shared/types';
import { BanditData } from '../bandit/banditData';
import { selectVariantWithHighestMean } from '../bandit/banditSelection';
import { calculateWeightsFromMeans, getCumulativeValues } from './rouletteSelection';


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


describe('calculateWeightsFromMeans', () => {

    const banditData: BanditData = {
        testName: "Bandit Test",
        bestVariants: [
            { variantName: "A", mean: 10 },
            { variantName: "B", mean: 25 },
            { variantName: "C", mean: 15 },
        ],
    };
    it('should return a weight of 20 for the first variant', () => {
        const { variants , weights } = calculateWeightsFromMeans(banditData);
        expect(weights).toEqual([20, 50, 30]);

        const totalWeight =weights.reduce((sum, weight) => sum + weight, 0);
        expect(totalWeight).toEqual(100)

        const cumulativeWeights= getCumulativeValues(weights);
        expect (cumulativeWeights).toEqual([20,70,100]);

        const randomNumber = Math.floor(Math.random() * Math.max(...cumulativeWeights)) + 1;

        for (let i = 0; i < weights.length; i++) {
            if (randomNumber <= cumulativeWeights[i]) {
               console.log(variants[i])
            }
        }
        });

    it('should return a weight of 100 for the only variant with highest mean', () => {
        const banditData = buildBanditData(1);
        const { variants , weights } = calculateWeightsFromMeans(banditData);
        expect(weights).toEqual([100]);

        const cumulativeWeights= getCumulativeValues(weights);
        expect (cumulativeWeights).toEqual([100]);

    });

    it('should return equal weights for all variants with the same mean ', () => {
        const banditData: BanditData = {
            testName: "Bandit Test",
            bestVariants: [
                { variantName: "A", mean: 15 },
                { variantName: "B", mean: 15 },
                { variantName: "C", mean: 15 },
            ],
        };

        const { variants , weights } = calculateWeightsFromMeans(banditData);
        expect(weights).toEqual([33,33,33]);

        const totalWeight =weights.reduce((sum, weight) => sum + weight, 0);
        expect(totalWeight).toEqual(99)

        const cumulativeWeights= getCumulativeValues(weights);
        expect (cumulativeWeights).toEqual([33,66,99]);

    });




});

