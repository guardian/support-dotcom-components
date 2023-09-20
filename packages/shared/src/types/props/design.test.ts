import { hexColourSchema } from './design';

describe('hexValueColourSchema', () => {
    it('successfully parses valid hex colours', () => {
        const goodHexColour = { r: 'AC', g: 'AA', b: 'AF' };

        const result = hexColourSchema.safeParse(goodHexColour);

        expect(result.success).toBeTruthy();
    });

    it('does not successfully parse when the object contains a bad hex value', () => {
        const badHexColour = {
            r: 'AC',
            g: 'AA',
            b: 'ZZ',
        };

        const result = hexColourSchema.safeParse(badHexColour);

        expect(result.success).toBeFalsy();
    });

    it('does not successfully parse when the object is missing a hex value', () => {
        const badHexColour = {
            r: 'AC',
            g: 'AA',
        };

        const result = hexColourSchema.safeParse(badHexColour);

        expect(result.success).toBeFalsy();
    });
});
