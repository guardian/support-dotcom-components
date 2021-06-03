import { EpicTest } from '../../types/EpicTypes';
import { epic, epicWithArticleCountOptOut } from '../../modules';
import {
    CTA,
    HIGHLIGHTED_TEXT_NON_US,
    HIGHLIGHTED_TEXT_US,
    PARAGRAPHS_EU_ROW,
    PARAGRAPHS_UK_AUS,
    PARAGRAPHS_US,
} from './articleCountOptOutTestData';
import { CountryGroupId } from '../../lib/geolocation';

const testName = '2021-06-02-EpicArticleCountOptOutTest';

export enum EpicArticleCountOptOutTestVariants {
    control = 'control',
    new = 'new',
}

const buildEpicArticleCountOptOutTest = (
    locations: CountryGroupId[],
    suffix: string,
    paragraphs: string[],
    highlightedText: string,
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
            name: EpicArticleCountOptOutTestVariants.control,
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTA,
            separateArticleCount: { type: 'above' },
        },
        {
            name: EpicArticleCountOptOutTestVariants.new,
            modulePathBuilder: epicWithArticleCountOptOut.endpointPathBuilder,
            paragraphs: paragraphs,
            highlightedText: highlightedText,
            cta: CTA,
            separateArticleCount: { type: 'above' },
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        maxViews: 50,
        periodInWeeks: 52,
    },
});

export const epicArticleCountOptOutTests = [
    buildEpicArticleCountOptOutTest(
        ['GBPCountries', 'AUDCountries'],
        'UK_AU',
        PARAGRAPHS_UK_AUS,
        HIGHLIGHTED_TEXT_NON_US,
    ),
    buildEpicArticleCountOptOutTest(['UnitedStates'], 'US', PARAGRAPHS_US, HIGHLIGHTED_TEXT_US),
    buildEpicArticleCountOptOutTest([], 'EU_ROW', PARAGRAPHS_EU_ROW, HIGHLIGHTED_TEXT_NON_US),
];
