import { PageTrackingSchema } from './shared';
import { z } from 'zod';

export const EditionSchema = z.union([
    z.literal('UK'),
    z.literal('US'),
    z.literal('AU'),
    z.literal('INT'),
]);

export type Edition = z.infer<typeof EditionSchema>;

export const HeaderTargetingSchema = z.object({
    showSupportMessaging: z.boolean(),
    edition: EditionSchema,
    countryCode: z.string(),
    modulesVersion: z.string().optional(),
    mvtId: z.number(),
    lastOneOffContributionDate: z.string().optional(),
    numArticles: z.number().optional(),
});

export type HeaderTargeting = z.infer<typeof HeaderTargetingSchema>;

export const HeaderPayloadSchema = z.object({
    tracking: PageTrackingSchema,
    targeting: HeaderTargetingSchema,
});

export type HeaderPayload = z.infer<typeof HeaderPayloadSchema>;
