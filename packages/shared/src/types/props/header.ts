import { JSX } from '@emotion/react/jsx-runtime';
import { z } from 'zod';
import { OphanComponentEvent } from '@guardian/libs';

import { Tracking, trackingSchema, Cta, ctaSchema } from './shared';

export interface HeaderContent {
    heading: string;
    subheading: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    benefits?: string[];
}

export const headerContentSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
    benefits: z.array(z.string()).optional(),
});

export interface HeaderProps extends JSX.IntrinsicAttributes {
    content: HeaderContent;
    tracking: Tracking;
    mobileContent?: HeaderContent;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
}

export const headerPropsSchema = z.object({
    content: headerContentSchema,
    tracking: trackingSchema,
    mobileContent: headerContentSchema.optional(),
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
});
