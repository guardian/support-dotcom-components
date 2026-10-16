import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import z from 'zod';
import type { Inline1Variant } from '../abTests';
import { type Tracking, trackingSchema } from './shared';

export interface Inline1Props {
    variant: Inline1Variant;
    tracking: Tracking;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: ComponentEvent) => Promise<void>;
}

export const inline1PropsSchema = z.object({
    tracking: trackingSchema,
    countryCode: z.string().optional(),
    submitComponentEvent: z.any(),
});
