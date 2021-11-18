import { EpicTest, SecondaryCtaType } from '@sdc/shared/types';
import { epic, epicACByTag } from '@sdc/shared/config';
import { Copy, GLOBAL_COPY, US_COPY, CTA } from './articleCountByTagTestData';
import { CountryGroupId } from '@sdc/shared/lib';

export const ARTICLE_COUNT_BY_TAG_TEST_NAME = '2021-11-18_EpicArticleCountByTagTest';

export enum EpicArticleCountByTagTestVariants {
    control = 'control',
    v1 = 'v1',
    v2 = 'v2',
}

const buildEpicArticleCountByTagTest = (
    copy: Copy,
    countries: CountryGroupId[],
    suffix: string,
): EpicTest => ({
    name: `${ARTICLE_COUNT_BY_TAG_TEST_NAME}__${suffix}`,
    campaignId: `${ARTICLE_COUNT_BY_TAG_TEST_NAME}__${suffix}`,
    hasArticleCountInCopy: false,
    isOn: true,
    locations: countries,
    audience: 1,
    tagIds: ['environment/environment'],
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
            name: EpicArticleCountByTagTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: copy.controlParagraphs,
            highlightedText: copy.highlightedText,
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: EpicArticleCountByTagTestVariants.v1,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: copy.v1Paragraphs,
            highlightedText: copy.highlightedText,
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: EpicArticleCountByTagTestVariants.v2,
            modulePathBuilder: epicACByTag.endpointPathBuilder,
            paragraphs: copy.v2Paragraphs,
            highlightedText: copy.highlightedText,
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
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
        tagId: 'environment/environment',
    },
});

export const epicArticleCountByTagTestGlobal = buildEpicArticleCountByTagTest(
    GLOBAL_COPY,
    ['Canada', 'AUDCountries', 'NZDCountries', 'GBPCountries', 'EURCountries', 'International'],
    'Global',
);
export const epicArticleCountByTagTestUS = buildEpicArticleCountByTagTest(
    US_COPY,
    ['UnitedStates'],
    'US',
);
