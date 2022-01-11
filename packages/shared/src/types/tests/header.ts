import { UserCohort, Test, Variant } from './shared';

export interface HeaderCta {
    url: string;
    text: string;
}

export interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: HeaderCta;
    secondaryCta?: HeaderCta;
}

interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
    modulePathBuilder: (version?: string) => string;
}

export interface HeaderTest extends Test<HeaderVariant> {
    name: string;
    audience: UserCohort;
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}
