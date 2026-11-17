import type { z } from 'zod';
import { targetedRegionsSchema } from '../../lib';
import type { Inline1Message } from '../props';
import { inline1VariantSchema } from '../props';
import type { Variant } from './shared';
import {
    articlesViewedSettingsSchema,
    pageContextTargetingSchema,
    testSchema,
    userCohortSchema,
} from './shared';

export const inline1TestFromToolSchema = testSchema.extend({
    regionTargeting: targetedRegionsSchema.optional(),
    userCohort: userCohortSchema,
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
    contextTargeting: pageContextTargetingSchema,
    variants: inline1VariantSchema.array(),
});
export type Inline1TestFromTool = z.infer<typeof inline1TestFromToolSchema>;

export interface Inline1Variant extends Variant {
    message: Inline1Message;
    bidScore?: number;
}

export interface Inline1Test extends Inline1TestFromTool {
    variants: Inline1Variant[];
}
