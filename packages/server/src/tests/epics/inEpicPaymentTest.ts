import { EpicTest, SecondaryCtaType } from '@sdc/shared/types';
import { epic, epicWithCheckout } from '@sdc/shared/config';
import { CTA, HIGHLIGHTED_TEXT, PARAGRAPHS } from './inEpicPaymentTestData';

export const inEpicPaymentTestDraft: EpicTest = {
    name: 'InEpicPaymentTestDraft',
    campaignId: 'InEpicPaymentTestDraft',
    hasArticleCountInCopy: false,
    isOn: true,
    locations: [
        'GBPCountries',
        'EURCountries',
        'UnitedStates',
        'Canada',
        'AUDCountries',
        'NZDCountries',
        'International',
    ],
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
            name: 'control',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'variant',
            modulePathBuilder: epicWithCheckout.endpointPathBuilder,
            paragraphs: PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};
