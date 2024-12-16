import { selectVariantUsingRoulette } from './rouletteSelection';
import { EpicTest } from '../../shared/types';
import { BanditData } from '../bandit/banditData';

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
        variants: bestVariants,
    };
};

describe('roulette', () => {
    /**
     * Weights:
     * [
     *   {
     *     "variantName": "v1",
     *     "weight": 0.16666666666666666
     *   },
     *   {
     *     "variantName": "v2",
     *     "weight": 0.3333333333333333
     *   },
     *   {
     *     "variantName": "v3",
     *     "weight": 0.5
     *   }
     * ]
     */
    it('should return first variant', () => {
        const rand = 0.15;
        const variant = selectVariantUsingRoulette(
            [buildBanditData(epicTest.variants.length)],
            epicTest,
            rand,
        );
        expect(variant).toBe(epicTest.variants[0]);
    });

    it('should return second variant', () => {
        const rand = 0.49;
        const variant = selectVariantUsingRoulette(
            [buildBanditData(epicTest.variants.length)],
            epicTest,
            rand,
        );
        expect(variant).toBe(epicTest.variants[1]);
    });

    it('should return second variant', () => {
        const rand = 0.5;
        const variant = selectVariantUsingRoulette(
            [buildBanditData(epicTest.variants.length)],
            epicTest,
            rand,
        );
        expect(variant).toBe(epicTest.variants[2]);
    });
});

describe('rouletteTest2', () => {
    const epicTestNew: EpicTest = {
        channel: 'Epic',
        name: 'example-2',
        priority: 2,
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
            {
                name: 'v4',
                heading: '',
                paragraphs: [''],
                highlightedText: '',
                cta: {
                    text: 'Support The Guardian',
                    baseUrl: 'https://support.theguardian.com/contribute',
                },
            },
            {
                name: 'v5',
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

    const rouletteBanditData: BanditData = {
        testName: 'example-2',
        bestVariants: [
            {
                variantName: 'v2',
                mean: 3,
            },
        ],
        variants: [
            {
                variantName: 'v1',
                mean: 1,
            },
            {
                variantName: 'v2',
                mean: 3,
            },
            {
                variantName: 'v3',
                mean: 4,
            },
            {
                variantName: 'v4',
                mean: 5,
            },
            {
                variantName: 'v5',
                mean: 2,
            },
        ],
    };

    it('should return the fifth variant', () => {
        const rand = 0.15;
        const variant = selectVariantUsingRoulette([rouletteBanditData], epicTestNew, rand);
        expect(variant).toBe(epicTestNew.variants[4]);
    });

    it('should return the second variant', () => {
        const rand = 0.25;
        const variant = selectVariantUsingRoulette([rouletteBanditData], epicTestNew, rand);
        expect(variant).toBe(epicTestNew.variants[1]);
    });

    it('should return the fourth variant', () => {
        const rand = 0.9999;
        const variant = selectVariantUsingRoulette([rouletteBanditData], epicTestNew, rand);
        expect(variant).toBe(epicTestNew.variants[3]);
    });

    it('should return the second variant', () => {
        const rand = 0.65;
        const variant = selectVariantUsingRoulette([rouletteBanditData], epicTestNew, rand);
        expect(variant).toBe(epicTestNew.variants[2]);
    });
    /**
     * Calculations:
     * variants - v1 v2 v3 v4 v5
     * means - 1 3 4 5 2
     * sumOfMeans - 15
     * weights - 1/15, 3/15, 4/15, 5/15, 2/15
     * weights in decimals -(0.06666666666666667, 0.2, 0.26666666666666666, 0.3333333333333333, 0.13333333333333333)
     * weights sorted - 0.06666666666666667, 0.13333333333333333, 0.2, 0.26666666666666666, 0.3333333333333333
     * variants sorted - v1, v5, v2, v3, v4
     * cumulative weights - 0.06666666666666667, 0.2, 0.4, 0.6666666666666666, 1
     *
     */
});