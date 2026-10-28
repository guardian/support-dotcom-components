import type { BannerTargeting } from '../../shared/types';
import { matchNewsletterTargeting } from './newsletterTargeting';

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

    it('rejects a signed-in user subscribed to the promoted newsletter', () => {
        const test = { name: 'NEWSLETTER_test' };

        expect(
            matchNewsletterTargeting(
                test,
                targeting({ isSignedIn: true, userSubscriptions: [6069] }),
            ),
        ).toBe(false);
    });

    it('matches a US user who is not subscribed to the promoted newsletter', () => {
        expect(
            matchNewsletterTargeting(
                { name: 'NEWSLETTER_test' },
                targeting({ isSignedIn: true, userSubscriptions: [] }),
            ),
        ).toBe(true);
    });
});
