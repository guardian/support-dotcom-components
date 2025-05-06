import type { OphanComponentEvent } from '@guardian/libs';
import { z } from 'zod';
import type { EpicVariant } from '../abTests';
import { choiceCardsSettings } from './choiceCards';
import type { ArticleCounts, Stage, Tracking } from './shared';
import {
    articleCountsSchema,
    bylineWithImageSchema,
    ctaSchema,
    imageSchema,
    secondaryCtaSchema,
    separateArticleCountSchema,
    tickerSettingsSchema,
    trackingSchema,
} from './shared';

export interface EpicProps {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    articleCounts: ArticleCounts;
    onReminderOpen?: () => void;
    fetchEmail?: () => Promise<string | null>;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
    stage?: Stage;
}

/**
 * Props validation
 */

const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

export const contributionFrequencySchema = z.enum(['ONE_OFF', 'MONTHLY', 'ANNUAL']);

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

const newsletterSignupSchema = z.object({
    newsletterId: z.string(),
    successDescription: z.string(),
});

export const variantSchema = z.object({
    name: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
    newsletterSignup: newsletterSignupSchema.optional(),
    image: imageSchema.optional(),
    showReminderFields: reminderFieldsSchema.optional(),
    separateArticleCount: separateArticleCountSchema.optional(),
    maxViews: maxViewsSchema.optional(),
    showSignInLink: z.boolean().optional(),
    bylineWithImage: bylineWithImageSchema.optional(),
    showChoiceCards: z.boolean().optional(),
    choiceCardsSettings: choiceCardsSettings.nullish(),
    choiceCardAmounts: selectedAmountsVariantSchema.optional(), // deprecated, use choiceCardsSettings
    defaultChoiceCardFrequency: contributionFrequencySchema.optional(), // deprecated, use choiceCardsSettings
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
