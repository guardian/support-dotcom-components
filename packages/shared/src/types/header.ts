import { OphanComponentEvent } from './ophan';

import { CountryGroupId } from '../lib/geolocation';

import { 
    ControlProportionSettings,
    UserCohort, 
    Test, 
    Variant, 
    Tracking 
} from './shared';

// import {
//     ArticlesViewedSettings,
//     UserCohort,
//     Test,
//     TickerSettings,
//     Variant,
//     WeeklyArticleHistory,
//     ControlProportionSettings,
//     ctaSchema,
//     secondaryCtaSchema,
//     tickerSettingsSchema,
//     Cta,
//     SecondaryCta,
//     Tracking,
//     PageTracking,
//     trackingSchema,
//     TargetingAbTest,
// } from './shared';

// Import statement from server/src/tests/header/headerSelection.ts
// import { Edition, HeaderTargeting, HeaderTest, HeaderTestSelection } from '@sdc/shared/types';

// Feeds into HeaderContent
export interface HeaderCta {
    url: string;
    text: string;
}

// Feeds into HeaderVariant
interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: HeaderCta;
    secondaryCta?: HeaderCta;
}

// Feeds into HeaderTest
export interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
    modulePathBuilder: (version?: string) => string;
}

// Used by headerSelection.ts
export interface HeaderTest extends Test<HeaderVariant> {
    // name: string;
    // audience: UserCohort;
    // variants: HeaderVariant[];
    name: string;
    isOn: boolean;
    locations: CountryGroupId[];
    userCohort: UserCohort;
    variants: HeaderVariant[];
}

// ? Where does this get used?
// ? What is a countryCode?
// ? Why does the header need numArticles?
export interface HeaderProps {
    content: HeaderContent;
    tracking: Tracking;
    mobileContent?: HeaderContent;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
}

// Used by headerSelection.ts
export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}

// Used by headerSelection.ts
// ? Assume Edition has nothing to do with regions (of which there are 8)?
export type Edition = 'UK' | 'US' | 'AU' | 'INT';

// Used by headerSelection.ts
// ? What is a countryCode?
// ? Why does HeaderTargeting need numArticles? lastOneOffContributionDate?
// ? What are modulesVersion, mvtId?
export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
}

export type HeaderTestGenerator = () => Promise<HeaderTest[]>;

export interface RawHeaderVariantParams {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
}

export interface RawHeaderTestParams {
    name: string;
    nickname: string;
    isOn: boolean;
    locations: CountryGroupId[];
    userCohort: UserCohort;
    variants: RawHeaderVariantParams[];
    controlProportionSettings?: ControlProportionSettings;
}
