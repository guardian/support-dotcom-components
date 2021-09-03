import { ChoiceCardAmounts, EpicTest } from '@sdc/shared/src/types/epic';
import { epic } from '@sdc/shared/src/config/modules';
import { UK_DATA, EU_DATA, ROW_DATA, US_DATA, CA_DATA, NZ_DATA, CTAS } from './choiceCardsTestData';
import { CountryGroupId } from '@sdc/shared/dist/lib';
import { ArticlesViewedSettings } from '@sdc/shared/types';

const testName = '2021-09-03-EpicChoiceCardsTest';

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
            choiceCardAmounts: choiceCardAmounts,
            separateArticleCount: articlesViewedSettings ? undefined : { type: 'above' },
        },
        {
            name: EpicChoiceCardsTestVariants.variant1,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTAS.variant1,
            choiceCardAmounts: choiceCardAmounts,
            separateArticleCount: articlesViewedSettings ? undefined : { type: 'above' },
        },
        {
            name: EpicChoiceCardsTestVariants.variant2,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTAS.variant2,
            choiceCardAmounts: choiceCardAmounts,
            separateArticleCount: articlesViewedSettings ? undefined : { type: 'above' },
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    hasArticleCountInCopy: !!articlesViewedSettings,
    articlesViewedSettings,
});

export const epicChoiceCardsTests = [
    // TOP READERS /////////////////////////////////////////////////////////////
    buildEpicChoiceCardsTest(
        ['GBPCountries'],
        'UK',
        UK_DATA.TOP_READER.PARAGRAPHS,
        UK_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        UK_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    buildEpicChoiceCardsTest(
        ['UnitedStates'],
        'US',
        US_DATA.TOP_READER.PARAGRAPHS,
        US_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        US_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    buildEpicChoiceCardsTest(
        ['EURCountries'],
        'EU',
        EU_DATA.TOP_READER.PARAGRAPHS,
        EU_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        EU_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    buildEpicChoiceCardsTest(
        ['International'],
        'ROW',
        ROW_DATA.TOP_READER.PARAGRAPHS,
        ROW_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        ROW_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    buildEpicChoiceCardsTest(
        ['Canada'],
        'CA',
        CA_DATA.TOP_READER.PARAGRAPHS,
        CA_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        CA_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    buildEpicChoiceCardsTest(
        ['NZDCountries'],
        'NZ',
        NZ_DATA.TOP_READER.PARAGRAPHS,
        NZ_DATA.TOP_READER.HIGHLIGHTED_TEXT,
        NZ_DATA.AMOUNTS,
        {
            periodInWeeks: 52,
            minViews: 50,
        },
    ),

    // REGULAR READERS /////////////////////////////////////////////////////////
    buildEpicChoiceCardsTest(
        ['GBPCountries'],
        'UK',
        UK_DATA.REGULAR_READER.PARAGRAPHS,
        UK_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        UK_DATA.AMOUNTS,
    ),

    buildEpicChoiceCardsTest(
        ['UnitedStates'],
        'US',
        US_DATA.REGULAR_READER.PARAGRAPHS,
        US_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        US_DATA.AMOUNTS,
    ),

    buildEpicChoiceCardsTest(
        ['EURCountries'],
        'EU',
        EU_DATA.REGULAR_READER.PARAGRAPHS,
        EU_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        EU_DATA.AMOUNTS,
    ),

    buildEpicChoiceCardsTest(
        ['International'],
        'ROW',
        ROW_DATA.REGULAR_READER.PARAGRAPHS,
        ROW_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        ROW_DATA.AMOUNTS,
    ),

    buildEpicChoiceCardsTest(
        ['Canada'],
        'CA',
        CA_DATA.REGULAR_READER.PARAGRAPHS,
        CA_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        CA_DATA.AMOUNTS,
    ),

    buildEpicChoiceCardsTest(
        ['NZDCountries'],
        'NZ',
        NZ_DATA.REGULAR_READER.PARAGRAPHS,
        NZ_DATA.REGULAR_READER.HIGHLIGHTED_TEXT,
        NZ_DATA.AMOUNTS,
    ),
];
