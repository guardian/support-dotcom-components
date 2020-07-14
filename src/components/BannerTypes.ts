import { TickerSettings } from '../lib/variants';

// TODO - it may be worth sharing some types with Epic tests

export type BannerTargeting = {
    alreadyVisitedCount: number;
    shouldHideReaderRevenue?: boolean;
    isPaidContent?: boolean;
    showSupportMessaging: boolean;
    engagementBannerLastClosedAt?: string;
    subscriptionsBannerLastClosedAt?: string;
    mvtId: number;
    countryCode: string;
};

export type BannerTestTracking = {
    abTestName: string;
    abTestVariant: string | null;
    campaignCode: string | null;
};

export type BannerPageTracking = {
    ophanPageId: string;
    ophanComponentId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

export type BannerTracking = BannerTestTracking & BannerPageTracking;

export type BannerDataRequestPayload = {
    tracking: BannerPageTracking;
    targeting: BannerTargeting;
};

export interface BannerVariant {
    name: string;
    tickerSettings?: TickerSettings;
    modulePath: string;
    moduleName: string;
}

export type BannerType = 'contributions' | 'subscriptions';
export type CanRun = (targeting: BannerTargeting, pageTracking: BannerPageTracking) => boolean;
export type BannerAudience = 'NonSupporters' | 'Supporters' | 'All';

export interface BannerTest {
    name: string;
    path: string;
    bannerType: BannerType;
    testAudience: BannerAudience;
    canRun: CanRun;
    minPageViews: number;
    variants?: BannerVariant[];
}

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant | null;
    moduleUrl: string;
    moduleName: string;
}
