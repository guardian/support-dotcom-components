import * as z from 'zod';
import { OphanProduct, OphanComponentType, OphanComponentEvent } from './ophan';
import { CountryGroupId } from '../lib/geolocation';
import {
    ArticlesViewedSettings,
    UserCohort,
    Test,
    TickerSettings,
    Variant,
    WeeklyArticleHistory,
    ControlProportionSettings,
    ctaSchema,
    secondaryCtaSchema,
    tickerSettingsSchema,
    Cta,
    SecondaryCta,
    Tracking,
    PageTracking,
    trackingSchema,
} from './shared';
import { ChoiceCardAmounts } from './epic';

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

export type BannerDataRequestPayload = {
    tracking: PageTracking;
    targeting: BannerTargeting;
};

export interface BannerContent {
    heading?: string;
    messageText?: string;
    mobileMessageText?: string; // deprecated - use mobileBannerContent instead
    highlightedText?: string;
    cta?: Cta;
    secondaryCta?: SecondaryCta;
}

const bannerContentSchema = z.object({
    heading: z.string().optional(),
    messageText: z.string(),
    mobileMessageText: z.string().optional(),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
});

export enum BannerTemplate {
    ContributionsBanner = 'ContributionsBanner',
    DigitalSubscriptionsBanner = 'DigitalSubscriptionsBanner',
    GuardianWeeklyBanner = 'GuardianWeeklyBanner',
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

export const bannerChannelSchema = z.enum(['contributions', 'subscriptions']);

export type BannerChannel = z.infer<typeof bannerChannelSchema>;

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

export interface BannerTest extends Test<BannerVariant> {
    name: string;
    bannerChannel: BannerChannel;
    userCohort: UserCohort;
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

interface AbandonedContribution {
    type: 'CONTRIBUTION';
    amount: number;
    contributionType: 'SINGLE' | 'MONTHLY' | 'ANNUAL';
}

interface AbandonedDigisub {
    type: 'DIGITAL_SUBSCRIPTION';
}

export type AbandonedCart = AbandonedContribution | AbandonedDigisub; // TODO - other products

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
    abandonedCart?: AbandonedCart;
    choiceCardAmounts?: ChoiceCardAmounts;
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
});

export interface PuzzlesBannerProps extends Partial<BannerProps> {
    tracking: Tracking;
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
    secondaryCta?: SecondaryCta;
}

export interface RawTestParams {
    name: string;
    nickname: string;
    isOn: boolean;
    minArticlesBeforeShowingBanner: number;
    userCohort: UserCohort;
    locations: CountryGroupId[];
    variants: RawVariantParams[];
    articlesViewedSettings?: ArticlesViewedSettings;
    controlProportionSettings?: ControlProportionSettings;
}
