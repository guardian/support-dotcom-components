import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
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
    primaryCta: ctaSchema.nullish(),
    secondaryCta: ctaSchema.nullish(),
});

export interface HeaderProps extends EmotionJSX.IntrinsicAttributes {
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
    mobileContent: headerContentSchema.nullish(),
    countryCode: z.string().nullish(),
    submitComponentEvent: z.any(),
    numArticles: z.number().nullish(),
});
