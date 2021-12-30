import { OphanComponentEvent } from './ophan';

import { CountryGroupId } from '../lib/geolocation';

import { UserCohort, Test, Variant, Tracking } from './shared';

export interface HeaderCta {
    url: string;
    text: string;
}

interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: HeaderCta;
    secondaryCta?: HeaderCta;
}

export interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
    modulePathBuilder: (version?: string) => string;
}

export interface HeaderTest extends Test<HeaderVariant> {
    name: string;
    isOn: boolean;
    locations: CountryGroupId[];
    userCohort: UserCohort;
    variants: HeaderVariant[];
}

export interface HeaderProps {
    content: HeaderContent;
    tracking: Tracking;
    mobileContent?: HeaderContent;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
}
