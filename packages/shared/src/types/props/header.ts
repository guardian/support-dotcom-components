import * as z from 'zod';
import { Tracking, trackingSchema } from './shared';
import { OphanComponentEvent } from '../ophan';

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

const headerCtaSchema = z.object({
    url: z.string(),
    text: z.string(),
});

const headerContentSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: headerCtaSchema.optional(),
    secondaryCta: headerCtaSchema.optional(),
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
    mobileContent: headerContentSchema.optional(),
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
});
