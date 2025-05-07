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

export const transformBrazeEpic = (liveblogEpic: BrazeEpic): BrazeEpicTest => {
    return {
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
    };
    // const variant: EpicVariant = {
    //     name: liveblogEpic.variantName,
    //     heading: liveblogEpic.heading,
    //     paragraphs: liveblogEpic.paragraphs.split('|'),
    //     highlightedText: liveblogEpic.highlightedText,
    //     cta: {
    //         text: liveblogEpic.ctaText,
    //         baseUrl: liveblogEpic.ctaBaseUrl,
    //     },
    // }
    // const test: EpicTest = {
    //     name: liveblogEpic.testName,
    //     hasArticleCountInCopy: false,
    //     variants: [variant],
    //     tagIds: liveblogEpic.tagIds.split('|'),
    //     status: 'Live',
    //     channel: 'Epic',
    //     priority: 0,
    //     sections: [],
    //     excludedTagIds: [],
    //     excludedSections: [],
    //     alwaysAsk: false,
    //     userCohort: 'AllExistingSupporters',
    //     hasCountryName: false,
    //     highPriority: false,
    //     useLocalViewLog: false,
    // };
    // return {
    //     variant,
    //     test,
    // };
};
