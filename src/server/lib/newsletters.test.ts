import { ValueReloader } from '../utils/valueReloader';
import type { NewsletterData, NewslettersByIdentityName } from './newsletters';
import {
    buildNewslettersReloader,
    fetchNewsletters,
    getNewsletterForTestName,
    getPromotedNewsletterForTest,
} from './newsletters';

jest.mock('../utils/valueReloader', () => ({
    ValueReloader: jest.fn(),
}));

describe('getNewsletterForTestName', () => {
    const newsletters: NewslettersByIdentityName = new Map([
        ['the-stakes-2026', { identityName: 'the-stakes-2026' } as NewsletterData],
        ['documentaries', { identityName: 'documentaries' } as NewsletterData],
    ]);

    it.each([
        ['NEWSLETTER_STAKES', 'the-stakes-2026'],
        ['NEWSLETTER_NAZA', 'documentaries'],
    ])('selects newsletter list ID %s for the configured test name', (testName, identityName) => {
        expect(getNewsletterForTestName(testName, newsletters)?.identityName).toBe(identityName);
    });

    it('returns no newsletter for an unconfigured test', () => {
        expect(getNewsletterForTestName('NEWSLETTER_STAKES_US', newsletters)).toBeUndefined();
        expect(getNewsletterForTestName('NEWSLETTER_OTHER', newsletters)).toBeUndefined();
    });
});

describe('buildNewslettersReloader', () => {
    it('returns a promise for an empty-cache reloader that fetches in the background', async () => {
        const reloaderPromise = buildNewslettersReloader();

        expect(reloaderPromise).toBeInstanceOf(Promise);
        expect(jest.mocked(ValueReloader)).toHaveBeenCalledWith(new Map(), fetchNewsletters, 5 * 60);
        await reloaderPromise;
    });
});

describe('getPromotedNewsletterForTest', () => {
    const newsletters: NewslettersByIdentityName = new Map([
        [
            'the-stakes-2026',
            {
                identityName: 'the-stakes-2026',
                illustrationSquare: 'https://example.com/original-stakes.png',
            } as NewsletterData,
        ],
        [
            'documentaries',
            {
                identityName: 'documentaries',
                illustrationSquare: 'https://example.com/original-naza.png',
            } as NewsletterData,
        ],
    ]);

    it('uses the configured square illustration for NEWSLETTER_STAKES', () => {
        expect(
            getPromotedNewsletterForTest('NEWSLETTER_STAKES', newsletters)?.illustrationSquare,
        ).toBe('https://uploads.guim.co.uk/2026/10/30/The_Stakes_image_Mobile.png');
    });

    it('keeps the API square illustration for other newsletters', () => {
        expect(
            getPromotedNewsletterForTest('NEWSLETTER_NAZA', newsletters)?.illustrationSquare,
        ).toBe('https://example.com/original-naza.png');
    });
});
