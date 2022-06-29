import * as z from 'zod';
import { OphanComponentEvent } from '../ophan';
import { Tracking, trackingSchema, Cta, ctaSchema } from './shared';

export interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    benefits?: string[];
}

const headerContentSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: ctaSchema.nullable().optional(),
    secondaryCta: ctaSchema.nullable().optional(),
});

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
    mobileContent: headerContentSchema.nullable().optional(),
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
});
