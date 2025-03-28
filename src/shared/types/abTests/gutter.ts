import { z } from 'zod';
import { countryGroupIdSchema, targetedRegionsSchema } from '../../lib';
import { gutterContentSchema } from '../props';
import { pageContextTargetingSchema, testSchema, userCohortSchema } from './shared';

/**
 * Models and schemas for data from the database
 */
const gutterVariantFromToolSchema = z.object({
    name: z.string(),
    content: gutterContentSchema,
});
export type GutterVariantFromTool = z.infer<typeof gutterVariantFromToolSchema>;

export const gutterTestFromToolSchema = testSchema.extend({
    locations: z.array(countryGroupIdSchema).optional(),
    regionTargeting: targetedRegionsSchema.optional(),
    userCohort: userCohortSchema,
    contextTargeting: pageContextTargetingSchema,
    variants: z.array(gutterVariantFromToolSchema),
});
export type GutterTestFromTool = z.infer<typeof gutterTestFromToolSchema>;

/**
 * Models with additional properties determined by the server
 */
export interface GutterVariant extends GutterVariantFromTool {
    moduleName?: string;
}

export interface GutterTest extends GutterTestFromTool {
    variants: GutterVariant[];
}

export interface GutterTestSelection {
    test: GutterTest;
    variant: GutterVariant;
    moduleName: string;
}
