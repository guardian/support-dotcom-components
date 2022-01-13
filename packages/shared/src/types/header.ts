import * as z from 'zod';
import { OphanComponentEvent } from './ophan';
import { CountryGroupId } from '../lib/geolocation';
import { UserCohort, Test, Variant, Tracking, trackingSchema, Cta } from './shared';

const headerCtaSchema = z.object({
    url: z.string(),
    text: z.string(),
});

interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
}

const headerContentSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: headerCtaSchema.optional(),
    secondaryCta: headerCtaSchema.optional(),
});

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

export const headerSchema = z.object({
    content: headerContentSchema,
    tracking: trackingSchema,
    mobileContent: headerContentSchema.optional(),
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
});

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
