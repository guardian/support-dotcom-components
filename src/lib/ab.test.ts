import { selectVariant, withinRange } from './ab';
import { EpicTest } from '../types/EpicTypes';

const test: EpicTest = {
    name: 'example-1',
    isOn: true,
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
};

const controlProportionSettings = {
    proportion: 0.1,
    offset: 500000,
};

describe('selectVariant', () => {
    it('should select control (no controlProportion)', () => {
        const variant = selectVariant(test, 0);
        expect(variant.name).toBe('control');
    });

    it('should select variant (no controlProportion)', () => {
        const variant = selectVariant(test, 1);
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
