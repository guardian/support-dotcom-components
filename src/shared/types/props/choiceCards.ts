import { z } from 'zod';
import { hexColourSchema } from './index';

const productBenefitSchema = z.object({
    copy: z.string(),
});

const productSchema = z.discriminatedUnion('supportTier', [
    z.object({
        supportTier: z.union([z.literal('Contribution'), z.literal('SupporterPlus')]),
        ratePlan: z.union([z.literal('Monthly'), z.literal('Annual')])
    }),
    z.object({
        supportTier: z.literal('OneOff'),
    }),
]);

// type Product = z.infer<typeof productSchema>;

const pillSchema = z.object({
    copy: z.string(),   // e.g. "Recommended", may be overridden if a promo applies
    backgroundColour: hexColourSchema.nullish(),
});

const choiceCardSchema = z.object({
    product: productSchema,
    label: z.string(),                      // e.g. "Support $15/month"
    isDefault: z.boolean(),                 // default selected choice card
    benefitsLabel: z.string().nullish(),    // e.g. "Unlock All-access digital benefits:"
    benefits: z.array(productBenefitSchema),
    pill: pillSchema.nullish(),
});

// The model returned to the client
export const choiceCardsSettings = z.object({
    choiceCards: z.array(choiceCardSchema),
    mobileChoiceCards: z.array(choiceCardSchema).nullish(), // optional mobile-specific cards
});

export type ChoiceCardsSettings = z.infer<typeof choiceCardsSettings>;

// The model from the RRCP config. TODO - remove the label field
export const choiceCardsSettingsFromTool = z.discriminatedUnion('type', [
    z.object({ type: z.literal('NoChoiceCards') }),
    z.object({ type: z.literal('DefaultChoiceCards') }),
    z.object({
        type: z.literal('CustomChoiceCards'),
        ...choiceCardsSettings.shape,
    }),
]);
