import { ViewLog } from '../../lib/viewLog';
import { PageTracking, WeeklyArticleHistory } from '../shared';

export type Tag = {
    id: string;
    type: string;
};

export type EpicTargeting = {
    contentType: string;
    sectionName?: string; // Deprecated - use sectionId
    sectionId?: string;
    shouldHideReaderRevenue: boolean;

    // TODO let's replace these with Design Type/a single property after migration
    isMinuteArticle: boolean;
    isPaidContent: boolean;

    tags: Tag[];
    mvtId?: number;
    epicViewLog?: ViewLog;
    countryCode?: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    hasOptedOutOfArticleCount: boolean;
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
    modulesVersion?: string;
    url?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
};

export type EpicPayload = {
    tracking: PageTracking;
    targeting: EpicTargeting;
};
