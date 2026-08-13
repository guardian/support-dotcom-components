import { z } from 'zod';
import { countryGroupIdSchema, targetedRegionsSchema } from '../../lib';
import { variantSchema } from '../props';
import type { EpicTargeting } from '../targeting';
import {
    articlesViewedSettingsSchema,
    testSchema,
    testStatusSchema,
    userCohortSchema,
} from './shared';

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

export type MaxViews = z.infer<typeof maxViewsSchema>;

// for validation from DynamoDB
export type EpicTestFromTool = z.infer<typeof epicTestFromToolSchema>;

// with additional properties determined by the server
export interface EpicTest extends EpicTestFromTool {
    hasArticleCountInCopy: boolean;
    isSuperMode?: boolean;
    canShow?: (targeting: EpicTargeting) => boolean;

    // specific to hardcoded tests
    campaignId?: string;
    expiry?: string;
}

export const epicTestFromToolSchema = testSchema.extend({
    name: z.string(),
    status: testStatusSchema,
    locations: z.array(countryGroupIdSchema).optional(), //deprecated
    regionTargeting: targetedRegionsSchema.optional(),
    tagIds: z.array(z.string()),
    sections: z.array(z.string()),
    excludedTagIds: z.array(z.string()),
    excludedSections: z.array(z.string()),
    alwaysAsk: z.boolean(),
    maxViews: maxViewsSchema.optional(),
    userCohort: userCohortSchema,
    hasCountryName: z.boolean(),
    highPriority: z.boolean(),
    useLocalViewLog: z.boolean(),
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
    priority: z.number(),
    variants: variantSchema.array(),
});

export type EpicVariant = z.infer<typeof variantSchema>;
