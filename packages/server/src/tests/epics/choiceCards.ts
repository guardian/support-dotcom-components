import { ChoiceCardAmounts, EpicTest } from '@sdc/shared/src/types/epic';
import { epic, epicWithChoiceCards } from '@sdc/shared/src/config/modules';
import { UK_DATA, EU_DATA, ROW_DATA, US_DATA, CTAS } from './choiceCardsTestData';
import { CountryGroupId } from '@sdc/shared/dist/lib';
import { ArticlesViewedSettings } from '@sdc/shared/types';

const testName = '2021-08-25-EpicChoiceCardsTest';

export enum EpicChoiceCardsTestVariants {
    control = 'control',
    variant1 = 'variant1',
    variant2 = 'variant2',
}

const buildEpicChoiceCardsTest = (
    locations: CountryGroupId[],
    suffix: string,
    paragraphs: string[],
    highlightedText: string,
    choiceCardAmounts: ChoiceCardAmounts,
    articlesViewedSettings?: ArticlesViewedSettings,
): EpicTest => ({
    name: `${testName}__${suffix}`,
    campaignId: testName,
    isOn: true,
    locations,
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
            name: EpicChoiceCardsTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTAS.control,
            separateArticleCount: { type: 'above' },
        },
        {
            name: EpicChoiceCardsTestVariants.variant1,
            modulePathBuilder: epicWithChoiceCards.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTAS.variant1,
            separateArticleCount: { type: 'above' },
        },
        {
            name: EpicChoiceCardsTestVariants.variant2,
            modulePathBuilder: epicWithChoiceCards.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTAS.variant2,
            separateArticleCount: { type: 'above' },
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    hasArticleCountInCopy: !!articlesViewedSettings,
    articlesViewedSettings,
    choiceCardAmounts,
});

export const epicChoiceCardsTests = [
    // UK_TOP_READERS
    buildEpicChoiceCardsTest(
        ['GBPCountries'],
        'UK',
        UK_DATA.REGULAR_READER.PARAGRAPHS,
        UK_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        UK_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // US_TOP_READERS
    buildEpicChoiceCardsTest(
        ['UnitedStates'],
        'US',
        US_DATA.REGULAR_READER.PARAGRAPHS,
        US_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        US_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // EU_TOP_READERS
    buildEpicChoiceCardsTest(
        ['EURCountries'],
        'EU',
        EU_DATA.REGULAR_READER.PARAGRAPHS,
        EU_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        EU_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // ROW_TOP_READERS
    buildEpicChoiceCardsTest(
        ['International'],
        'ROW',
        ROW_DATA.REGULAR_READER.PARAGRAPHS,
        ROW_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        ROW_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // UK_REGULAR_READERS
    buildEpicChoiceCardsTest(
        ['GBPCountries'],
        'UK',
        UK_DATA.REGULAR_READER.PARAGRAPHS,
        UK_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        UK_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // US_REGULAR_READERS
    buildEpicChoiceCardsTest(
        ['UnitedStates'],
        'US',
        US_DATA.REGULAR_READER.PARAGRAPHS,
        US_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        US_DATA.AMOUNTS,
    ),

    // EU_REGULAR_READERS
    buildEpicChoiceCardsTest(
        ['EURCountries'],
        'EU',
        EU_DATA.REGULAR_READER.PARAGRAPHS,
        EU_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        EU_DATA.AMOUNTS,
    ),

    // ROW_REGULAR_READERS
    buildEpicChoiceCardsTest(
        ['International'],
        'ROW',
        ROW_DATA.REGULAR_READER.PARAGRAPHS,
        ROW_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        ROW_DATA.AMOUNTS,
    ),
];
