import { z } from 'zod';
import type { TestTracking } from '../abTests';

export type Stage = 'PROD' | 'CODE' | 'DEV';

export interface Cta {
    text: string;
    baseUrl: string;
}

export const ctaSchema = z.object({
    text: z.string(),
    baseUrl: z.string(),
});

export enum SecondaryCtaType {
    Custom = 'CustomSecondaryCta',
    ContributionsReminder = 'ContributionsReminderSecondaryCta',
}

export const secondaryCtaTypeSchema = z.nativeEnum(SecondaryCtaType);

interface CustomSecondaryCta {
    type: SecondaryCtaType.Custom;
    cta: Cta;
}

export const customSecondaryCtaSchema = z.object({
    type: z.literal(SecondaryCtaType.Custom),
    cta: ctaSchema,
});

interface ContributionsReminderSecondaryCta {
    type: SecondaryCtaType.ContributionsReminder;
}

export const contributionsReminderSecondaryCtaSchema = z.object({
    type: z.literal(SecondaryCtaType.ContributionsReminder),
});

export type SecondaryCta = CustomSecondaryCta | ContributionsReminderSecondaryCta;

export const secondaryCtaSchema = z.discriminatedUnion('type', [
    customSecondaryCtaSchema,
    contributionsReminderSecondaryCtaSchema,
]);

interface TickerCopy {
    countLabel: string;
}

export const tickerCopySchema = z.object({
    countLabel: z.string(),
});

export interface TickerData {
    total: number;
    goal: number;
}

export const tickerDataSchema = z.object({
    total: z.number(),
    goal: z.number(),
});

// Corresponds to .json file names in S3
export type TickerName = 'US' | 'AU' | 'global';

const tickerNameSchema = z.enum(['US', 'AU', 'global']);

export interface TickerSettings {
    currencySymbol: string;
    copy: TickerCopy;
    name: TickerName;
    tickerData?: TickerData;
}

export const tickerSettingsSchema = z.object({
    currencySymbol: z.string(),
    copy: tickerCopySchema,
    name: tickerNameSchema,
    tickerData: tickerDataSchema.optional(),
});

export const articleCountsSchema = z.object({
    for52Weeks: z.number(),
    forTargetedWeeks: z.number(),
});

export type ArticleCountType =
    | 'for52Weeks' // The user's total article view count, which currently goes back as far as 52 weeks
    | 'forTargetedWeeks'; // The user's article view count for the configured periodInWeeks/tag

const articleCountTypeSchema = z.enum(['for52Weeks', 'forTargetedWeeks']);

export type ArticleCounts = Record<ArticleCountType, number>;

export const separateArticleCountSchema = z.object({
    type: z.literal('above'),
    copy: z.string().optional(),
    countType: articleCountTypeSchema.optional(), // defaults to forTargetedWeeks
});

export interface SeparateArticleCount {
    type: 'above';
    copy?: string;
    countType?: ArticleCountType;
}

export const ophanProductSchema = z.enum([
    'CONTRIBUTION',
    'MEMBERSHIP_SUPPORTER',
    'DIGITAL_SUBSCRIPTION',
    'PRINT_SUBSCRIPTION',
]);

export const ophanComponentTypeSchema = z.enum([
    'ACQUISITIONS_EPIC',
    'ACQUISITIONS_ENGAGEMENT_BANNER',
    'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    'ACQUISITIONS_HEADER',
    'ACQUISITIONS_OTHER',
]);

export type PageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
};

export type Tracking = TestTracking & PageTracking;

export const trackingSchema = z.object({
    abTestName: z.string(),
    abTestVariant: z.string(),
    campaignCode: z.string(),
    componentType: ophanComponentTypeSchema,
    products: z.array(ophanProductSchema).nullish(),
    labels: z.array(z.string()).nullish(),
    // These fields are provided by the client
    ophanPageId: z.string(),
    platformId: z.string(),
    referrerUrl: z.string(),
});

export interface Image {
    mainUrl: string;
    mobileUrl?: string;
    tabletUrl?: string;
    desktopUrl?: string;
    leftColUrl?: string;
    wideUrl?: string;
    altText: string;
}

export const imageSchema = z.object({
    mainUrl: z.string(),
    mobileUrl: z.string().optional(),
    tabletUrl: z.string().optional(),
    desktopUrl: z.string().optional(),
    leftColUrl: z.string().optional(),
    wideUrl: z.string().optional(),
    altText: z.string(),
});

export interface BylineWithImage {
    name: string;
    description?: string;
    headshot?: Image;
}

export const bylineWithImageSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    headshot: imageSchema.optional(),
});
