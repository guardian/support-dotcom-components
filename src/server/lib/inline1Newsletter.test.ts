import assert from 'node:assert/strict';
import type { Inline1Variant } from '../../shared/types';
import { inline1VariantSchema } from '../../shared/types';
import { logError } from '../utils/logging';
import { getInline1Variant } from './inline1Newsletter';
import type { NewsletterData, NewslettersByIdentityName } from './newsletters';

jest.mock('../utils/logging', () => ({
    logError: jest.fn(),
}));

describe('getInline1Variant', () => {
    const variant: Inline1Variant = {
        name: 'newsletter',
        bidScore: 1,
        message: {
            type: 'Inline1NewsletterMessage',
            newsletterId: 'the-stakes',
            heading: 'Sign up for The Stakes',
            body: 'Get the latest news.',
        },
    };
    const newsletter: NewsletterData = {
        identityName: 'the-stakes',
        name: 'The Stakes',
        listId: 6069,
        listIdV1: 6069,
        status: 'live',
        category: 'manual-send',
        theme: 'news',
        emailConfirmation: false,
        restricted: false,
        frequency: 'Weekly',
        group: 'News',
        signUpHeadline: 'Sign up for The Stakes',
        signUpDescription: 'Get the latest news.',
        signUpEmbedDescription: 'Get the latest news in your inbox.',
        highlightCardTitle: 'The Stakes',
        brazeSubscribeAttributeName: 'the_stakes',
        brazeSubscribeEventNamePrefix: 'the_stakes',
        brazeNewsletterName: 'The Stakes',
        creationTimeStamp: 0,
        illustrationSquare: 'https://example.com/stakes.png',
        illustrationCard: 'https://example.com/stakes-card.png',
    };

    const toMap = (...items: NewsletterData[]): NewslettersByIdentityName =>
        new Map(items.map((item) => [item.identityName, item]));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches identityName to the RRCP newsletterId and maps API metadata to message props', () => {
        const result = getInline1Variant(
            variant,
            toMap({ ...newsletter, identityName: 'another-newsletter', listId: 4149 }, newsletter),
        );

        expect(result).toEqual({
            ...variant,
            message: {
                ...variant.message,
                newsletterName: 'The Stakes',
                newsletterListId: 6069,
                frequency: 'Weekly',
                imageUrl: 'https://example.com/stakes.png',
            },
        });
        expect(inline1VariantSchema.parse(result)).toEqual(result);
        expect(variant.message).not.toHaveProperty('newsletterListId');
        expect(logError).not.toHaveBeenCalled();
    });

    it('uses the latest cache values rather than previously configured metadata', () => {
        const enriched = getInline1Variant(variant, toMap(newsletter));
        assert(enriched);
        const result = getInline1Variant(
            enriched,
            toMap({
                ...newsletter,
                name: 'Updated name',
                listId: 123,
                frequency: 'Daily',
                illustrationSquare: 'https://example.com/new.png',
            }),
        );

        expect(result?.message).toMatchObject({
            newsletterName: 'Updated name',
            newsletterListId: 123,
            frequency: 'Daily',
            imageUrl: 'https://example.com/new.png',
        });
    });

    it.each([undefined, null])(
        'uses the card illustration when the square image is %s',
        (image) => {
            const enriched = getInline1Variant(variant, toMap(newsletter));
            assert(enriched);

            for (const input of [variant, enriched]) {
                expect(
                    getInline1Variant(input, toMap({ ...newsletter, illustrationSquare: image }))
                        ?.message,
                ).toMatchObject({ imageUrl: newsletter.illustrationCard });
            }
        },
    );

    it.each([undefined, null])(
        'clears a previous message image when both API images are absent and the square image is %s',
        (image) => {
            const enriched = getInline1Variant(variant, toMap(newsletter));
            assert(enriched);
            const result = getInline1Variant(
                enriched,
                toMap({ ...newsletter, illustrationSquare: image, illustrationCard: undefined }),
            );

            expect(result?.message).toMatchObject({
                newsletterListId: 6069,
                imageUrl: undefined,
            });
            expect(inline1VariantSchema.safeParse(result).success).toBe(true);
        },
    );

    it('leaves the image unset when both API illustrations are absent', () => {
        const result = getInline1Variant(
            variant,
            toMap({ ...newsletter, illustrationSquare: undefined, illustrationCard: undefined }),
        );

        expect(result?.message).toMatchObject({ newsletterListId: 6069, imageUrl: undefined });
        expect(inline1VariantSchema.safeParse(result).success).toBe(true);
    });

    it.each([
        { newsletters: toMap() },
        { newsletters: toMap({ ...newsletter, identityName: 'another-newsletter' }) },
    ])(
        'returns null and logs an error when no matching newsletter is cached: case %#',
        ({ newsletters }) => {
            expect(getInline1Variant(variant, newsletters)).toBeNull();
            expect(logError).toHaveBeenCalledWith(
                'No cached newsletter found for Inline1 newsletterId: the-stakes',
            );
        },
    );

    it.each([
        { type: 'Inline1PuzzlesMessage' as const },
        {
            type: 'Inline1SupportMessage' as const,
            heading: 'Support us',
            body: 'Support independent journalism',
            primaryCta: { text: 'Support', baseUrl: 'https://support.theguardian.com' },
        },
    ])('leaves non-newsletter variants unchanged: %j', (message) => {
        const otherVariant = { name: 'control', message, bidScore: 0 as const };

        expect(getInline1Variant(otherVariant, toMap(newsletter))).toBe(otherVariant);
        expect(logError).not.toHaveBeenCalled();
    });
});

describe('inline1VariantSchema', () => {
    const variant: Inline1Variant = {
        name: 'control',
        message: { type: 'Inline1PuzzlesMessage' },
    };

    it('accepts a variant without a bidScore', () => {
        expect(inline1VariantSchema.parse(variant)).toEqual(variant);
    });

    it.each([0, 0.5, 1])('preserves a bidScore of %s', (bidScore) => {
        const input = { ...variant, bidScore };
        expect(inline1VariantSchema.parse(input)).toEqual(input);
    });

    it.each([-1, '1', null])('rejects invalid bidScore %s', (bidScore) => {
        expect(inline1VariantSchema.safeParse({ ...variant, bidScore }).success).toBe(false);
    });
});
