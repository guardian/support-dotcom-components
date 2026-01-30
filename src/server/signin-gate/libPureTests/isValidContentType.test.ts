import { isValidContentType } from '../libPure';

describe('isValidContentType', () => {
    it('accepts Article', () => {
        expect(isValidContentType('Article')).toBe(true);
    });

    it('does not accepts NonArticle', () => {
        expect(isValidContentType('NonArticle')).toBe(false);
    });
});
