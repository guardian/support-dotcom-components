import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import z from 'zod';
import type { Inline1Variant } from '../abTests';
import { ctaSchema, imageSchema, type Tracking, trackingSchema } from './shared';

export interface Inline1Props {
    variant: Inline1Variant;
    tracking: Tracking;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: ComponentEvent) => Promise<void>;
}

export const inline1SupportMessageSchema = z.object({
    type: z.literal('Inline1SupportMessage'),
    heading: z.string(),
    body: z.string(),
    primaryCta: ctaSchema,
    image: imageSchema.optional(),
});

export const inline1PuzzlesMessageSchema = z.object({
    type: z.literal('Inline1PuzzlesMessage'),
});

export const inline1NewsletterMessageSchema = z.object({
    type: z.literal('Inline1NewsletterMessage'),
    newsletterId: z.string(),
    frequency: z.string(),
    heading: z.string(),
    body: z.string(),
    imageUrl: z.string().optional(),
});

export const inline1MessageSchema = z.discriminatedUnion('type', [
    inline1SupportMessageSchema,
    inline1PuzzlesMessageSchema,
    inline1NewsletterMessageSchema,
]);

export const inline1VariantSchema = z.object({
    name: z.string(),
    message: inline1MessageSchema,
});

export const inline1PropsSchema = z.object({
    variant: inline1VariantSchema,
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
});
