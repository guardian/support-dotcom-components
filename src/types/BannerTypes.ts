import { OphanProduct, OphanComponentType, OphanComponentEvent } from './OphanTypes';
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
