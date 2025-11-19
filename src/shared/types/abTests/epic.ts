import { z } from 'zod';
import type { CountryGroupId } from '../../lib';
import { countryGroupIdSchema, targetedRegionsSchema } from '../../lib';
import { variantSchema } from '../props';
import type { EpicTargeting } from '../targeting';
import {
    articlesViewedSettingsSchema,
    testSchema,
    testStatusSchema,
    userCohortSchema,
} from './shared';

export type EpicType = 'ARTICLE' | 'LIVEBLOG';

export const maxViewsSchema = z.object({
    maxViewsCount: z.number(),
    maxViewsDays: z.number(),
    minDaysBetweenViews: z.number(),
});

export type MaxViews = z.infer<typeof maxViewsSchema>;

export type ContributionFrequency = 'ONE_OFF' | 'MONTHLY' | 'ANNUAL';

export const contributionTabFrequencies: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

interface ContributionTypeItem {
    label: string;
    suffix: string;
}
export type ContributionType = Record<ContributionFrequency, ContributionTypeItem>;

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

export type AmountsCardData = Record<ContributionFrequency, AmountValuesObject>;

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
export type EpicTestFromTool = z.infer<typeof epicTestFromToolSchema>;

// with additional properties determined by the server
export interface EpicTest extends EpicTestFromTool {
    hasArticleCountInCopy: boolean;
    isSuperMode?: boolean;
    canShow?: (targeting: EpicTargeting) => boolean;

    // specific to hardcoded tests
    campaignId?: string;
    expiry?: string;
}

export const epicTestFromToolSchema = testSchema.extend({
    name: z.string(),
    status: testStatusSchema,
    locations: z.array(countryGroupIdSchema).optional(), //deprecated
    regionTargeting: targetedRegionsSchema.optional(),
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
    mParticleAudience: z.number().nullish(),
    priority: z.number(),
    variants: variantSchema.array(),
});

export type EpicVariant = z.infer<typeof variantSchema>;
