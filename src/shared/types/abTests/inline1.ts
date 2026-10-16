import { z } from 'zod';
import { targetedRegionsSchema } from '../../lib';
import {
    pageContextTargetingSchema,
    testSchema,
    testStatusSchema,
    userCohortSchema,
} from './shared';

const inline1VariantFromToolSchema = z.object({
    name: z.string(),
});
export type Inline1VariantFromTool = z.infer<typeof inline1VariantFromToolSchema>;

export const inline1TestFromToolSchema = testSchema.extend({
    name: z.string(),
    status: testStatusSchema,
    regionTargeting: targetedRegionsSchema.optional(),
    userCohort: userCohortSchema,
    contextTargeting: pageContextTargetingSchema,
    priority: z.number(),
    variants: z.array(inline1VariantFromToolSchema),
});
export type Inline1TestFromTool = z.infer<typeof inline1TestFromToolSchema>;

export interface Inline1Variant extends Inline1VariantFromTool {
    moduleName?: string;
}

export interface Inline1Test extends Inline1TestFromTool {
    variants: Inline1Variant[];
}

export interface Inline1TestSelection {
    test: Inline1Test;
    variant: Inline1Variant;
    moduleName: string;
}
