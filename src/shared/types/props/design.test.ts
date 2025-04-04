import type { HexColour } from './design';
import { hexColourSchema, hexColourToString } from './design';

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
