import { CountryGroupId } from '@sdc/shared/dist/lib';
import { EpicTest } from '@sdc/shared/dist/types';
import { epic } from '@sdc/shared/dist/config/modules';

export const ARTICLE_COUNT_BY_TAG_TEST_NAME = '2022-09-05_EpicEnvironmentArticleCountTest';

const HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.';

const buildParagraphs = (hasCountryName: boolean) => [
    `… ${
        hasCountryName ? 'as you’re joining us today from %%COUNTRY_NAME%%, ' : ''
    }we have a small favour to ask. Tens of millions have placed their trust in the Guardian’s fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.`,
    'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
    'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
    'Every contribution, however big or small, powers our journalism and sustains our future.',
];

const CTA = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const buildEnvironmentArticleCountTest = (
    countries: CountryGroupId[],
    paragraphs: string[],
): EpicTest => ({
    name: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    campaignId: ARTICLE_COUNT_BY_TAG_TEST_NAME,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: countries,
    audience: 1,
    tagIds: ['environment/environment'],
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
            name: 'control',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            separateArticleCount: { type: 'above', countType: 'for52Weeks' },
            showChoiceCards: true,
        },
        {
            name: 'v1',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs,
            highlightedText: HIGHLIGHTED_TEXT,
            cta: CTA,
            separateArticleCount: {
                type: 'above',
                countType: 'forTargetedWeeks',
                copy:
                    "Congratulations on being one of our top readers of climate journalism - did you know you've read %%ARTICLE_COUNT%% articles about the climate crisis in the last year?",
            },
            showChoiceCards: true,
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 20,
        periodInWeeks: 52,
        tagId: 'environment/environment',
    },
});

export default [
    buildEnvironmentArticleCountTest(['International', 'EURCountries'], buildParagraphs(true)),
    buildEnvironmentArticleCountTest([], buildParagraphs(false)),
];
