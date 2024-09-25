import {
    ContributionFrequency,
    SecondaryCta,
    secondaryCtaSchema,
    contributionFrequencySchema,
    ctaSchema,
    testSchema,
    tickerSettingsSchema,
} from '../../../shared/types';
import { AMPTicker } from './ampTicker';
import { z } from 'zod';

import { countryGroupIdSchema } from '../../../shared/lib';

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
    secondaryCta?: SecondaryCta;
    ticker?: AMPTicker;
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
    secondaryCta: secondaryCtaSchema.optional(),
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
