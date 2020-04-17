import { Test } from '../lib/variants';
import { cacheAsync } from '../lib/cache';
import { fetchDefaultEpicContent } from '../api/contributionsApi';

export const askFourEarningHardcodedTest = async (): Promise<Test> => {
    const fiveMinutes = 60 * 5;
    const [, fetchDefaultEpicContentCached] = cacheAsync(fetchDefaultEpicContent, fiveMinutes);
    const defaultEpicVariant = await fetchDefaultEpicContentCached();

    return {
        name: 'ContributionsEpicAskFourEarning',
        start: '2017-01-24',
        expiry: '2021-01-27',
        author: 'Jonathan Rankin',
        description:
            'This places the epic on all articles for all users, with a limit of 4 impressions in any given 30 days',
        successMeasure: 'Conversion rate',
        idealOutcome: 'Acquires many Supporters',
        audienceCriteria: 'All',
        campaignId: 'kr1_epic_ask_four_earning',
        isOn: true,
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
                ...defaultEpicVariant,
                name: 'control',
            },
        ],
        highPriority: false,
        useLocalViewLog: false,
    };
};
