import { hexColourSchema } from './design';

describe('hexValueColourSchema', () => {
    it('enforces that hex values are valid', () => {
        const goodHexColour = {
            r: 'AC',
            g: 'AA',
            b: '15',
        };

        const result = hexColourSchema.safeParse(goodHexColour);

        expect(result.success).toBeTruthy();
    });
});
