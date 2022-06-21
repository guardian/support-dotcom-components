import { EpicTest } from '@sdc/shared/types';
import { selectVariant, withinRange, selectWithSeed } from './ab';

const test: EpicTest = {
    name: 'example-1', // note - changing this name will change the results of the tests, as it's used for the seed
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
    isLiveBlog: false,
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

describe('selectVariant', () => {
    it('should select control (no controlProportion)', () => {
        const variant = selectVariant(test, 4);
        expect(variant.name).toBe('control');
    });

    it('should select variant (no controlProportion)', () => {
        const variant = selectVariant(test, 2);
        expect(variant.name).toBe('v1');
    });

    it('should select control (lower end of controlProportion)', () => {
        const variant = selectVariant({ ...test, controlProportionSettings }, 500000);
        expect(variant.name).toBe('control');
    });

    it('should select control (upper end of controlProportion)', () => {
        const variant = selectVariant({ ...test, controlProportionSettings }, 599999);
        expect(variant.name).toBe('control');
    });

    it('should select variant (below controlProportion)', () => {
        const variant = selectVariant({ ...test, controlProportionSettings }, 499999);
        expect(variant.name).toBe('v1');
    });

    it('should select variant (above controlProportion)', () => {
        const variant = selectVariant({ ...test, controlProportionSettings }, 600000);
        expect(variant.name).toBe('v1');
    });

    it('should select control if no variants', () => {
        const controlOnly = {
            ...test,
            variants: [test.variants[0]],
        };
        const variant = selectVariant({ ...controlOnly, controlProportionSettings }, 600000);
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
