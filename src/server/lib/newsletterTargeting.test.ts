import type { BannerTargeting } from '../../shared/types';
import type { NewsletterData, NewslettersByIdentityName } from './newsletters';
import { matchNewsletterTargeting } from './newsletterTargeting';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
}));

describe('matchNewsletterTargeting', () => {
    const stakes = { identityName: 'the-stakes-2026', listId: 6069 } as NewsletterData;
    const naza = { identityName: 'documentaries', listId: 4149 } as NewsletterData;
    const stakesOnly: NewslettersByIdentityName = new Map([['the-stakes-2026', stakes]]);
    const targeting = (
        values: Partial<
            Pick<BannerTargeting, 'countryCode' | 'isSignedIn' | 'userSubscriptions'>
        > = {},
    ) => ({ countryCode: 'US', isSignedIn: false, ...values });

    it('matches non-newsletter tests regardless of targeting', () => {
        const test = { name: 'banner-test' };

        expect(matchNewsletterTargeting(test, targeting({ countryCode: 'GB' }), new Map())).toBe(
            true,
        );
    });

    it('rejects newsletter tests outside the US', () => {
        const test = { name: 'NEWSLETTER_STAKES' };

        expect(matchNewsletterTargeting(test, targeting({ countryCode: 'GB' }), stakesOnly)).toBe(
            false,
        );
    });

    it('rejects a signed-in user subscribed to the newsletter for that test', () => {
        const newsletters: NewslettersByIdentityName = new Map([
            ['the-stakes-2026', stakes],
            ['documentaries', naza],
        ]);

        expect(
            matchNewsletterTargeting(
                { name: 'NEWSLETTER_STAKES' },
                targeting({ isSignedIn: true, userSubscriptions: [6069] }),
                newsletters,
            ),
        ).toBe(false);
        expect(
            matchNewsletterTargeting(
                { name: 'NEWSLETTER_NAZA' },
                targeting({ isSignedIn: true, userSubscriptions: [4149] }),
                newsletters,
            ),
        ).toBe(false);
    });

    it('matches a US user who is not subscribed when newsletter data is available', () => {
        expect(
            matchNewsletterTargeting(
                { name: 'NEWSLETTER_STAKES' },
                targeting({ isSignedIn: true, userSubscriptions: [] }),
                stakesOnly,
            ),
        ).toBe(true);
    });

    it('suppresses newsletter tests until their newsletter data is available', () => {
        expect(
            matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, targeting(), new Map()),
        ).toBe(false);
    });

    it('rejects newsletter tests with no test-name mapping', () => {
        expect(
            matchNewsletterTargeting({ name: 'NEWSLETTER_UNMAPPED' }, targeting(), stakesOnly),
        ).toBe(false);
    });
});
