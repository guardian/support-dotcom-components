import { EpicTargeting, EpicTest, SecondaryCtaType } from '@sdc/shared/types';
import { inSingleContributorPropensityTest } from './singleContributorPropensityData';
import {
    GLOBAL_PARAGRAPHS,
    HIGHLIGHTED_TEXT,
    UK_AU_US_PARAGRAPHS,
    US_HIGHLIGHTED_TEXT,
    VARIANT_HIGHLIGHTED_TEXT,
} from './singleContributorPropensityTestCopy';
import { CountryGroupId } from '@sdc/shared/dist/lib';

const singleContributorPropensityTest = (
    suffix: string,
    paragraphs: string[],
    controlHighlightedText: string,
    hasCountryName: boolean,
    locations: CountryGroupId[],
): EpicTest => ({
    name: `2021-10-18_SingleContributorPropensityTest__${suffix}`,
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
    hasCountryName: false,
    variants: [
        {
            name: 'control',
            paragraphs,
            highlightedText: controlHighlightedText,
            cta: {
                baseUrl: 'https://support.theguardian.com/contribute',
                text: 'Continue',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            defaultChoiceCardFrequency: 'MONTHLY',
        },
        {
            name: 'variant',
            paragraphs,
            highlightedText: VARIANT_HIGHLIGHTED_TEXT,
            cta: {
                baseUrl: 'https://support.theguardian.com/contribute',
                text: 'Continue',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            defaultChoiceCardFrequency: 'ONE_OFF',
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
    canShow: (targeting: EpicTargeting): boolean =>
        targeting.showSupportMessaging &&
        !!targeting.browserId &&
        inSingleContributorPropensityTest(targeting.browserId),
});

export const singleContributorPropensityTests = [
    singleContributorPropensityTest('US', UK_AU_US_PARAGRAPHS, US_HIGHLIGHTED_TEXT, false, [
        'UnitedStates',
    ]),
    singleContributorPropensityTest('UK_AUS', UK_AU_US_PARAGRAPHS, HIGHLIGHTED_TEXT, false, [
        'GBPCountries',
        'AUDCountries',
    ]),
    singleContributorPropensityTest('GLOBAL', GLOBAL_PARAGRAPHS, HIGHLIGHTED_TEXT, true, []),
];
