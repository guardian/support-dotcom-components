import { ContributionFrequency, TickerSettings } from '@sdc/shared/types';
import * as z from 'zod';
import {
    contributionFrequencySchema,
    ctaSchema,
    testSchema,
    tickerSettingsSchema,
} from '@sdc/shared/dist/types';
import { countryGroupIdSchema } from '@sdc/shared/dist/lib';

/**
 * Models for the data returned to AMP
 */
export interface AMPCta {
    text: string;
    url: string;
    componentId: string;
    campaignCode: string;
}

export interface AMPEpic {
    testName: string;
    variantName: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: AMPCta;
    ticker?: TickerSettings;
    showChoiceCards?: boolean;
    defaultChoiceCardFrequency?: ContributionFrequency;
}

/**
 * Models for the data published by the epic tool
 */
const ampEpicTestVariantSchema = z.object({
    name: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    showChoiceCards: z.boolean().optional(),
    defaultChoiceCardFrequency: contributionFrequencySchema.optional(),
});

export const ampEpicTestSchema = testSchema.extend({
    nickname: z.string().optional(),
    locations: z.array(countryGroupIdSchema),
    variants: z.array(ampEpicTestVariantSchema),
});

export type AmpEpicTest = z.infer<typeof ampEpicTestSchema>;
