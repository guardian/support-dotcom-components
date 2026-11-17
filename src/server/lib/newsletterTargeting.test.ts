import { matchNewsletterTargeting } from './newsletterTargeting';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
}));

describe('matchNewsletterTargeting', () => {
    it('matches non-newsletter tests', () => {
        const test = { name: 'banner-test' };

        expect(matchNewsletterTargeting(test)).toBe(true);
    });

    it('suppresses newsletter tests until their newsletter data is available', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, [])).toBe(false);
    });

    it('rejects newsletter tests with no test-name mapping', () => {
        expect(
            matchNewsletterTargeting({ name: 'NEWSLETTER_UNMAPPED' }, [
                { listId: 6069 },
            ]),
        ).toBe(false);
    });
});
