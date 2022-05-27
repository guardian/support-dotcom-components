import { EpicTest, EpicVariant } from '@sdc/shared/dist/types';

const sharedVariantData = {
    paragraphs: [],
    highlightedText: '',
    cta: {
        text: '',
        baseUrl: '',
    },
};

const control: EpicVariant = {
    ...sharedVariantData,
    name: 'control',
    articleCountCopy:
        "Congratulations on being one of our top readers globally - you've read %%ARTICLE_COUNT%% articles in the last year.",
};

const variant: EpicVariant = {
    ...sharedVariantData,
    name: 'variant',
    articleCountCopy:
        "You've read %%ARTICLE_COUNT%% articles in the last year, making you one of our top readers globally.",
};

export const usTopReaderCopyTest: EpicTest = {
    audience: 1,
    alwaysAsk: false,
    excludedSections: [],
    excludedTagIds: [],
    hasArticleCountInCopy: true,
    hasCountryName: false,
    highPriority: true,
    isLiveBlog: false,
    isOn: true,
    locations: ['UnitedStates'],
    name: 'usTopReaderCopyTest',
    sections: [],
    tagIds: [],
    useLocalViewLog: true,
    userCohort: 'AllNonSupporters',
    variants: [control, variant],
    articlesViewedSettings: {
        minViews: 50,
        periodInWeeks: 52,
    },
};
