import { z } from 'zod';
import { hexColourSchema } from './design';

const productBenefitSchema = z.object({
    copy: z.string(),
});

const ratePlanSchema = z.union([z.literal('Monthly'), z.literal('Annual')]);
export type RatePlan = z.infer<typeof ratePlanSchema>;

const productSchema = z.discriminatedUnion('supportTier', [
    z.object({
        supportTier: z.literal('Contribution'),
        ratePlan: ratePlanSchema,
    }),
    z.object({
        supportTier: z.literal('SupporterPlus'),
        ratePlan: ratePlanSchema,
    }),
    z.object({
        supportTier: z.literal('OneOff'),
    }),
]);

const pillSchema = z.object({
    copy: z.string(), // e.g. "Recommended", may be overridden if a promo applies
    // Pill colours are configurable for e.g. showing a different design on a discounted product
    textColour: hexColourSchema.nullish(),
    backgroundColour: hexColourSchema.nullish(),
});

const choiceCardSchema = z.object({
    product: productSchema,
    label: z.string(), // e.g. "Support $15/month"
    isDefault: z.boolean(), // default selected choice card
    benefitsLabel: z.string().nullish(), // e.g. "Unlock All-access digital benefits:"
    benefits: z.array(productBenefitSchema),
    pill: pillSchema.nullish(),
});

export type ChoiceCard = z.infer<typeof choiceCardSchema>;

export const choiceCardsSettings = z.object({
    choiceCards: z.array(choiceCardSchema),
    mobileChoiceCards: z.array(choiceCardSchema).nullish(), // optional mobile-specific cards
});

export type ChoiceCardsSettings = z.infer<typeof choiceCardsSettings>;
