import { isValidTagIds } from '../libPure';

describe('isValidTagIds', () => {
    it('accepts `random`', () => {
        expect(isValidTagIds(['random/random', 'random/otherRandom'])).toBe(true);
    });

    it('does not accept `info/newsletter-sign-up`', () => {
        // `info/newsletter-sign-up` is taken from the list of hard coded invalid sections
        expect(isValidTagIds(['info/newsletter-sign-up', 'random/otherRandom'])).toBe(false);
    });
});
