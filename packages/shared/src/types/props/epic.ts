import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import * as z from 'zod';
import {
    bylineWithImageSchema,
    ctaSchema,
    imageSchema,
    secondaryCtaSchema,
    Stage,
    tickerSettingsSchema,
    Tracking,
    trackingSchema,
} from './shared';
import { OphanComponentEvent } from '../ophan';
import { EpicVariant } from '../abTests';

export type ArticleCountType =
    | 'for52Weeks' // The user's total article view count, which currently goes back as far as 52 weeks
    | 'forTargetedWeeks'; // The user's article view count for the configured periodInWeeks/tag

export type ArticleCounts = {
    [type in ArticleCountType]: number;
};

export interface EpicProps extends EmotionJSX.IntrinsicAttributes {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    articleCounts: ArticleCounts;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    fetchEmail?: () => Promise<string | null>;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
    stage?: Stage;
}

/**
 * Props validation
 */
const articleCountsSchema = z.object({
    for52Weeks: z.number(),
    forTargetedWeeks: z.number(),
});

const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

const separateArticleCountSchema = z.object({
    type: z.literal('above'),
    copy: z.string().optional(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

const contributionFrequencySchema = z.enum(['ONE_OFF', 'MONTHLY', 'ANNUAL']);

const selectedAmountsVariantSchema = z.object({
    testName: z.string(),
    variantName: z.string(),
    defaultContributionType: contributionFrequencySchema,
    displayContributionType: contributionFrequencySchema.array(),
    amountsCardData: z.object({
        ONE_OFF: z.object({
            amounts: z.array(z.number()),
            defaultAmount: z.number(),
            hideChooseYourAmount: z.boolean().optional(),
        }),
        MONTHLY: z.object({
            amounts: z.array(z.number()),
            defaultAmount: z.number(),
            hideChooseYourAmount: z.boolean().optional(),
        }),
        ANNUAL: z.object({
            amounts: z.array(z.number()),
            defaultAmount: z.number(),
            hideChooseYourAmount: z.boolean().optional(),
        }),
    }),
});

export const variantSchema = z.object({
    name: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
    footer: z.string().optional(),
    image: imageSchema.optional(),
    showReminderFields: reminderFieldsSchema.optional(),
    separateArticleCount: separateArticleCountSchema.optional(),
    maxViews: maxViewsSchema.optional(),
    showSignInLink: z.boolean().optional(),
    bylineWithImage: bylineWithImageSchema.optional(),
    showChoiceCards: z.boolean().optional(),
    choiceCardAmounts: selectedAmountsVariantSchema.optional(),
    defaultChoiceCardFrequency: contributionFrequencySchema.optional(),
});

export const epicPropsSchema = z.object({
    variant: variantSchema,
    tracking: trackingSchema,
    countryCode: z.string().nullish(),
    articleCounts: articleCountsSchema,
    onReminderOpen: z.any().nullish(),
    fetchEmail: z.any().nullish(),
    submitComponentEvent: z.any().nullish(),
    openCmp: z.any().nullish(),
    hasConsentForArticleCount: z.boolean().nullish(),
    stage: z.string().nullish(),
});
