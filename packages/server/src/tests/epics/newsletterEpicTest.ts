import { EpicTest } from '@sdc/shared/types';

export const newsletterEpicTest: EpicTest = {
    name: 'NewsletterEpicTest',
    status: 'Live',
    locations: [],
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
            heading: 'Sign up to First Edition, our free daily newsletter',
            paragraphs: ['Every weekday morning at 7am BST'],
            newsletterSignup: {
                url: 'https://www.theguardian.com/email/form/plain/epic/morning-briefing',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
};
