import type { OphanComponentEvent } from '@guardian/libs';
import { z } from 'zod';
import type { Cta, Image, Tracking} from './shared';
import { ctaSchema, imageSchema, trackingSchema } from './shared';

export interface GutterContent {
    image: Image;
    bodyCopy: string[];
    cta?: Cta;
}

export const gutterContentSchema = z.object({
    image: imageSchema, // We're using mainUrl here.
    bodyCopy: z.array(z.string()),
    cta: ctaSchema.optional(),
});

export interface GutterProps {
    content: GutterContent;
    tracking: Tracking;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

export const gutterPropsSchema = z.object({
    content: gutterContentSchema,
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
});
