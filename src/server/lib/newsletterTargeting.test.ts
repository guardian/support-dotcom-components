import type { BannerTargeting } from '../../shared/types';
import { matchNewsletterTargeting } from './newsletterTargeting';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
}));

describe('matchNewsletterTargeting', () => {
    const targeting = (
        values: Partial<
            Pick<BannerTargeting, 'countryCode' | 'isSignedIn' | 'userSubscriptions'>
        > = {},
    ) => ({ countryCode: 'US', isSignedIn: false, ...values });

    it('matches non-newsletter tests regardless of targeting', () => {
        const test = { name: 'banner-test' };

        expect(matchNewsletterTargeting(test, targeting({ countryCode: 'GB' }))).toBe(true);
    });

    it('rejects newsletter tests outside the US', () => {
        const test = { name: 'NEWSLETTER_test' };

        expect(matchNewsletterTargeting(test, targeting({ countryCode: 'GB' }))).toBe(false);
    });

    it('rejects a signed-in user subscribed to the newsletter for that test', () => {
        const newsletters = [{ listId: 6069 }, { listId: 4149 }];

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
                [{ listId: 6069 }],
            ),
        ).toBe(true);
    });

    it('suppresses newsletter tests until their newsletter data is available', () => {
        expect(matchNewsletterTargeting({ name: 'NEWSLETTER_STAKES' }, targeting(), [])).toBe(
            false,
        );
    });

    it('rejects newsletter tests with no test-name mapping', () => {
        expect(
            matchNewsletterTargeting({ name: 'NEWSLETTER_UNMAPPED' }, targeting(), [
                { listId: 6069 },
            ]),
        ).toBe(false);
    });
});
