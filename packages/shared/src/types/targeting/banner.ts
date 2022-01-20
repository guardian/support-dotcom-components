import { PageTracking, WeeklyArticleHistory } from './shared';

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
    sectionId?: string;
    tagIds?: string[];
};

export type BannerPayload = {
    tracking: PageTracking;
    targeting: BannerTargeting;
};
