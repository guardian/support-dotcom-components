import { Test } from '../lib/variants';
import { epic, epicACAbove, epicACInline } from '../modules';
import {
    CTA,
    EU_ROW_CONTROL_PARAGRAPHS,
    EU_ROW_VARIANTS_PARAGRAPHS,
    HIGHLIGHTED_TEXT,
    UK_AUS_CONTROL_PARAGRAPHS,
    UK_AUS_VARIANTS_PARAGRAPHS,
} from './epicArticleCountTestData';

export enum EpicSeparateArticleCountTestVariants {
    control = 'control',
    above = 'above',
    inline = 'inline',
}

export type DesignTest = { name: string } & Partial<Test>;

export const epicSeparateArticleCountTestUkAus: DesignTest = {
    name: 'EPIC_DESIGN_TEST_R2__UK_AUS',
    campaignId: 'EpicSeparateArticleCountTest',
    audience: 1,
    variants: [
        {
            name: EpicSeparateArticleCountTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: UK_AUS_CONTROL_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
        {
            name: EpicSeparateArticleCountTestVariants.above,
            modulePathBuilder: epicACAbove.endpointPathBuilder,
            paragraphs: UK_AUS_VARIANTS_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
        {
            name: EpicSeparateArticleCountTestVariants.inline,
            modulePathBuilder: epicACInline.endpointPathBuilder,
            paragraphs: UK_AUS_VARIANTS_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
    ],
};

export const epicSeparateArticleCountTestEuRow: DesignTest = {
    name: 'EPIC_DESIGN_TEST_R2__EU_ROW',
    variants: [
        {
            name: EpicSeparateArticleCountTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: EU_ROW_CONTROL_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
        {
            name: EpicSeparateArticleCountTestVariants.above,
            modulePathBuilder: epicACAbove.endpointPathBuilder,
            paragraphs: EU_ROW_VARIANTS_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
        {
            name: EpicSeparateArticleCountTestVariants.inline,
            modulePathBuilder: epicACInline.endpointPathBuilder,
            paragraphs: EU_ROW_VARIANTS_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
    ],
};
