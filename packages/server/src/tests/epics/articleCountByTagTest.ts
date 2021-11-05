import { EpicTest } from '@sdc/shared/types';
import { epic } from '@sdc/shared/config';
import {
    CTA,
    HIGHLIGHTED_TEXT,
    CONTROL_PARAGRAPHS,
    VARIANT_PARAGRAPHS,
} from './articleCountByTagTestData';

export const ARTICLE_COUNT_BY_TAG_TEST_NAME = '2021-11-05_EpicArticleCountByTagTest';

export enum EpicArticleCountByTagTestVariants {
    control = 'control',
    v1 = 'v1',
    v2 = 'v2',
}

export const epicArticleCountByTagTest: EpicTest = {
    name: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    campaignId: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    hasArticleCountInCopy: false,
    isOn: true,
    locations: [
        'UnitedStates',
        'Canada',
        'AUDCountries',
        'NZDCountries',
        'GBPCountries',
        'EURCountries',
        'International',
    ],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    // alwaysAsk: false,
    alwaysAsk: true,
    // maxViews: {
    //     maxViewsCount: 4,
    //     maxViewsDays: 30,
    //     minDaysBetweenViews: 0,
    // },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: true,
    variants: [
        {
            name: EpicArticleCountByTagTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            // TODO: Replace with proper copy
            paragraphs: CONTROL_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            separateArticleCount: { type: 'above' },
        },
        {
            name: EpicArticleCountByTagTestVariants.v1,
            modulePathBuilder: epic.endpointPathBuilder,
            // TODO: Replace with proper copy
            paragraphs: [
                '… and in the last six weeks alone, %%ARTICLE_COUNT%% of these were about the climate crisis. Thank you for turning to the Guardian.',
                ...VARIANT_PARAGRAPHS,
            ],
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            separateArticleCount: { type: 'above' },
        },
        {
            name: EpicArticleCountByTagTestVariants.v2,
            // TODO: This one will actually have to be the new epic modules e.g epicWithClimateAC
            modulePathBuilder: epic.endpointPathBuilder,
            // TODO: Replace with proper copy
            paragraphs: ['… thank you for turning to the Guardian.', ...VARIANT_PARAGRAPHS],
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            separateArticleCount: { type: 'above' },
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    articlesViewedByTagSettings: {
        minViews: 5,
        periodInWeeks: 6,
        tagIds: ['environment/climate-change', 'environment/environment'],
    },
};
