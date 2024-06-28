import { OphanComponentEvent } from '@guardian/libs';
import { ReminderFields } from '@sdc/shared/lib';
import {
    SecondaryCtaType,
    SelectedAmountsVariant,
    TickerSettings,
    Tracking,
    ConfigurableDesign,
} from '@sdc/shared/types';
import type { ArticleCounts, ArticleCountType, SeparateArticleCount } from '@sdc/shared/dist/types';

export type BannerId = 'designable-banner' | 'sign-in-prompt-banner';

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
    countType?: ArticleCountType;
    separateArticleCount?: boolean;
    separateArticleCountSettings?: SeparateArticleCount;
    choiceCardAmounts?: SelectedAmountsVariant;
    tracking: Tracking;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    design?: ConfigurableDesign;
}
