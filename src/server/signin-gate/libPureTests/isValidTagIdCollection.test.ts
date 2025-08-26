import { isValidTagIdCollection } from '../libPure';

describe('isValidTagIdCollection', () => {
    it('accepts `random`', () => {
        expect(isValidTagIdCollection(['random/random', 'random/otherRandom'])).toBe(true);
    });

    it('does not accept `info/newsletter-sign-up`', () => {
        // `info/newsletter-sign-up` is taken from the list of hard coded invalid sections
        expect(isValidTagIdCollection(['info/newsletter-sign-up', 'random/otherRandom'])).toBe(
            false,
        );
    });
});
