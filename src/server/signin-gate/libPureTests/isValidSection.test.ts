import { isValidSection } from '../libPure';

describe('isValidSection', () => {
    it('accepts news', () => {
        expect(isValidSection('news')).toBe(true);
    });

    it('does not accept `about`', () => {
        // `about` is taken from the list of hard coded invalid sections
        expect(isValidSection('about')).toBe(false);
    });
});
