import { z } from 'zod';
import type { Cta } from '../../shared/types';

export interface BrazeEpicTest {
    testName: string;
    variantName: string;
    tagIds: string[];
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: Cta;
}

export const brazeEpicSchema = z.object({
    brazeUUID: z.string(),
    testName: z.string(),
    variantName: z.string(),
    tagIds: z.string(),
    heading: z.string().optional(),
    paragraphs: z.string(),
    ctaText: z.string(),
    ctaBaseUrl: z.string(),
    highlightedText: z.string().optional(),
});

export type BrazeEpic = z.infer<typeof brazeEpicSchema>;

export const transformBrazeEpic = (liveblogEpic: BrazeEpic): BrazeEpicTest => ({
    testName: liveblogEpic.testName,
    variantName: liveblogEpic.variantName,
    heading: liveblogEpic.heading,
    highlightedText: liveblogEpic.highlightedText,
    paragraphs: liveblogEpic.paragraphs.split('|'),
    tagIds: liveblogEpic.tagIds.split('|'),
    cta: {
        text: liveblogEpic.ctaText,
        baseUrl: liveblogEpic.ctaBaseUrl,
    },
});
