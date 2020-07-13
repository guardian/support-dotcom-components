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
    abTestVariant: string;
    campaignCode: string;
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

export type CanRun = (targeting: BannerTargeting, pageTracking: BannerPageTracking) => boolean;

export interface BannerTest {
    name: string;
    path: string;
    bannerType: 'contributions' | 'subscriptions';
    canRun: CanRun;
    minPageViews: number;
    variants: BannerVariant[] | [];
}

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleUrl: string;
    moduleName: string;
}
