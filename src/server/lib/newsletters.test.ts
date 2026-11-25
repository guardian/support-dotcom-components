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
        ['NEWSLETTER_NAZA_AU', 'documentaries'],
        ['NEWSLETTER_NAZA_US', 'documentaries'],
        ['NEWSLETTER_NAZA_CUSTOM', 'documentaries'],
        ['NEWSLETTER_NAZA_CUSTOM_AU', 'documentaries'],
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
        expect(jest.mocked(ValueReloader)).toHaveBeenCalledWith(
            new Map(),
            fetchNewsletters,
            5 * 60,
        );
        await reloaderPromise;
    });
});

describe('getPromotedNewsletterForTest', () => {
    const newsletters: NewslettersByIdentityName = new Map([
        [
            'the-stakes-2026',
            {
                identityName: 'the-stakes-2026',
                name: 'Stakes name',
                signUpDescription: 'Stakes description',
                illustrationSquare: 'https://example.com/original-stakes.png',
            } as NewsletterData,
        ],
        [
            'documentaries',
            {
                identityName: 'documentaries',
                name: 'Original NAZA Name',
                signUpDescription: 'Original NAZA Description',
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

    it.each(['NEWSLETTER_NAZA', 'NEWSLETTER_NAZA_AU', 'NEWSLETTER_NAZA_US'])(
        'uses the banner heading and paragraphs for %s',
        (testName) => {
            const result = getPromotedNewsletterForTest(testName, newsletters, {
                heading: 'Custom header',
                paragraphs: ['First paragraph.', 'Second paragraph.'],
            });
            expect(result?.name).toBe('Custom header');
            expect(result?.signUpDescription).toBe('First paragraph. Second paragraph.');
            expect(result?.identityName).toBe('documentaries');
        },
    );

    it('keeps API copy for other newsletters even when banner content is present', () => {
        const result = getPromotedNewsletterForTest('NEWSLETTER_STAKES', newsletters, {
            heading: 'Different header',
            paragraphs: ['Different body'],
        });
        expect(result?.name).toBe('Stakes name');
        expect(result?.signUpDescription).toBe('Stakes description');
    });

    it('falls back to API copy for missing banner content', () => {
        const result = getPromotedNewsletterForTest('NEWSLETTER_NAZA_AU', newsletters, {
            paragraphs: [],
        });
        expect(result?.name).toBe('Original NAZA Name');
        expect(result?.signUpDescription).toBe('Original NAZA Description');
    });

    it('falls back separately for missing banner fields', () => {
        expect(
            getPromotedNewsletterForTest('NEWSLETTER_NAZA_AU', newsletters, {
                heading: 'Custom header',
            }),
        ).toMatchObject({ name: 'Custom header', signUpDescription: 'Original NAZA Description' });
        expect(
            getPromotedNewsletterForTest('NEWSLETTER_NAZA_AU', newsletters, {
                paragraphs: ['Custom body'],
            }),
        ).toMatchObject({ name: 'Original NAZA Name', signUpDescription: 'Custom body' });
    });
});
