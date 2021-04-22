import { Test } from '../lib/variants';
import { epicAdventure } from '../modules';
import { Adventure, buildAdventure } from '../lib/adventure';

export const productChooser: Adventure | null = buildAdventure([
    {
        name: 'start',
        paragraphs: [
            `You've read 73 articles in the last year… we have a small favour to ask. Through these challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially either through contributions or subscriptions more than 1.5 million times in 2020, joining supporters in 180 countries.`,
            `Would you be willing to support us financially?`,
        ],
        options: [
            {
                targetName: 'subscriptions',
                text: 'Tell me about your subscriptions',
            },
            {
                targetName: 'start',
                text: 'Just let me give you some money',
                href: 'https://support.theguardian.com/',
            },
            {
                targetName: 'help',
                text: 'I’m not sure what’s best!',
                subtext:
                    'We will ask you a few questions to determine which option best matches your preferences.',
            },
        ],
    },
    {
        name: 'subscriptions',
        paragraphs: [
            `Well - you've read %%ARTICLE_COUNT%% articles in the last year! And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity.`,
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
        paragraphs: [
            'Our readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries - including %%COUNTRY_NAME%%.',
        ],
        options: [
            {
                targetName: 'supporters',
                text: 'Why should I support the Guardian?',
            },
        ],
    },
    {
        name: 'help',
        paragraphs: [
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
        paragraphs: [
            `That's ok. Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.`,
        ],
        options: [],
    },
    {
        name: 'yes',
        paragraphs: [
            'Great! If there were ever a time to join us, it is now. You can power Guardian journalism and help sustain our future.',
        ],
        options: [],
    },
]);

export const productChooserEpicTest = (): Promise<Test> => {
    if (productChooser) {
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
                    adventure: productChooser,
                },
            ],
            highPriority: false,
            useLocalViewLog: false,
        });
    }
    return Promise.reject('Invalid adventure');
};
