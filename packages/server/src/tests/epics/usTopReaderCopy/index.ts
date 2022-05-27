import { Cta, EpicTest, EpicVariant, SeparateArticleCount } from '@sdc/shared/dist/types';

const paragraphs: string[] = [
    'Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
    'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
    'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];
const highlightedText =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.';
const cta: Cta = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};
const showChoiceCards = true;
const separateArticleCount: SeparateArticleCount = { type: 'above' };

const control: EpicVariant = {
    paragraphs,
    highlightedText,
    cta,
    showChoiceCards,
    separateArticleCount,
    name: 'control',
    articleCountCopy:
        "Congratulations on being one of our top readers globally - you've read %%ARTICLE_COUNT%% articles in the last year.",
};

const variant: EpicVariant = {
    paragraphs,
    highlightedText,
    cta,
    showChoiceCards,
    separateArticleCount,
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
