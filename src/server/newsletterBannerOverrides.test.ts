import { newsletterBannerOverrides } from './newsletterBannerOverrides';

it('uses the NAZA design for a NAZA test with a suffix', () => {
    expect(newsletterBannerOverrides('NEWSLETTER_NAZA_AU')).toEqual(
        newsletterBannerOverrides('NEWSLETTER_NAZA'),
    );
});
