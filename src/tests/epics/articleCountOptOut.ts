import { Epic } from 'components/modules/shared/ArticleCountOptOutOverlay.stories';
import { EpicTest } from '../../types/EpicTypes';
import { epic } from '../../modules';
import { SHARED_PARAGRAPHS, HIGHLIGHTED_TEXT, CTA } from './articleCountOptOutTestData';

export enum EpicArticleCountOptOutTestVariants {
    control = 'control',
    new = 'new',
}

export const EpicArticleCountOptOutTest: EpicTest = {
    name: 'EpicArticleCountOptOutTest',
    campaignId: 'EpicArticleCountOptOutTest',
    isOn: true,
    locations: ['GBPCountries', 'AUDCountries'],
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
            paragraphs: SHARED_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
        {
            name: EpicArticleCountOptOutTestVariants.new,
            modulePathBuilder: epicACAbove.endpointPathBuilder,
            paragraphs: UK_AUS_VARIANTS_PARAGRAPHS,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};
