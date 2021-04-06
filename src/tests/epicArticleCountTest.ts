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

export const epicSeparateArticleCountTestUkAus: Test = {
    kind: 'DESIGN',
    name: 'EPIC_DESIGN_TEST_R2__UK_AUS',
    campaignId: 'EpicSeparateArticleCountTest',
    isOn: true,
    locations: ['GBPCountries', 'AUDCountries'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'Everyone',
    isLiveBlog: false,
    hasCountryName: true,
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
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};

export const epicSeparateArticleCountTestEuRow: Test = {
    kind: 'DESIGN',
    name: 'EPIC_DESIGN_TEST_R2__EU_ROW',
    campaignId: 'EpicSeparateArticleCountTest',
    isOn: true,
    locations: ['EURCountries', 'NZDCountries', 'Canada', 'International'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: true,
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
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};
