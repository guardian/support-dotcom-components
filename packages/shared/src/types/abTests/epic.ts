import { CountryGroupId, ReminderFields, countryGroupIdSchema } from '../../lib';
import {
    articlesViewedSettingsSchema,
    testSchema,
    testStatusSchema,
    userCohortSchema,
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
    variantSchema,
} from '../props';
import * as z from 'zod';

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

export type MaxViews = z.infer<typeof maxViewsSchema>;

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
    forceApplePay?: boolean;
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

/*
An amounts test can be in one of two forms:

Country test:
  Bespoke tests targeted at one or more geographical countries
  `targeting` object will include a `countries` attribute
    - a String array containing 2-letter ISO country codes
  When the `isLive` boolean is `false`:
    - the test is ignored; users will see their appropriate region test
  When the `isLive` boolean is `true`:
    - users will be randomly segregated into an AB test and see the appropriate variant
    - analytics will use the `liveTestName` label, if available, else the `testName` label
  A country can appear in more than one country test:
    - if 2+ live tests include the country, the test with the lowest `order` value will display

Region test:
  Evergreen tests, one per geographical region
  `targeting` object will include a `region` attribute
    - the region label, as defined by the Region type
  When the `isLive` boolean is `false`:
    - the CONTROL variant will display
    - analytics will use the `testName` label
  When the `isLive` boolean is `true`:
    - users will be randomly segregated into an AB test and see the appropriate variant
    - analytics will use the `liveTestName` label
*/
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

export type AmountsTestTargeting =
    | { targetingType: 'Region'; region: CountryGroupId }
    | { targetingType: 'Country'; countries: string[] };

export interface AmountsTest {
    testName: string;
    liveTestName?: string;
    testLabel?: string;
    isLive: boolean;
    targeting: AmountsTestTargeting;
    order: number;
    seed: number;
    variants: AmountsVariant[];
}

export type AmountsTests = AmountsTest[];

// for validation from DynamoDB
export type EpicTestDB = z.infer<typeof epicTestDBSchema>;

// with additional properties determined by the server
export interface EpicTest extends EpicTestDB {
    hasArticleCountInCopy: boolean;
    isSuperMode?: boolean;
    variants: EpicVariant[];
    canShow?: (targeting: EpicTargeting) => boolean;

    // specific to hardcoded tests
    campaignId?: string;
    expiry?: string;
}

export const epicTestDBSchema = testSchema.extend({
    name: z.string(),
    status: testStatusSchema,
    locations: z.array(countryGroupIdSchema),
    tagIds: z.array(z.string()),
    sections: z.array(z.string()),
    excludedTagIds: z.array(z.string()),
    excludedSections: z.array(z.string()),
    alwaysAsk: z.boolean(),
    maxViews: maxViewsSchema.optional(),
    userCohort: userCohortSchema,
    hasCountryName: z.boolean(),
    highPriority: z.boolean(),
    useLocalViewLog: z.boolean(),
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
    priority: z.number(),
    variants: variantSchema.array(),
});
