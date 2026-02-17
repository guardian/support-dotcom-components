import type { EpicTest, EpicVariant } from '../../shared/types';

type EpicTestFactoryParams = {
    variants?: EpicVariant[];
};

export default (overrides?: Partial<EpicTest> & EpicTestFactoryParams): EpicTest => ({
    channel: 'Epic',
    name: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
    priority: 1,
    status: 'Live',
    locations: [],
    tagIds: ['environment/series/the-polluters', 'environment/environment'],
    sections: ['environment'],
    excludedTagIds: ['world/coronavirus-outbreak'],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'Everyone',
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    variants: [],
    hasArticleCountInCopy: false,
    ...overrides,
});
