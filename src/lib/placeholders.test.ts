import { containsNonArticleCountPlaceholder } from './placeholders';

describe('containsPlaceholder', () => {
    it('returns true if string contains placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple %%SOME_PLACEHOLDER%%');
        expect(got).toBe(true);
    });

    it('returns false if string does not contain placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple without placeholder');
        expect(got).toBe(false);
    });
});
