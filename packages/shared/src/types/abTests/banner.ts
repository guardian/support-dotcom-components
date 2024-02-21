import {
    BannerChannel,
    BannerContent,
    bannerContentSchema,
    ConfigurableDesign,
    TickerSettings,
    tickerSettingsSchema,
} from '../props';
import {
    ArticlesViewedSettings,
    articlesViewedSettingsSchema,
    ControlProportionSettings,
    PageContextTargeting,
    pageContextTargetingSchema,
    TargetingAbTest,
    Test,
    testSchema,
    TestStatus,
    UserCohort,
    userCohortSchema,
    Variant,
} from './shared';
import { OphanComponentType, OphanProduct } from '../ophan';
import { CountryGroupId, countryGroupIdSchema } from '../../lib';
import { BannerTargeting, PageTracking } from '../targeting';
import { PurchaseInfoTest } from './shared';
import { z } from 'zod';

export enum BannerTemplate {
    ContributionsBanner = 'ContributionsBanner',
    ContributionsBannerWithSignIn = 'ContributionsBannerWithSignIn',
    EnvironmentBanner = 'EnvironmentBanner',
    SignInPromptBanner = 'SignInPromptBanner',
    WorldPressFreedomDayBanner = 'WorldPressFreedomDayBanner',
    EuropeMomentLocalLanguageBanner = 'EuropeMomentLocalLanguageBanner',
}

export interface BannerDesignName {
    designName: string;
}

type BannerUi = BannerTemplate | BannerDesignName;

export function uiIsDesign(ui: BannerUi): ui is BannerDesignName {
    return (ui as BannerDesignName).designName !== undefined;
}

export interface BannerVariant extends Variant {
    name: string;
    tickerSettings?: TickerSettings;
    modulePathBuilder: (version?: string) => string;
    template: BannerUi;
    bannerContent?: BannerContent;
    mobileBannerContent?: BannerContent;
    componentType: OphanComponentType;
    products?: OphanProduct[];
    separateArticleCount?: boolean;
}

export const bannerVarientSchema = z.object({
    name: z.string(),
    tickerSettings: tickerSettingsSchema.optional(),
    template: z.union([z.nativeEnum(BannerTemplate), z.object({ designName: z.string() })]),
    bannerContent: bannerContentSchema.optional(),
    mobileBannerContent: bannerContentSchema.optional(),
    separatorArticleCount: z.boolean().optional(),
});

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

export interface BannerTest extends Test<BannerVariant> {
    name: string;
    status: TestStatus;
    bannerChannel: BannerChannel;
    isHardcoded: boolean;
    userCohort: UserCohort;
    canRun?: CanRun;
    variants: BannerVariant[];
    locations?: CountryGroupId[];
    articlesViewedSettings?: ArticlesViewedSettings;
    audienceOffset?: number;
    audience?: number;
    controlProportionSettings?: ControlProportionSettings;
    purchaseInfo?: PurchaseInfoTest;
    contextTargeting?: PageContextTargeting;
}

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleUrl: string;
    moduleName: string;
    targetingAbTest?: TargetingAbTest;
}

// Models for the config from the RRCP
export type BannerVariantFromTool = Omit<
    BannerVariant,
    'modulePathBuilder' | 'componentType' | 'products'
>;
/*export type BannerTestFromTool = Omit<BannerTest, 'bannerChannel' | 'isHardcoded'> & {
    variants: BannerVariantFromTool[];
};*/

export const bannerTestDbSchema = testSchema.extend({
    userCohort: userCohortSchema,
    locations: z.array(countryGroupIdSchema),
    contextTargeting: pageContextTargetingSchema,
    variants: z.array(bannerVarientSchema),
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
});

export type BannerDesignFromTool = { name: string } & ConfigurableDesign;
