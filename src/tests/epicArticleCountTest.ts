import { Cta, Test } from '../lib/variants';
import { epic, epicACAbove, epicACInline } from '../modules';

export enum EpicSeparateArticleCountTestVariants {
    control = 'control',
    above = 'above',
    inline = 'inline',
}

const cta: Cta = {
    text: 'Support The Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const heading = 'Since you’re here...';
const controlFirstParagraph =
    '… and it’s nearly the end of the year, we have a small favour to ask. You’ve read %%ARTICLE_COUNT%% articles this year. And you’re not alone; millions have turned to the Guardian for vital, independent, quality journalism throughout a turbulent and challenging 2020. Readers in 180 countries around the world, including %%COUNTRY_NAME%%, now support us financially. Will you join them?';
const variantFirstParagraph =
    '… and it’s nearly the end of the year, we have a small favour to ask. Millions have turned to the Guardian for vital, independent, quality journalism throughout a turbulent and challenging 2020. Readers in 180 countries around the world, including %%COUNTRY_NAME%%, now support us financially. Will you join them?';

const paragraphs = (firstParagraph: string): string[] => [
    firstParagraph,
    'We believe everyone deserves access to information that’s grounded in science and truth, and analysis rooted in authority and integrity. That’s why we made a different choice: to keep our reporting open for all readers, regardless of where they live or what they can afford to pay. This means more people can be better informed, united, and inspired to take meaningful action.',
    'In these perilous times, a truth-seeking global news organisation like the Guardian is essential. We have no shareholders or billionaire owner, meaning our journalism is free from commercial and political influence – this makes us different. When it’s never been more important, our independence allows us to investigate fearlessly, and challenge those in power.',
    'In this unprecedented year of intersecting crises, we have done just that, with revealing journalism that had real-world impact: the inept handling of the Covid-19 crisis, the Black Lives Matter protests, and the tumultuous US election.',
    'We have enhanced our reputation for urgent, powerful reporting on the climate emergency, and moved to practice what we preach, rejecting advertising from fossil fuel companies, divesting from oil and gas companies and setting a course to achieve net zero emissions by 2030.',
    'If there were ever a time to join us, it is now. Your funding powers our journalism, it protects our independence, and ensures we can remain open for all. You can support us through these challenging economic times and enable real-world impact.',
    'Every contribution, however big or small, makes a real difference for our future.',
];

const highlightedText =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.';

export const epicSeparateArticleCountTest: Test = {
    name: 'EpicSeparateArticleCountTest',
    expiry: '2021-05-01',
    campaignId: 'EpicSeparateArticleCountTest',
    isOn: true,
    locations: ['GBPCountries', 'EURCountries', 'International', 'Canada', 'NZDCountries'],
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
            heading: heading,
            paragraphs: paragraphs(controlFirstParagraph),
            highlightedText,
            name: EpicSeparateArticleCountTestVariants.control,
            cta,
            modulePath: epic.endpointPath,
        },
        {
            heading: heading,
            paragraphs: paragraphs(variantFirstParagraph),
            highlightedText,
            name: EpicSeparateArticleCountTestVariants.above,
            cta,
            modulePath: epicACAbove.endpointPath,
        },
        {
            heading: heading,
            paragraphs: paragraphs(variantFirstParagraph),
            highlightedText,
            name: EpicSeparateArticleCountTestVariants.inline,
            cta,
            modulePath: epicACInline.endpointPath,
        },
    ],
    highPriority: true,
    useLocalViewLog: true,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};
