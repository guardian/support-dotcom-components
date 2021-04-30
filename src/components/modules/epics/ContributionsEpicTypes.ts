import { OphanComponentEvent, OphanComponentType, OphanProduct } from '../../../types/OphanTypes';
import { WeeklyArticleHistory } from '../../../types/shared';
import { Variant } from '../../../lib/variants';

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
    hasOptedOutOfArticleCount: boolean;

    // Note, it turns out that showSupportMessaging (defined in the Members Data
    // API) does not capture every case of recurring contributors or last
    // contributions (i.e. the latter two are not simply a subset of the first -
    // we need all three!).
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
    modulesVersion?: string;
};

export type EpicPayload = {
    tracking: EpicPageTracking;
    targeting: EpicTargeting;
};

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export type EpicProps = {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
};
