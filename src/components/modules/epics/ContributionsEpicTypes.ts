import { OphanComponentType, OphanProduct } from '../../../types/OphanTypes';

export type EpicPageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

export type EpicTestTracking = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId: string;
    componentType: OphanComponentType;
    products: OphanProduct[];
};

export type EpicTracking = EpicPageTracking & EpicTestTracking;

export type Tag = {
    id: string;
    type: string;
};

export type UserCohort =
    | 'AllExistingSupporters'
    | 'AllNonSupporters'
    | 'Everyone'
    | 'PostAskPauseSingleContributors';

interface View {
    date: number;
    testId: string;
}
export type ViewLog = View[];

export type WeeklyArticleLog = {
    week: number;
    count: number;
};

export type WeeklyArticleHistory = WeeklyArticleLog[];

export type EpicTargeting = {
    contentType: string;
    sectionName: string;
    shouldHideReaderRevenue: boolean;

    // TODO let's replace these with Design Type/a single property after migration
    isMinuteArticle: boolean;
    isPaidContent: boolean;

    tags: Tag[];
    mvtId?: number;
    epicViewLog?: ViewLog;
    countryCode?: string;
    weeklyArticleHistory?: WeeklyArticleHistory;

    // Note, it turns out that showSupportMessaging (defined in the Members Data
    // API) does not capture every case of recurring contributors or last
    // contributions (i.e. the latter two are not simply a subset of the first -
    // we need all three!).
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
};

export type EpicPayload = {
    tracking: EpicPageTracking;
    targeting: EpicTargeting;
};
