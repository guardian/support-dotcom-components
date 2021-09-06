import { OphanComponentEvent } from './ophan';
import {
    ArticlesViewedSettings,
    UserCohort,
    Cta,
    SecondaryCta,
    Stage,
    Test,
    TickerSettings,
    Variant,
    WeeklyArticleHistory,
    tickerSettingsSchema,
    ctaSchema,
    Tracking,
    PageTracking,
    trackingSchema,
    secondaryCtaSchema,
} from './shared';
import { ReminderFields, CountryGroupId } from '../lib';
import { z } from 'zod';

export type Tag = {
    id: string;
    type: string;
};

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
    tracking: PageTracking;
    targeting: EpicTargeting;
};

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export interface ArticleCounts {
    for52Weeks: number; // The user's total article view count, which currently goes back as far as 52 weeks
    forTargetedWeeks: number; // The user's article view count for the configured periodInWeeks
}

const articleCountsSchema = z.object({
    for52Weeks: z.number(),
    forTargetedWeeks: z.number(),
});

export interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

export interface SeparateArticleCount {
    type: 'above';
}

const separateArticleCountSchema = z.object({
    type: z.string(),
});

const reminderFieldsSchema = z.object({
    reminderCta: z.string(),
    reminderLabel: z.string(),
    reminderPeriod: z.string(),
});

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

    // For hard coded choice cards test
    choiceCardAmounts?: ChoiceCardAmounts;
}

const variantSchema = z.object({
    name: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    highlightedText: z.string().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    cta: ctaSchema.optional(),
    secondaryCta: secondaryCtaSchema.optional(),
    footer: z.string().optional(),
    backgroundImageUrl: z.string().optional(),
    showReminderFields: reminderFieldsSchema.optional(),
    separateArticleCount: separateArticleCountSchema.optional(),
    maxViews: maxViewsSchema.optional(),
});

export type EpicProps = {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    articleCounts: ArticleCounts;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
    stage?: Stage;
};

export const epicPropsSchema = z.object({
    variant: variantSchema,
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    articleCounts: articleCountsSchema,
    onReminderOpen: z.any().optional(),
    email: z.string().optional(),
    submitComponentEvent: z.any().optional(),
    openCmp: z.any().optional(),
    hasConsentForArticleCount: z.boolean().optional(),
    stage: z.string().optional(),
});

interface ControlProportionSettings {
    proportion: number;
    offset: number;
}

export type ChoiceCardFrequency = 'SINGLE' | 'MONTHLY' | 'ANNUAL';
export type ChoiceCardAmounts = {
    [index in ChoiceCardFrequency]: number[];
};

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
