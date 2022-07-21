import {
    Cta,
    ctaSchema,
    SecondaryCta,
    secondaryCtaSchema,
    TickerSettings,
    tickerSettingsSchema,
    Tracking,
    trackingSchema,
} from './shared';
import { OphanComponentEvent } from '../ophan';
import * as z from 'zod';
import { Prices } from '../prices';

export const bannerChannelSchema = z.enum(['contributions', 'subscriptions', 'signIn']);

export type BannerChannel = z.infer<typeof bannerChannelSchema>;

export interface BannerContent {
    heading?: string;
    messageText?: string;
    paragraphs?: string[];
    mobileMessageText?: string; // deprecated - use mobileBannerContent instead
    highlightedText?: string;
    cta?: Cta;
    secondaryCta?: SecondaryCta;
}

const bannerContentSchema = z.object({
    heading: z
        .string()
        .nullable()
        .optional(),
    messageText: z
        .string()
        .nullable()
        .optional(),
    paragraphs: z
        .array(z.string())
        .nullable()
        .optional(),
    mobileMessageText: z
        .string()
        .nullable()
        .optional(),
    highlightedText: z
        .string()
        .nullable()
        .optional(),
    cta: ctaSchema.nullable().optional(),
    secondaryCta: secondaryCtaSchema.nullable().optional(),
});

export interface BannerProps {
    tracking: Tracking;
    bannerChannel: BannerChannel;
    content?: BannerContent;
    mobileContent?: BannerContent;
    countryCode?: string;
    isSupporter?: boolean;
    tickerSettings?: TickerSettings;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
    hasOptedOutOfArticleCount?: boolean;
    email?: string;
    fetchEmail?: () => Promise<string | null>;
    separateArticleCount?: boolean;
    prices?: Prices;
}

export const bannerSchema = z.object({
    tracking: trackingSchema,
    bannerChannel: bannerChannelSchema,
    content: bannerContentSchema.nullable().optional(),
    mobileContent: bannerContentSchema.nullable().optional(),
    countryCode: z.string().optional(),
    isSupporter: z.boolean().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
    hasOptedOutOfArticleCount: z.boolean().optional(),
    email: z.string().optional(),
    fetchEmail: z.any().optional(),
    separateArticleCount: z
        .boolean()
        .nullable()
        .optional(),
});

export interface PuzzlesBannerProps extends Partial<BannerProps> {
    tracking: Tracking;
}
