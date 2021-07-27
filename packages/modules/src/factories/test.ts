import { Factory } from 'fishery';
import { EpicTest } from '../types/EpicTypes';

export default Factory.define<EpicTest>(({ factories }) => ({
    name: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
    isOn: true,
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
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    variants: factories.variant.buildList(1),
    hasArticleCountInCopy: false,
}));
