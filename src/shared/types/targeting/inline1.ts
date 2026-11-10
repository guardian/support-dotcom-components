import type { WeeklyArticleHistory } from './shared';

// Recorded in local storage to limit views per browser
export interface Inline1View {
    timestamp: number;
    testName: string;
}

export interface Inline1Targeting {
    showSupportMessaging: boolean;
    mvtId: number;
    countryCode: string;
    weeklyArticleHistory?: WeeklyArticleHistory;
    sectionId?: string;
    tagIds?: string[];
    pageId?: string;
    browserId?: string; // Only present if the user has consented to browserId-based targeting
    isSignedIn: boolean;
    hasConsented: boolean;
    hasNewsletterSignup: boolean;
    viewLog?: Inline1View[];
}

export type Inline1Payload = {
    targeting: Inline1Targeting;
};
