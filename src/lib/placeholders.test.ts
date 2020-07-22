import { containsNonArticleCountPlaceholder } from './placeholders';

describe('containsNonArticleCountPlaceholder', () => {
    it('returns true if string contains placeholder (that is not %%ARTICLE_COUNT%%)', () => {
        const got = containsNonArticleCountPlaceholder('apple %%SOME_PLACEHOLDER%%');
        expect(got).toBe(true);
    });

    it('returns false if string contains an article count placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple %%ARTICLE_COUNT%%');
        expect(got).toBe(false);
    });

    it('returns false if string does not contain placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple without placeholder');
        expect(got).toBe(false);
    });
});
