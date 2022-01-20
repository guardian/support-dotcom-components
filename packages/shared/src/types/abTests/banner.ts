import { BannerChannel, BannerContent, Cta, SecondaryCta, TickerSettings } from '../props';
import {
    ArticlesViewedSettings,
    ControlProportionSettings,
    TargetingAbTest,
    Test,
    UserCohort,
    Variant,
} from './shared';
import { OphanComponentType, OphanProduct } from '../ophan';
import { BannerTargeting, PageTracking } from '../targeting';
import { CountryGroupId } from '../../lib';

export enum BannerTemplate {
    ContributionsBanner = 'ContributionsBanner',
    ContributionsBannerWithSignIn = 'ContributionsBannerWithSignIn',
    InvestigationsMomentBanner = 'InvestigationsMomentBanner',
    EnvironmentMomentBanner = 'EnvironmentMomentBanner',
    DigitalSubscriptionsBanner = 'DigitalSubscriptionsBanner',
    GuardianWeeklyBanner = 'GuardianWeeklyBanner',
    UsEoyMomentBanner = 'UsEoyMomentBanner',
    UsEoyMomentGivingTuesdayBanner = 'UsEoyMomentGivingTuesdayBanner',
    GlobalNewYearBanner = 'GlobalNewYearBanner',
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
}

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

export interface BannerTest extends Test<BannerVariant> {
    name: string;
    bannerChannel: BannerChannel;
    userCohort: UserCohort;
    canRun: CanRun;
    minPageViews: number;
    variants: BannerVariant[];
    locations?: CountryGroupId[];
    articlesViewedSettings?: ArticlesViewedSettings;
    audienceOffset?: number;
    audience?: number;
    controlProportionSettings?: ControlProportionSettings;
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

    // deprecated - use bannerContent
    body: string;
    heading?: string;
    highlightedText?: string;
    cta?: Cta;
    secondaryCta?: SecondaryCta;
}

export interface RawTestParams {
    name: string;
    nickname: string;
    isOn: boolean;
    minArticlesBeforeShowingBanner: number;
    userCohort: UserCohort;
    locations: CountryGroupId[];
    variants: RawVariantParams[];
    articlesViewedSettings?: ArticlesViewedSettings;
    controlProportionSettings?: ControlProportionSettings;
}
