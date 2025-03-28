import { z } from 'zod';
import { countryGroupIdSchema, targetedRegionsSchema } from '../../lib';
import { headerContentSchema } from '../props';
import { purchaseInfoTestSchema, testSchema, userCohortSchema } from './shared';

/**
 * Models and schemas for data from the database
 */
const headerVariantFromToolSchema = z.object({
    name: z.string(),
    content: headerContentSchema,
    mobileContent: headerContentSchema.optional(),
});
export type HeaderVariantFromTool = z.infer<typeof headerVariantFromToolSchema>;

export const headerTestFromToolSchema = testSchema.extend({
    locations: z.array(countryGroupIdSchema).optional(), //deprecated
    regionTargeting: targetedRegionsSchema.optional(),
    userCohort: userCohortSchema,
    purchaseInfo: purchaseInfoTestSchema.optional(),
    variants: z.array(headerVariantFromToolSchema),
});
export type HeaderTestFromTool = z.infer<typeof headerTestFromToolSchema>;

/**
 * Models with additional properties determined by the server
 */
export interface HeaderVariant extends HeaderVariantFromTool {
    moduleName?: string;
}

export interface HeaderTest extends HeaderTestFromTool {
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    moduleName: string;
}
