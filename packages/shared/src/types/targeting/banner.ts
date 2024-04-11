import { PageTracking, WeeklyArticleHistory, PurchaseInfo } from './shared';

export type BannerTargeting = {
    shouldHideReaderRevenue?: boolean;
    isPaidContent?: boolean;
    showSupportMessaging: boolean;
    engagementBannerLastClosedAt?: string;
    subscriptionBannerLastClosedAt?: string;
    signInBannerLastClosedAt?: string;
    mvtId: number;
    countryCode: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    articleCountToday?: number;
    hasOptedOutOfArticleCount: boolean;
    modulesVersion?: string;
    sectionId?: string;
    tagIds?: string[];
    contentType?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
    purchaseInfo?: PurchaseInfo;
    isSignedIn: boolean;
    lastOneOffContributionDate?: string;
    hasConsented?: boolean
};

export type BannerPayload = {
    tracking: PageTracking;
    targeting: BannerTargeting;
};
