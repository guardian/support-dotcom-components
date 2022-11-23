import { BannerChannel, BannerContent, TickerSettings } from '../props';
import {
    ArticlesViewedSettings,
    ControlProportionSettings,
    DeviceType,
    SignedInStatus,
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
    ContributionsBanner = 'ContributionsBanner',
    ContributionsBannerWithSignIn = 'ContributionsBannerWithSignIn',
    InvestigationsMomentBanner = 'InvestigationsMomentBanner',
    EnvironmentMomentBanner = 'EnvironmentMomentBanner',
    DigitalSubscriptionsBanner = 'DigitalSubscriptionsBanner',
    GuardianWeeklyBanner = 'GuardianWeeklyBanner',
    GlobalNewYearBanner = 'GlobalNewYearBanner',
    ResearchSurveyBanner = 'ResearchSurveyBanner',
    AuBrandMomentBanner = 'AuBrandMomentBanner',
    SignInPromptBanner = 'SignInPromptBanner',
    ClimateCrisisMomentBanner = 'ClimateCrisisMomentBanner',
    UsEoyMomentBanner = 'UsEoyMomentBanner',
    UsEoyGivingTuesMomentBanner = 'UsEoyGivingTuesMomentBanner',
}

export interface BannerVariant extends Variant {
    name: string;
    tickerSettings?: TickerSettings;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
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
    minPageViews: number;
    variants: BannerVariant[];
    locations?: CountryGroupId[];
    articlesViewedSettings?: ArticlesViewedSettings;
    audienceOffset?: number;
    audience?: number;
    controlProportionSettings?: ControlProportionSettings;
    purchaseInfo?: PurchaseInfoTest;
}

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleUrl: string;
    moduleName: string;
    targetingAbTest?: TargetingAbTest;
}

export interface RawVariantParams {
    name: string;
    template: BannerTemplate;
    bannerContent: BannerContent;
    mobileBannerContent?: BannerContent;
    separateArticleCount?: boolean;
    tickerSettings?: TickerSettings;
}

export interface RawTestParams {
    name: string;
    nickname: string;
    status: TestStatus;
    minArticlesBeforeShowingBanner: number;
    userCohort: UserCohort;
    locations: CountryGroupId[];
    variants: RawVariantParams[];
    articlesViewedSettings?: ArticlesViewedSettings;
    controlProportionSettings?: ControlProportionSettings;
    deviceType?: DeviceType;
    signedInStatus?: SignedInStatus;
}
