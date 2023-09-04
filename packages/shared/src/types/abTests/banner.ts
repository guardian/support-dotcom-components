import { BannerChannel, BannerContent, TickerSettings } from '../props';
import {
    ArticlesViewedSettings,
    ControlProportionSettings,
    TargetingAbTest,
    Test,
    TestStatus,
    UserCohort,
    Variant,
} from './shared';
import { OphanComponentType, OphanProduct } from '../ophan';
import { CountryGroupId } from '../../lib';
import { BannerTargeting, PageTracking } from '../targeting';
import { PurchaseInfoTest } from './shared';

export enum BannerTemplate {
    AusAnniversaryBanner = 'AusAnniversaryBanner',
    ContributionsBanner = 'ContributionsBanner',
    CharityAppealBanner = 'CharityAppealBanner',
    ContributionsBannerWithSignIn = 'ContributionsBannerWithSignIn',
    InvestigationsMomentBanner = 'InvestigationsMomentBanner',
    EnvironmentMomentBanner = 'EnvironmentMomentBanner',
    DigitalSubscriptionsBanner = 'DigitalSubscriptionsBanner',
    PrintSubscriptionsBanner = 'PrintSubscriptionsBanner',
    ChoiceCardsBannerBlue = 'ChoiceCardsBannerBlue',
    ChoiceCardsBannerYellow = 'ChoiceCardsBannerYellow',
    ChoiceCardsButtonsBannerBlue = 'ChoiceCardsButtonsBannerBlue',
    ChoiceCardsButtonsBannerYellow = 'ChoiceCardsButtonsBannerYellow',
    GuardianWeeklyBanner = 'GuardianWeeklyBanner',
    GlobalNewYearBanner = 'GlobalNewYearBanner',
    SignInPromptBanner = 'SignInPromptBanner',
    UkraineMomentBanner = 'UkraineMomentBanner',
    Scotus2023MomentBanner = 'Scotus2023MomentBanner',
    WorldPressFreedomDayBanner = 'WorldPressFreedomDayBanner',
}

export interface BannerVariant extends Variant {
    name: string;
    tickerSettings?: TickerSettings;
    modulePathBuilder: (version?: string) => string;
    template: BannerTemplate;
    bannerContent?: BannerContent;
    mobileBannerContent?: BannerContent;
    componentType: OphanComponentType;
    products?: OphanProduct[];
    separateArticleCount?: boolean;
}

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

export interface BannerTest extends Test<BannerVariant> {
    name: string;
    status: TestStatus;
    bannerChannel: BannerChannel;
    isHardcoded: boolean;
    userCohort: UserCohort;
    canRun?: CanRun;
    minArticlesBeforeShowingBanner: number;
    variants: BannerVariant[];
    locations?: CountryGroupId[];
    articlesViewedSettings?: ArticlesViewedSettings;
    audienceOffset?: number;
    audience?: number;
    controlProportionSettings?: ControlProportionSettings;
    purchaseInfo?: PurchaseInfoTest;
    tagIds?: string[];
    sectionIds?: string[];
    excludedTagIds?: string[];
    excludedSectionIds?: string[];
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
export type BannerTestFromTool = Omit<BannerTest, 'bannerChannel' | 'isHardcoded'> & {
    variants: BannerVariantFromTool[];
};
