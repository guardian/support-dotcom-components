import { EpicTest } from '@sdc/shared/types';
import { Factory } from 'fishery';

export default Factory.define<EpicTest>(({ factories }) => ({
    name: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
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
    variants: factories.epicVariant.buildList(1),
    hasArticleCountInCopy: false,
}));
