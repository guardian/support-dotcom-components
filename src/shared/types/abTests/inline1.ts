import { z } from 'zod';
import { targetedRegionsSchema } from '../../lib';
import { inline1VariantSchema } from '../props';
import {
    articlesViewedSettingsSchema,
    maxViewsSchema,
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
    alwaysAsk: z.boolean(),
    maxViews: maxViewsSchema.optional(),
    useLocalViewLog: z.boolean(),
});
export type Inline1TestFromTool = z.infer<typeof inline1TestFromToolSchema>;

export type Inline1Variant = z.infer<typeof inline1VariantSchema>;

export interface Inline1Test extends Inline1TestFromTool {
    variants: Inline1Variant[];
}
