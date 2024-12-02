import { EpicTest } from '../../shared/types';
import { selectVariantUsingMVT, withinRange, selectWithSeed, selectVariant } from './ab';

const test: EpicTest = {
    channel: 'Epic',
    name: 'example-1', // note - changing this name will change the results of the tests, as it's used for the seed
    priority: 1,
    status: 'Live',
    locations: [],
    tagIds: [],
    sections: [],
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
            name: 'control',
            heading: '',
            paragraphs: [''],
            highlightedText: '',
        },
        {
            name: 'v1',
            heading: '',
            paragraphs: [''],
            highlightedText: '',
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
};

const controlProportionSettings = {
    proportion: 0.1,
    offset: 500000,
};

describe('selectVariantWithMVT', () => {
    it('should select control (no controlProportion)', () => {
        const variant = selectVariantUsingMVT(test, 4);
        expect(variant.name).toBe('control');
    });

    it('should select variant (no controlProportion)', () => {
        const variant = selectVariantUsingMVT(test, 2);
        expect(variant.name).toBe('v1');
    });

    it('should select control (lower end of controlProportion)', () => {
        const variant = selectVariantUsingMVT({ ...test, controlProportionSettings }, 500000);
        expect(variant.name).toBe('control');
    });

    it('should select control (upper end of controlProportion)', () => {
        const variant = selectVariantUsingMVT({ ...test, controlProportionSettings }, 599999);
        expect(variant.name).toBe('control');
    });

    it('should select variant (below controlProportion)', () => {
        const variant = selectVariantUsingMVT({ ...test, controlProportionSettings }, 499999);
        expect(variant.name).toBe('v1');
    });

    it('should select variant (above controlProportion)', () => {
        const variant = selectVariantUsingMVT({ ...test, controlProportionSettings }, 600000);
        expect(variant.name).toBe('v1');
    });

    it('should select control if no variants', () => {
        const controlOnly = {
            ...test,
            variants: [test.variants[0]],
        };
        const variant = selectVariantUsingMVT(
            { ...controlOnly, controlProportionSettings },
            600000,
        );
        expect(variant.name).toBe('control');
    });
});

describe('withinRange', () => {
    it('should return false if below range (no wrap)', () => {
        expect(withinRange(10, 0.1, 1)).toBe(false);
    });

    it('should return false if above range (no wrap)', () => {
        expect(withinRange(10, 0.1, 100010)).toBe(false);
    });

    it('should return true if at start of range (no wrap)', () => {
        expect(withinRange(10, 0.1, 10)).toBe(true);
    });

    it('should return true if at end of range (no wrap)', () => {
        expect(withinRange(10, 0.1, 100009)).toBe(true);
    });

    it('should return true if above lower (wrap)', () => {
        expect(withinRange(999990, 0.1, 999999)).toBe(true);
    });

    it('should return true if below upper (wrap)', () => {
        expect(withinRange(999990, 0.1, 1)).toBe(true);
    });

    it('should return false if above upper and below lower (wrap)', () => {
        expect(withinRange(999990, 0.1, 99990)).toBe(false);
    });
});

describe('selectWithSeed', () => {
    it('should evenly distribute to the variants', () => {
        const variantCounts: { [key: string]: number } = {
            control: 0,
            v1: 0,
        };

        for (let mvt = 0; mvt < 5000; mvt++) {
            const variant = selectWithSeed(mvt, 'testName', test.variants);
            variantCounts[variant.name]++;
        }

        // Uses pseudorandom generator so they may not match precisely
        expect(Math.abs(variantCounts.control - variantCounts.v1)).toBeLessThan(10);
    });
});

describe('selectVariant', () => {
    it('should return same test name if no methodology configured', () => {
        const result = selectVariant(test, 1, []);
        expect(result?.test.name).toEqual(test.name);
    });

    it('should return same test name if the methodology is configured with no testName', () => {
        const testWithMethodology: EpicTest = {
            ...test,
            methodologies: [{ name: 'ABTest' }],
        };
        const result = selectVariant(testWithMethodology, 1, []);
        expect(result?.test.name).toEqual(test.name);
    });

    it('should return extended test name if the methodology is configured with a testName', () => {
        const testWithMethodology: EpicTest = {
            ...test,
            methodologies: [
                { name: 'ABTest', testName: 'example-1_ABTest' },
                {
                    name: 'EpsilonGreedyBandit',
                    epsilon: 0.5,
                    testName: 'example-1_EpsilonGreedyBandit-0.5',
                },
            ],
        };
        const result = selectVariant(testWithMethodology, 1, []);
        expect(result?.test.name).toBe('example-1_EpsilonGreedyBandit-0.5');
    });
});
