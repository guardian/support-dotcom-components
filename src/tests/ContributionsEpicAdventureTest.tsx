import { Test } from '../lib/variants';
import { epicAdventure } from '../modules';
import { Adventure, buildAdventure } from '../lib/adventure';
import { replaceArticleCount } from '../lib/replaceArticleCount';
import { replaceNonArticleCountPlaceholders } from '../lib/placeholders';

export const contributionsAdventure: Adventure = buildAdventure([
    {
        name: 'start',
        paragraphs: () => [
            `Would you be surprised to hear that you're one of our top readers globally?`,
        ],
        options: [
            {
                targetName: 'article-count',
                text: 'Yes!',
            },
            {
                targetName: 'article-count',
                text: 'No',
            },
        ],
    },
    {
        name: 'article-count',
        paragraphs: info => [
            replaceArticleCount(
                `Well - you've read %%ARTICLE_COUNT%% articles in the last year! And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity.`,
                info.numArticles,
                'epic',
            ),
            'Would you like to know how readers are supporting the Guardian?',
        ],
        options: [
            {
                targetName: 'supporters',
                text: 'Yes',
            },
            {
                targetName: 'no',
                text: 'No',
            },
        ],
    },
    {
        name: 'supporters',
        paragraphs: info => [
            `Our readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries${replaceNonArticleCountPlaceholders(
                ' - including %%COUNTRY_NAME%%',
                info.countryCode,
            )}.`,
        ],
        options: [
            {
                targetName: 'why',
                text: 'Why should I support the Guardian?',
            },
        ],
    },
    {
        name: 'why',
        paragraphs: () => [
            'With your help, we will continue to provide high-impact reporting that can counter misinformation and offer an authoritative, trustworthy source of news for everyone. With no shareholders or billionaire owner, we set our own agenda and provide truth-seeking journalism that’s free from commercial and political influence. When it’s never mattered more, we can investigate and challenge without fear or favour.',
        ],
        options: [
            {
                targetName: 'yes',
                text: 'Count me in!',
            },
            {
                targetName: 'no',
                text: `I'll pass`,
            },
        ],
    },
    {
        name: 'no',
        paragraphs: () => [
            `That's ok. Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.`,
        ],
        options: [],
    },
    {
        name: 'yes',
        paragraphs: () => [
            'Great! If there were ever a time to join us, it is now. You can power Guardian journalism and help sustain our future.',
        ],
        options: [],
    },
]);

export const contributionsEpicAdventureTest = (): Promise<Test> => {
    return Promise.resolve({
        name: 'ContributionsEpicAdventure',
        expiry: '2025-01-27',
        campaignId: 'ContributionsEpicAdventure',
        isOn: true,
        locations: [],
        audience: 1,
        tagIds: [],
        sections: [],
        excludedTagIds: [],
        excludedSections: [],
        alwaysAsk: true,
        userCohort: 'AllNonSupporters',
        isLiveBlog: false,
        hasCountryName: false,
        variants: [
            {
                name: 'control',
                paragraphs: [],
                modulePathBuilder: epicAdventure.endpointPathBuilder,
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support the Guardian',
                },
                highlightedText:
                    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
                adventure: contributionsAdventure,
            },
        ],
        highPriority: false,
        useLocalViewLog: false,
    });
};
