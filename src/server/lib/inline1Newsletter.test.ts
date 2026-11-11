import type { Inline1Variant } from '../../shared/types';
import { inline1VariantSchema } from '../../shared/types/props/inline1';
import { logWarn } from '../utils/logging';
import { getInline1Variant } from './inline1Newsletter';

jest.mock('../utils/logging', () => ({
    logWarn: jest.fn(),
}));

describe('getInline1Variant', () => {
    const variant: Inline1Variant = {
        name: 'newsletter',
        message: {
            type: 'Inline1NewsletterMessage',
            newsletterId: 'the-stakes',
            heading: 'Sign up for The Stakes',
            body: 'Get the latest news.',
        },
    };
    const newsletter = {
        identityName: 'the-stakes',
        name: 'The Stakes',
        listId: 6069,
        frequency: 'Weekly',
        illustrationSquare: 'https://example.com/stakes.png',
        illustrationCard: 'https://example.com/stakes-card.png',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches identityName to the RRCP newsletterId and maps API metadata to message props', () => {
        const result = getInline1Variant(variant, [
            { ...newsletter, identityName: 'another-newsletter', listId: 4149 },
            newsletter,
        ]);

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
        expect(logWarn).not.toHaveBeenCalled();
    });

    it('uses the latest cache values rather than previously configured metadata', () => {
        const enriched = getInline1Variant(variant, [newsletter]);
        const result = getInline1Variant(enriched, [
            {
                ...newsletter,
                name: 'Updated name',
                listId: 123,
                frequency: 'Daily',
                illustrationSquare: 'https://example.com/new.png',
            },
        ]);

        expect(result.message).toMatchObject({
            newsletterName: 'Updated name',
            newsletterListId: 123,
            frequency: 'Daily',
            imageUrl: 'https://example.com/new.png',
        });
    });

    it.each([undefined, null])(
        'uses the card illustration when the square image is %s',
        (image) => {
            const enriched = getInline1Variant(variant, [newsletter]);

            for (const input of [variant, enriched]) {
                expect(
                    getInline1Variant(input, [{ ...newsletter, illustrationSquare: image }])
                        .message,
                ).toMatchObject({ imageUrl: newsletter.illustrationCard });
            }
        },
    );

    it.each([undefined, null])(
        'clears a previous message image when both API images are absent and the square image is %s',
        (image) => {
            const enriched = getInline1Variant(variant, [newsletter]);
            const result = getInline1Variant(enriched, [
                { ...newsletter, illustrationSquare: image, illustrationCard: undefined },
            ]);

            expect(result.message).toMatchObject({
                newsletterListId: 6069,
                imageUrl: undefined,
            });
            expect(inline1VariantSchema.safeParse(result).success).toBe(true);
        },
    );

    it('leaves the image unset when both API illustrations are absent', () => {
        const result = getInline1Variant(variant, [
            { ...newsletter, illustrationSquare: undefined, illustrationCard: undefined },
        ]);

        expect(result.message).toMatchObject({ newsletterListId: 6069, imageUrl: undefined });
        expect(inline1VariantSchema.safeParse(result).success).toBe(true);
    });

    it.each([
        { newsletters: [] },
        { newsletters: [{ ...newsletter, identityName: 'another-newsletter' }] },
    ])(
        'preserves the configured variant and logs when no matching newsletter is cached: %j',
        ({ newsletters }) => {
            expect(getInline1Variant(variant, newsletters)).toBe(variant);
            expect(logWarn).toHaveBeenCalledWith(
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
        const otherVariant = { name: 'control', message };

        expect(getInline1Variant(otherVariant, [newsletter])).toBe(otherVariant);
        expect(logWarn).not.toHaveBeenCalled();
    });
});
