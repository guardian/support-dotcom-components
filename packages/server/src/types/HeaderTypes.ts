import { OphanComponentEvent } from './OphanTypes';
import { UserCohort, Test, Variant, Tracking } from './shared';

export interface Cta {
    url: string;
    text: string;
}

interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
}

interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    modulePathBuilder: (version?: string) => string;
}

export interface HeaderTest extends Test<HeaderVariant> {
    name: string;
    audience: UserCohort;
    variants: HeaderVariant[];
}

export interface HeaderProps {
    content: HeaderContent;
    tracking: Tracking;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: string;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
}
