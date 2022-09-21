import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { z } from 'zod';
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
    email?: string;
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
    type: z.string(),
    copy: z.string().optional(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

const variantSchema = z.object({
    name: z.string(),
    heading: z
        .string()
        .nullable()
        .optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z
        .string()
        .nullable()
        .optional(),
    tickerSettings: tickerSettingsSchema.nullable().optional(),
    cta: ctaSchema.nullable().optional(),
    secondaryCta: secondaryCtaSchema.nullable().optional(),
    footer: z
        .string()
        .nullable()
        .optional(),
    image: imageSchema.nullable().optional(),
    showReminderFields: reminderFieldsSchema.nullable().optional(),
    separateArticleCount: separateArticleCountSchema.nullable().optional(),
    maxViews: maxViewsSchema.nullable().optional(),
    showSignInLink: z
        .boolean()
        .nullable()
        .optional(),
    bylineWithImage: bylineWithImageSchema.nullable().optional(),
});

export const epicPropsSchema = z.object({
    variant: variantSchema,
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    articleCounts: articleCountsSchema,
    onReminderOpen: z.any().optional(),
    email: z.string().optional(),
    fetchEmail: z.any().optional(),
    submitComponentEvent: z.any().optional(),
    openCmp: z.any().optional(),
    hasConsentForArticleCount: z.boolean().optional(),
    stage: z.string().optional(),
});
