import { CountryGroupId, ReminderFields } from '../../lib';
import {
    ArticlesViewedSettings,
    ControlProportionSettings,
    Test,
    TestStatus,
    UserCohort,
    Variant,
} from './shared';
import { EpicTargeting } from '../targeting';
import {
    ArticleCountType,
    BylineWithImage,
    Cta,
    Image,
    SecondaryCta,
    TickerSettings,
} from '../props';

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

export interface SeparateArticleCount {
    type: 'above';
    copy?: string;
    countType?: ArticleCountType; // defaults to `for52Weeks`
}

export interface NewsletterSignup {
    url: string;
}

export interface EpicVariant extends Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    tickerSettings?: TickerSettings;
    cta?: Cta;
    secondaryCta?: SecondaryCta;
    newsletterSignup?: NewsletterSignup;
    footer?: string;
    image?: Image;
    showReminderFields?: ReminderFields;
    modulePathBuilder?: (version?: string) => string;
    separateArticleCount?: SeparateArticleCount;
    showChoiceCards?: boolean;
    choiceCardAmounts?: SelectedAmountsVariant;
    defaultChoiceCardFrequency?: ContributionFrequency;
    bylineWithImage?: BylineWithImage;

    // Variant level maxViews are for special targeting tests. These
    // are handled differently to our usual copy/design tests. To
    // set up a targeting test, the test should be set to alwaysAsk
    // and each variant should have a maxViews set. We then check if a
    // a user should actually see an epic after they have been assigned to
    // the test + variant. This means users **wont** fall through to a test
    // with lower priority.
    maxViews?: MaxViews;
    showSignInLink?: boolean;
}

export type ContributionFrequency = 'ONE_OFF' | 'MONTHLY' | 'ANNUAL';

export const contributionTabFrequencies: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

interface ContributionTypeItem {
    label: string;
    suffix: string;
}
export type ContributionType = {
    [key in ContributionFrequency]: ContributionTypeItem;
};

interface AmountValuesObject {
    amounts: number[];
    defaultAmount: number;
    hideChooseYourAmount?: boolean;
}

export type AmountsCardData = {
    [key in ContributionFrequency]: AmountValuesObject;
};

export interface AmountsVariant {
    variantName: string;
    defaultContributionType: ContributionFrequency;
    displayContributionType: ContributionFrequency[];
    amountsCardData: AmountsCardData;
}

export interface SelectedAmountsVariant extends AmountsVariant {
    testName: string;
}

export interface AmountsTest {
    testName: string;
    liveTestName?: string;
    isLive: boolean;
    region: CountryGroupId | "";
    country: string[];
    order: number;
    seed: number;
    variants: AmountsVariant[];
}

export type AmountsTests = AmountsTest[];

export interface EpicTest extends Test<EpicVariant> {
    name: string;
    status: TestStatus;
    locations: CountryGroupId[];
    tagIds: string[];
    sections: string[]; // section IDs
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
    canShow?: (targeting: EpicTargeting) => boolean;
}
