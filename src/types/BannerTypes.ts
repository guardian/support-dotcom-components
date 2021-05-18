import * as z from 'zod';
import {
    OphanProduct,
    OphanComponentType,
    OphanComponentEvent,
    ophanComponentTypeSchema,
    ophanProductSchema,
} from './OphanTypes';
import { CountryGroupId } from '../lib/geolocation';
import {
    ArticlesViewedSettings,
    Audience,
    Cta,
    Test,
    TickerSettings,
    Variant,
    WeeklyArticleHistory,
    ControlProportionSettings,
    ctaSchema,
    tickerSettingsSchema,
} from './shared';

export type BannerTargeting = {
    alreadyVisitedCount: number;
    shouldHideReaderRevenue?: boolean;
    isPaidContent?: boolean;
    showSupportMessaging: boolean;
    engagementBannerLastClosedAt?: string;
    subscriptionBannerLastClosedAt?: string;
    mvtId: number;
    countryCode: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    hasOptedOutOfArticleCount: boolean;
    modulesVersion?: string;
};

export type BannerTestTracking = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    componentType: OphanComponentType;
    products?: OphanProduct[];
};

export type BannerPageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

export type BannerTracking = BannerTestTracking & BannerPageTracking;

const bannerTrackingSchema = z.object({
    abTestName: z.string(),
    abTestVariant: z.string(),
    campaignCode: z.string(),
    componentType: ophanComponentTypeSchema,
    products: z.array(ophanProductSchema).optional(),
    ophanPageId: z.string(),
    platformId: z.string(),
    referrerUrl: z.string(),
    clientName: z.string(),
});

export type BannerDataRequestPayload = {
    tracking: BannerPageTracking;
    targeting: BannerTargeting;
};

export interface BannerContent {
    heading?: string;
    messageText: string;
    mobileMessageText?: string; // deprecated - use mobileBannerContent instead
    highlightedText?: string;
    cta?: Cta;
    secondaryCta?: Cta;
}

const bannerContentSchema = z.object({
    heading: z.string().optional(),
    messageText: z.string(),
    mobileMessageText: z.string().optional(),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
});

export enum BannerTemplate {
    ContributionsBanner = 'ContributionsBanner',
    DigitalSubscriptionsBanner = 'DigitalSubscriptionsBanner',
    GuardianWeeklyBanner = 'GuardianWeeklyBanner',
    G200Banner = 'G200Banner',
}

export interface BannerVariant extends Variant {
    name: string;
    tickerSettings?: TickerSettings;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
    bannerContent?: BannerContent;
    mobileBannerContent?: BannerContent;
    componentType: OphanComponentType;
    products?: OphanProduct[];
}

export type BannerChannel = 'contributions' | 'subscriptions';

export const bannerChannelSchema = z.enum(['contributions', 'subscriptions']);

export type CanRun = (targeting: BannerTargeting, pageTracking: BannerPageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

export interface BannerTest extends Test<BannerVariant> {
    name: string;
    bannerChannel: BannerChannel;
    testAudience: Audience;
    canRun: CanRun;
    minPageViews: number;
    variants: BannerVariant[];
    locations?: CountryGroupId[];
    articlesViewedSettings?: ArticlesViewedSettings;
    audienceOffset?: number;
    audience?: number;
    controlProportionSettings?: ControlProportionSettings;
}

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleUrl: string;
    moduleName: string;
}

export interface BannerProps {
    tracking: BannerTracking;
    bannerChannel: BannerChannel;
    content?: BannerContent;
    mobileContent?: BannerContent;
    countryCode?: string;
    isSupporter?: boolean;
    tickerSettings?: TickerSettings;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
    hasOptedOutOfArticleCount?: boolean;
}

export const bannerSchema = z.object({
    tracking: bannerTrackingSchema,
    bannerChannel: bannerChannelSchema,
    content: bannerContentSchema.optional(),
    mobileContent: bannerContentSchema.optional(),
    countryCode: z.string().optional(),
    isSupporter: z.boolean().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
    hasOptedOutOfArticleCount: z.boolean().optional(),
});

export interface PuzzlesBannerProps extends Partial<BannerProps> {
    tracking: BannerTracking;
}

export interface RawVariantParams {
    name: string;
    template: BannerTemplate;
    bannerContent: BannerContent;
    mobileBannerContent?: BannerContent;

    // deprecated - use bannerContent
    body: string;
    heading?: string;
    highlightedText?: string;
    cta?: Cta;
    secondaryCta?: Cta;
}

export interface RawTestParams {
    name: string;
    nickname: string;
    isOn: boolean;
    minArticlesBeforeShowingBanner: number;
    userCohort: Audience;
    locations: CountryGroupId[];
    variants: RawVariantParams[];
    articlesViewedSettings?: ArticlesViewedSettings;
    controlProportionSettings?: ControlProportionSettings;
}
