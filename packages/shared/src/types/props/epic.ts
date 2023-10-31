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
    type: z.string(),
    copy: z.string().nullish(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

const variantSchema = z.object({
    name: z.string(),
    heading: z.string().nullish(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().nullish(),
    tickerSettings: tickerSettingsSchema.nullish(),
    cta: ctaSchema.nullish(),
    secondaryCta: secondaryCtaSchema.nullish(),
    footer: z.string().nullish(),
    image: imageSchema.nullish(),
    showReminderFields: reminderFieldsSchema.nullish(),
    separateArticleCount: separateArticleCountSchema.nullish(),
    maxViews: maxViewsSchema.nullish(),
    showSignInLink: z.boolean().nullish(),
    bylineWithImage: bylineWithImageSchema.nullish(),
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
