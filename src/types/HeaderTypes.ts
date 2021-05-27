import { OphanComponentEvent, OphanComponentType } from './OphanTypes';
import { Audience, Test, Variant } from './shared';

interface Cta {
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
    audience: Audience;
    variants: HeaderVariant[];
}

export interface HeaderProps {
    content: HeaderContent;
    tracking: HeaderTracking;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    moduleUrl: string;
    moduleName: string;
}

export interface HeaderPageTracking {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
}
export interface HeaderTestTracking {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    componentType: OphanComponentType;
}

export type HeaderTracking = HeaderPageTracking & HeaderTestTracking;

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: string;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
}
