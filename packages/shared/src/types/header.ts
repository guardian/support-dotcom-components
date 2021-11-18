import { OphanComponentEvent } from './ophan';
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
