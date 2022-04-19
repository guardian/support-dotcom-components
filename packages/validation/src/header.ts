import { z } from 'zod';

const pageTrackingSchema = z.object({
    ophanPageId: z.string(),
    platformId: z.string(),
    referrerUrl: z.string(),
    clientName: z.string(),
});

const editionSchema = z.union([
    z.literal('UK'),
    z.literal('US'),
    z.literal('AU'),
    z.literal('INT'),
]);

const headerTargetingSchema = z.object({
    showSupportMessaging: z.boolean(),
    edition: editionSchema,
    countryCode: z.string(),
    modulesVersion: z.string().optional(),
    mvtId: z.number(),
    lastOneOffContributionDate: z.string().optional(),
    numArticles: z.number().optional(),
});

export const headerPayloadSchema = z.object({
    tracking: pageTrackingSchema,
    targeting: headerTargetingSchema,
});
