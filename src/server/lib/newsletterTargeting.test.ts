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

    it('matches NAZA tests only when the documentaries newsletter is available', () => {
        const documentaries: NewslettersByIdentityName = new Map([
            ['documentaries', { identityName: 'documentaries' } as NewsletterData],
        ]);
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_NAZA_AU' }, documentaries)).toBe(true);
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_NAZA_AU' }, stakesOnly)).toBe(false);
    });

    it('suppresses newsletter tests until their newsletter data is available', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, new Map())).toBe(false);
    });

    it('rejects newsletter tests with no test-name mapping', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_UNMAPPED' }, stakesOnly)).toBe(false);
    });
});
