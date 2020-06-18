import {TickerSettings} from "../lib/variants";

export type BannerTargeting = {
    alreadyVisitedCount: number;
    shouldHideReaderRevenue: boolean;
    isPaidContent: boolean;
    showSupportMessaging: boolean;
    engagementBannerLastClosedAt?: string;
    mvtId: number;
    countryCode: string;
}

export type BannerTestTracking = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId: string;
};


export type BannerPageTracking = {
    ophanPageId: string;
    ophanComponentId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
}

export type BannerTracking = BannerTestTracking & BannerPageTracking;

export type BannerPayload = {
    tracking: BannerPageTracking;
    targeting: BannerTargeting;
};

export interface BannerVariant {
    name: string,
    tickerSettings: TickerSettings,
}

export interface BannerTest {
    name: string,
    campaignId: string,
}

export interface BannerTestResult {
    test: BannerTest,
    variant: BannerVariant,
    moduleUrl: string,
}
