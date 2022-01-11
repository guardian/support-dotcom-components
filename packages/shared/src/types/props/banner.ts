import {
    ctaSchema,
    secondaryCtaSchema,
    TickerSettings,
    tickerSettingsSchema,
    Tracking,
    trackingSchema,
} from './shared';
import { OphanComponentEvent } from '../ophan';
import * as z from 'zod';
import { BannerContent } from '../tests/banner';

export const bannerChannelSchema = z.enum(['contributions', 'subscriptions']);

export type BannerChannel = z.infer<typeof bannerChannelSchema>;

const bannerContentSchema = z.object({
    heading: z.string().optional(),
    messageText: z.string(),
    mobileMessageText: z.string().optional(),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
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
}

export const bannerSchema = z.object({
    tracking: trackingSchema,
    bannerChannel: bannerChannelSchema,
    content: bannerContentSchema.optional(),
    mobileContent: bannerContentSchema.optional(),
    countryCode: z.string().optional(),
    isSupporter: z.boolean().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
    hasOptedOutOfArticleCount: z.boolean().optional(),
    email: z.string().optional(),
    fetchEmail: z.any().optional(),
});

export interface PuzzlesBannerProps extends Partial<BannerProps> {
    tracking: Tracking;
}
