import { OphanComponentEvent, OphanComponentType, OphanProduct } from './OphanTypes';
import {
    ArticlesViewedSettings,
    Cta,
    SecondaryCta,
    Stage,
    Test,
    TickerSettings,
    Variant,
    WeeklyArticleHistory,
} from './shared';
import { ReminderFields } from '../lib/reminderFields';
import { CountryGroupId } from '../lib/geolocation';

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
    labels?: string[];
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
    url?: string;
};

export type EpicPayload = {
    tracking: EpicPageTracking;
    targeting: EpicTargeting;
};

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export type EpicProps = {
    variant: EpicVariant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
    stage?: Stage;
};

export interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

export interface SeparateArticleCount {
    type: 'above';
}

export interface EpicVariant extends Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    tickerSettings?: TickerSettings;
    cta?: Cta;
    secondaryCta?: SecondaryCta;
    footer?: string;
    backgroundImageUrl?: string;
    showReminderFields?: ReminderFields;
    modulePathBuilder?: (version?: string) => string;
    separateArticleCount?: SeparateArticleCount;

    // Variant level maxViews are for special targeting tests. These
    // are handled differently to our usual copy/design tests. To
    // set up a targeting test, the test should be set to alwaysAsk
    // and each variant should have a maxViews set. We then check if a
    // a user should actually see an epic after they have been assigned to
    // the test + variant. This means users **wont** fall through to a test
    // with lower priority.
    maxViews?: MaxViews;
}

interface ControlProportionSettings {
    proportion: number;
    offset: number;
}

export interface EpicTest extends Test<EpicVariant> {
    name: string;
    isOn: boolean;
    locations: CountryGroupId[];
    tagIds: string[];
    sections: string[];
    excludedTagIds: string[];
    excludedSections: string[];
    alwaysAsk: boolean;
    maxViews?: MaxViews;
    userCohort: UserCohort;
    isLiveBlog: boolean;
    hasCountryName: boolean;
    variants: EpicVariant[];
    highPriority: boolean;
    useLocalViewLog: boolean;
    articlesViewedSettings?: ArticlesViewedSettings;
    hasArticleCountInCopy: boolean;

    audience?: number;
    audienceOffset?: number;

    // These are specific to hardcoded tests
    expiry?: string;
    campaignId?: string;

    controlProportionSettings?: ControlProportionSettings;

    isSuperMode?: boolean;
}
