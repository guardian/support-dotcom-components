import { myRoulette } from './myRoulette';
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
    };
};

describe('myRoulette', () => {
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
        const variant = myRoulette([buildBanditData(epicTest.variants.length)], epicTest, rand);
        expect(variant).toBe(epicTest.variants[0]);
    });

    it('should return second variant', () => {
        const rand = 0.49;
        const variant = myRoulette([buildBanditData(epicTest.variants.length)], epicTest, rand);
        expect(variant).toBe(epicTest.variants[1]);
    });

    it('should return second variant', () => {
        const rand = 0.5;
        const variant = myRoulette([buildBanditData(epicTest.variants.length)], epicTest, rand);
        expect(variant).toBe(epicTest.variants[2]);
    });
});
