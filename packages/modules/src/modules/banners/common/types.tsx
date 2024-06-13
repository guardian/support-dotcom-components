import { ReminderFields } from '@sdc/shared/lib';
import {
    OphanComponentEvent,
    SecondaryCtaType,
    SelectedAmountsVariant,
    TickerSettings,
    Tracking,
    ConfigurableDesign,
    SeparateArticleCountSettings,
} from '@sdc/shared/types';
import { ArticleCounts, ArticleCountType } from '@sdc/shared/dist/types';

export type BannerId =
    | 'climate-crisis-moment-banner'
    | 'contributions-banner'
    | 'research-survey-banner'
    | 'aus-anniversary-moment-banner'
    | 'environment-banner'
    | 'environment-moment-banner'
    | 'subscription-banner'
    | 'weekly-banner'
    | 'supporter-moment-banner'
    | 'europe-moment-local-language-banner'
    | 'global-new-year-moment-banner'
    | 'election-au-moment-banner'
    | 'sign-in-prompt-banner'
    | 'au-brand-moment-banner'
    | 'us-eoy-banner'
    | 'us-eoy-giving-tues-banner'
    | 'us-eoy-banner-v3'
    | 'aus-eoy-banner'
    | 'ukraine-moment-banner'
    | 'scotus-2023-moment-banner'
    | 'wpfd-banner'
    | 'designable-banner'
    | 'choice-cards-moment-banner';

export interface BannerEnrichedCta {
    ctaUrl: string;
    ctaText: string;
}

export interface BannerEnrichedCustomCta {
    type: SecondaryCtaType.Custom;
    cta: BannerEnrichedCta;
}

export interface BannerEnrichedReminderCta {
    type: SecondaryCtaType.ContributionsReminder;
    reminderFields: ReminderFields;
}

export type BannerEnrichedSecondaryCta = BannerEnrichedCustomCta | BannerEnrichedReminderCta;

export interface ContributionsReminderTracking {
    onReminderCtaClick: () => void;
    onReminderSetClick: () => void;
    onReminderCloseClick: () => void;
}

export interface BannerRenderedContent {
    heading: JSX.Element | JSX.Element[] | null;
    subheading: JSX.Element | JSX.Element[] | null;
    paragraphs: (JSX.Element | JSX.Element[])[];
    highlightedText?: JSX.Element | JSX.Element[] | null;
    primaryCta: BannerEnrichedCta | null;
    secondaryCta: BannerEnrichedSecondaryCta | null;
}

export interface BannerTextContent {
    mainContent: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
}

export interface BannerRenderProps {
    onCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    onNotNowClick: () => void;
    onCloseClick: () => void;
    onSignInClick?: () => void;
    reminderTracking: ContributionsReminderTracking;
    content: BannerTextContent;
    countryCode?: string;
    fetchEmail?: () => Promise<string | null>;
    tickerSettings?: TickerSettings;
    isSupporter?: boolean;
    articleCounts: ArticleCounts;
    separateArticleCount?: boolean;
    separateArticleCountSettings?: SeparateArticleCountSettings;
    choiceCardAmounts?: SelectedAmountsVariant;
    tracking: Tracking;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    design?: ConfigurableDesign;
}
