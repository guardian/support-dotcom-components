import { containsPlaceholder, containsUnexpectedPlaceholder } from './placeholders';

describe('shouldNotRenderEpic', () => {
    it('returns true if string contains placeholder', () => {
        const got = containsPlaceholder('apple %%SOME_PLACEHOLDER%%');
        expect(got).toBe(true);
    });

    it('returns false if string does not contain placeholder', () => {
        const got = containsPlaceholder('apple without placeholder');
        expect(got).toBe(false);
    });

    it('return true if string contains unexpected placeholder', () => {
        const got = containsUnexpectedPlaceholder('apple %%UNEXPECTED%%', ['%%EXPECTED%%']);
        expect(got).toBe(true);
    });

    it('returns false if string does not contain unexpected placeholder', () => {
        const got = containsUnexpectedPlaceholder('apple %%EXPECTED%%', ['%%EXPECTED%%']);
        expect(got).toBe(false);
    });
});
