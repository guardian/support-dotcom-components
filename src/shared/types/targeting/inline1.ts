import type { WeeklyArticleHistory } from './shared';

export interface Inline1Targeting {
    showSupportMessaging: boolean;
    mvtId: number;
    countryCode: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    hasOptedOutOfArticleCount: boolean;
    sectionId?: string;
    tagIds?: string[];
    pageId?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
    isSignedIn: boolean;
    hasConsented: boolean;
}

export type Inline1Payload = {
    targeting: Inline1Targeting;
};
