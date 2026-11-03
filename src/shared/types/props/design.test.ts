import type { HexColour } from './design';
import { configurableDesignSchema, hexColourSchema, hexColourToString } from './design';

const validColour = { r: 'FF', g: 'FF', b: 'FF', kind: 'hex' };

const parseChoiceCardOpacity = (opacityFields: Record<string, unknown>) =>
    configurableDesignSchema.safeParse({
        visual: { kind: 'ChoiceCards', ...opacityFields },
        colours: { basic: { background: validColour, bodyText: validColour } },
    });

describe('hexValueColourSchema', () => {
    it('successfully parses valid hex colours', () => {
        const goodHexColour = { r: 'AC', g: 'AA', b: 'AF', kind: 'hex' };

        const result = hexColourSchema.safeParse(goodHexColour);

        expect(result.success).toBeTruthy();
    });

    it('does not successfully parse when the object contains a bad hex value', () => {
        const badHexColour = {
            r: 'AC',
            g: 'AA',
            b: 'ZZ',
            kind: 'hex',
        };

        const result = hexColourSchema.safeParse(badHexColour);

        expect(result.success).toBeFalsy();
    });

    it('does not successfully parse when the object is missing a hex value', () => {
        const badHexColour = {
            r: 'AC',
            g: 'AA',
            kind: 'hex',
        };

        const result = hexColourSchema.safeParse(badHexColour);

        expect(result.success).toBeFalsy();
    });
});

describe('hexColourToString', () => {
    it('returns a CSS colour string for a HexColour object', () => {
        const hexColour: HexColour = {
            r: 'FF',
            g: '00',
            b: '1F',
            kind: 'hex',
        };

        const cssString = hexColourToString(hexColour);

        expect(cssString).toEqual('#FF001F');
    });
});

describe('choice card opacity schema', () => {
    it.each([
        [0, 1],
        [0.8, 0.95],
    ])('accepts button opacity values %s and %s', (buttonOpacity, buttonSelectOpacity) => {
        const result = parseChoiceCardOpacity({ buttonOpacity, buttonSelectOpacity });

        expect(result.success).toBe(true);
    });

    it('accepts omitted opacity values', () => {
        expect(parseChoiceCardOpacity({}).success).toBe(true);
    });

    it('accepts null opacity values', () => {
        expect(
            parseChoiceCardOpacity({ buttonOpacity: null, buttonSelectOpacity: null }).success,
        ).toBe(true);
    });

    it.each([
        ['buttonOpacity', -0.01],
        ['buttonOpacity', 1.01],
        ['buttonSelectOpacity', -0.01],
        ['buttonSelectOpacity', 1.01],
    ])('rejects %s outside the inclusive 0–1 range', (field, value) => {
        expect(parseChoiceCardOpacity({ [field]: value }).success).toBe(false);
    });
});
