import { EpicTest } from '@sdc/shared/types';
import { epic, epicACByTag } from '@sdc/shared/config';
import {
    CTA,
    GLOBAL_HIGHLIGHTED_TEXT,
    US_HIGHLIGHTED_TEXT,
    CONTROL_PARAGRAPHS,
    VARIANT1_PARAGRAPHS,
    VARIANT2_PARAGRAPHS,
} from './articleCountByTagTestData';
import { CountryGroupId } from '@sdc/shared/lib';

export const ARTICLE_COUNT_BY_TAG_TEST_NAME = '2021-11-05_EpicArticleCountByTagTest';

export enum EpicArticleCountByTagTestVariants {
    control = 'control',
    v1 = 'v1',
    v2 = 'v2',
}

const buildEpicArticleCountByTagTest = (
    highlightedText: string,
    countries: CountryGroupId[],
): EpicTest => ({
    name: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    campaignId: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    hasArticleCountInCopy: false,
    isOn: true,
    locations: countries,
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
            paragraphs: CONTROL_PARAGRAPHS,
            highlightedText,
            cta: CTA,
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: EpicArticleCountByTagTestVariants.v1,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: VARIANT1_PARAGRAPHS,
            highlightedText,
            cta: CTA,
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: EpicArticleCountByTagTestVariants.v2,
            modulePathBuilder: epicACByTag.endpointPathBuilder,
            paragraphs: VARIANT2_PARAGRAPHS,
            highlightedText,
            cta: CTA,
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
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
});

export const epicArticleCountByTagTestGlobal = buildEpicArticleCountByTagTest(
    GLOBAL_HIGHLIGHTED_TEXT,
    ['Canada', 'AUDCountries', 'NZDCountries', 'GBPCountries', 'EURCountries', 'International'],
);
export const epicArticleCountByTagTestUS = buildEpicArticleCountByTagTest(US_HIGHLIGHTED_TEXT, [
    'UnitedStates',
]);
