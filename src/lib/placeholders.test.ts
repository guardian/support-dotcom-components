import { containsPlaceholder } from './placeholders';

describe('placeholder handling', () => {
    it('returns true if string contains placeholder', () => {
        const got = containsPlaceholder('apple %%SOME_PLACEHOLDER%%');
        expect(got).toBe(true);
    });

    it('returns false if string does not contain placeholder', () => {
        const got = containsPlaceholder('apple without placeholder');
        expect(got).toBe(false);
    });
});
