import {
    ArticleCounts,
    articleCountsSchema,
    Cta,
    ctaSchema,
    SecondaryCta,
    secondaryCtaSchema,
    SeparateArticleCount,
    TickerSettings,
    tickerSettingsSchema,
    Tracking,
    trackingSchema,
} from './shared';
import { z } from 'zod';
import { Prices } from '../prices';
import { SelectedAmountsVariant } from '../abTests';
import { ConfigurableDesign, configurableDesignSchema } from './design';
import { AbandonedBasket } from '../targeting';
import { OphanComponentEvent } from '@guardian/libs';

export const bannerChannelSchema = z.enum([
    'contributions',
    'subscriptions',
    'signIn',
    'abandonedBasket',
]);

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

export const bannerContentSchema = z.object({
    heading: z.string().optional(),
    messageText: z.string().optional(),
    paragraphs: z.array(z.string()).optional(),
    mobileMessageText: z.string().optional(),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
});

export interface BannerProps {
    tracking: Tracking;
    // bannerChannel is distinct from the channel defined by RRCP
    bannerChannel: BannerChannel;
    content?: BannerContent;
    mobileContent?: BannerContent;
    countryCode?: string;
    isSupporter?: boolean;
    tickerSettings?: TickerSettings;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    articleCounts: ArticleCounts;
    hasOptedOutOfArticleCount?: boolean;
    fetchEmail?: () => Promise<string | null>;
    separateArticleCount?: boolean;
    separateArticleCountSettings?: SeparateArticleCount;
    prices?: Prices;
    choiceCardAmounts?: SelectedAmountsVariant;
    design?: ConfigurableDesign;
    abandonedBasket?: AbandonedBasket;
}

export const bannerSchema = z.object({
    tracking: trackingSchema,
    bannerChannel: bannerChannelSchema,
    content: bannerContentSchema.nullish(),
    mobileContent: bannerContentSchema.nullish(),
    countryCode: z.string().nullish(),
    isSupporter: z.boolean().nullish(),
    tickerSettings: tickerSettingsSchema.nullish(),
    submitComponentEvent: z.any(),
    articleCounts: articleCountsSchema,
    hasOptedOutOfArticleCount: z.boolean().nullish(),
    fetchEmail: z.any().nullish(),
    separateArticleCount: z.boolean().nullish(),
    design: configurableDesignSchema.nullish(),
});
