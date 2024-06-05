import { JSX } from '@emotion/react/jsx-runtime';
import {
    articleCountsSchema,
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
import { SelectedAmountsVariant } from '../abTests';
import { ConfigurableDesign, configurableDesignSchema } from './design';
import { AbandonedBasket } from '../targeting';
import { ArticleCounts, ArticleCountType } from "./epic";

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

export interface BannerProps extends JSX.IntrinsicAttributes {
    tracking: Tracking;
    bannerChannel: BannerChannel;
    content?: BannerContent;
    mobileContent?: BannerContent;
    countryCode?: string;
    isSupporter?: boolean;
    tickerSettings?: TickerSettings;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
    articleCounts: ArticleCounts;
    countType?: ArticleCountType;
    hasOptedOutOfArticleCount?: boolean;
    fetchEmail?: () => Promise<string | null>;
    separateArticleCount?: boolean;
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
    numArticles: z.number().nullish(),
    articleCounts: articleCountsSchema,
    hasOptedOutOfArticleCount: z.boolean().nullish(),
    fetchEmail: z.any().nullish(),
    separateArticleCount: z.boolean().nullish(),
    design: configurableDesignSchema.nullish(),
});
