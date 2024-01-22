import { EpicTest } from '@sdc/shared/dist/types';

const lessThanFiftyTest = '2024-01-22_article_count_copy_less_than_fifty';

export const epicArticleCountCopyLessThanFifty: EpicTest = {
    name: lessThanFiftyTest,
    campaignId: lessThanFiftyTest,
    hasArticleCountInCopy: true,
    status: 'Live',
    locations: ['GBPCountries', 'AUDCountries', 'EURCountries', 'UnitedStates', 'International'], // is this right? doesn't map exactly to the spec
    audience: 1, // not sure
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false, // not sure
    userCohort: 'Everyone', // is this right? should supporters be excluded?
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: true, // not sure!
    useLocalViewLog: false, // ?
    articlesViewedSettings: {
        minViews: 0,
        maxViews: 50,
        periodInWeeks: 52,
    },

    variants: [
        {
            name: 'control',
            paragraphs: ['ToDo less than fifty control'],
            separateArticleCount: {
                type: 'above',
                copy: 'You’ve read %%ARTICLE_COUNT%% articles in the last year',
            },
        },
        {
            name: 'variant',
            paragraphs: ['ToDo less than fifty variant'],
            separateArticleCount: {
                type: 'above',
                copy: 'You’ve chosen to read %%ARTICLE_COUNT%% articles in the last year',
            },
        },
    ],
};

const moreThanFiftyTest = '2024-01-22_article_count_copy_more_than_fifty';

export const epicArticleCountCopyMoreThanFifty: EpicTest = {
    name: moreThanFiftyTest,
    campaignId: moreThanFiftyTest,
    hasArticleCountInCopy: true,
    status: 'Live',
    locations: ['GBPCountries', 'AUDCountries', 'EURCountries', 'UnitedStates', 'International'], // is this right? doesn't map exactly to the spec
    audience: 1, // not sure
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false, // not sure
    userCohort: 'Everyone', // is this right? should supporters be excluded?
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: true, // not sure!
    useLocalViewLog: false, // ?
    articlesViewedSettings: {
        minViews: 50,
        periodInWeeks: 52,
    },
    variants: [
        {
            name: 'control',
            paragraphs: ['ToDo more than fifty control'],
            separateArticleCount: {
                type: 'above',
                copy: 'Congratulations on being one of our top readers globally – you’ve read %%ARTICLE_COUNT%% articles in the last year',
            },
        },
        {
            name: 'variant',
            paragraphs: ['ToDo more than fifty variant'],
            separateArticleCount: {
                type: 'above',
                copy: 'Congratulations on being one of our top readers globally – you’ve chosen to read %%ARTICLE_COUNT%% articles in the last year',
            },
        },
    ],
};
