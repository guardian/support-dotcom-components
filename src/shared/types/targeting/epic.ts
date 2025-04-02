import type { EpicViewLog } from '../../lib/viewLog';
import type { WeeklyArticleHistory } from './shared';

type Tag = {
    id: string;
    type: string;
};

export type EpicTargeting = {
    contentType: string;
    sectionName?: string; // Deprecated - use sectionId
    sectionId?: string;
    shouldHideReaderRevenue: boolean;

    isMinuteArticle: boolean;
    isPaidContent: boolean;

    tags: Tag[];
    mvtId?: number;
    epicViewLog?: EpicViewLog;
    countryCode?: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    hasOptedOutOfArticleCount: boolean;
    showSupportMessaging: boolean;
    url?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
    isSignedIn?: boolean;
    pageId?: string;
};

export type EpicPayload = {
    targeting: EpicTargeting;
};
