import { EpicTest } from '@sdc/shared/types';
import { topUpEpic } from '@sdc/shared/src/config/modules';

export const topUpTest: EpicTest = {
    name: `2021-11-03-TopUpTest`,
    campaignId: '2021-11-03-TopUpTest',
    isOn: true,
    locations: ['GBPCountries'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters', //TODO
    isLiveBlog: false,
    hasCountryName: true,
    variants: [
        {
            name: 'control',
            modulePathBuilder: topUpEpic.endpointPathBuilder,
            paragraphs: [],
        },
        {
            name: 'variant',
            modulePathBuilder: topUpEpic.endpointPathBuilder,
            paragraphs: [],
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    hasArticleCountInCopy: false,
};
