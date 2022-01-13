import * as z from 'zod';
import { OphanComponentEvent } from './ophan';
<<<<<<< HEAD

import { CountryGroupId } from '../lib/geolocation';

import { UserCohort, Test, Variant, Tracking } from './shared';
=======
import { UserCohort, Test, Variant, Tracking, trackingSchema } from './shared';
>>>>>>> main

export interface HeaderCta {
    url: string;
    text: string;
}

const headerCtaSchema = z.object({
    url: z.string(),
    text: z.string(),
});

interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: HeaderCta;
    secondaryCta?: HeaderCta;
}

<<<<<<< HEAD
export interface HeaderVariant extends Variant {
=======
const headerContentSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: headerCtaSchema.optional(),
    secondaryCta: headerCtaSchema.optional(),
});

interface HeaderVariant extends Variant {
>>>>>>> main
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
