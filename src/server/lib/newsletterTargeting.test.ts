import type { NewsletterData, NewslettersByIdentityName } from './newsletters';
import { matchNewsletterTargeting } from './newsletterTargeting';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
}));

describe('matchNewsletterTargeting', () => {
    const stakesOnly: NewslettersByIdentityName = new Map([
        ['the-stakes-2026', { identityName: 'the-stakes-2026' } as NewsletterData],
    ]);

    it('matches non-newsletter tests', () => {
        expect(matchNewsletterTargeting({ name: 'banner-test' }, new Map())).toBe(true);
    });

    it('matches newsletter tests when their newsletter data is available', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, stakesOnly)).toBe(true);
    });

    it('suppresses newsletter tests until their newsletter data is available', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, new Map())).toBe(false);
    });

    it('rejects newsletter tests with no test-name mapping', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_UNMAPPED' }, stakesOnly)).toBe(false);
    });
});
