import { EpicTest } from '@sdc/shared/types';

export const newsletterEpicTest: EpicTest = {
    name: 'NewsletterEpicTest',
    status: 'Live',
    locations: [
        'GBPCountries',
        'UnitedStates',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    audience: 1,
    tagIds: ['football/football'],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    articlesViewedSettings: {
        maxViews: 2,
        minViews: 0,
        periodInWeeks: 52,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    variants: [
        {
            name: 'control',
            heading: 'Sign up to the Fiver',
            paragraphs: [
                "Kick off your evenings with the Guardian's take on the world of football",
            ],
            newsletterSignup: {
                url: 'https://www.theguardian.com/email/form/plaintone/rrcp-epic/4163',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
};
