import type { AbandonedBasket, PurchaseInfo, WeeklyArticleHistory } from './shared';

export type BannerTargeting = {
    shouldHideReaderRevenue?: boolean;
    isPaidContent?: boolean;
    showSupportMessaging: boolean;
    engagementBannerLastClosedAt?: string;
    subscriptionBannerLastClosedAt?: string;
    signInBannerLastClosedAt?: string;
    abandonedBasketBannerLastClosedAt?: string;
    mvtId: number;
    countryCode: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    articleCountToday?: number;
    hasOptedOutOfArticleCount: boolean;
    sectionId?: string;
    tagIds?: string[];
    contentType?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
    hasConsented: boolean;
    abandonedBasket?: AbandonedBasket;
    pageId?: string;
};

export type BannerPayload = {
    targeting: BannerTargeting;
};
