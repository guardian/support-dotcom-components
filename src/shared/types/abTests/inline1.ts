import type { z } from 'zod';
import { targetedRegionsSchema } from '../../lib';
import { inline1VariantSchema } from '../props';
import { pageContextTargetingSchema, testSchema, userCohortSchema } from './shared';

export const inline1TestFromToolSchema = testSchema.extend({
    regionTargeting: targetedRegionsSchema.optional(),
    userCohort: userCohortSchema,
    contextTargeting: pageContextTargetingSchema,
    variants: inline1VariantSchema.array(),
});
export type Inline1TestFromTool = z.infer<typeof inline1TestFromToolSchema>;

export type Inline1Variant = z.infer<typeof inline1VariantSchema>;

export interface Inline1Test extends Inline1TestFromTool {
    variants: Inline1Variant[];
}
