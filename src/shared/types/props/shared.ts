import { z } from 'zod';
import { TestTracking } from '../abTests';

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

export enum TickerEndType {
    unlimited = 'unlimited',
    hardstop = 'hardstop', // currently unsupported
}

export const tickerEndTypeSchema = z.nativeEnum(TickerEndType);

export enum TickerCountType {
    money = 'money',
}

export const tickerCountTypeSchema = z.nativeEnum(TickerCountType);

interface TickerCopy {
    countLabel: string;
    goalReachedPrimary?: string;
    goalReachedSecondary?: string;
}

export const tickerCopySchema = z.object({
    countLabel: z.string(),
    goalReachedPrimary: z.string().optional(),
    goalReachedSecondary: z.string().optional(),
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
export type TickerName = 'US' | 'AU';

const ticketNameSchema = z.enum(['US', 'AU']);

export interface TickerSettings {
    endType: TickerEndType;
    countType: TickerCountType;
    currencySymbol: string;
    copy: TickerCopy;
    name: TickerName;
    tickerData?: TickerData;
}

export const tickerSettingsSchema = z.object({
    endType: tickerEndTypeSchema,
    countType: tickerCountTypeSchema,
    currencySymbol: z.string(),
    copy: tickerCopySchema,
    name: ticketNameSchema,
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

export type ArticleCounts = {
    [type in ArticleCountType]: number;
};

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

export type Tracking = TestTracking;

export const trackingSchema = z.object({
    abTestName: z.string(),
    abTestVariant: z.string(),
    campaignCode: z.string(),
    componentType: ophanComponentTypeSchema,
    products: z.array(ophanProductSchema).nullish(),
    labels: z.array(z.string()).nullish(),
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
