import { SecondaryCtaType } from '@sdc/shared/types';
import { EpicTest } from '@sdc/shared/types';

export const fallbackEpicTest: EpicTest = {
    name: 'FallbackEpicTest',
    priority: 99,
    status: 'Live',
    locations: [],
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
    hasCountryName: false,
    variants: [
        {
            name: 'control',
            paragraphs: [
                '… we have a small favour to ask. Millions are turning to the Guardian for open, independent, quality news every day, and readers in 180 countries around the world now support us financially.',
                'We believe everyone deserves access to information that’s grounded in science and truth, and analysis rooted in authority and integrity. That’s why we made a different choice: to keep our reporting open for all readers, regardless of where they live or what they can afford to pay. This means more people can be better informed, united, and inspired to take meaningful action.',
                'In these perilous times, a truth-seeking global news organisation like the Guardian is essential. We have no shareholders or billionaire owner, meaning our journalism is free from commercial and political influence – this makes us different. When it’s never been more important, our independence allows us to fearlessly investigate, challenge and expose those in power.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: {
                baseUrl: 'https://support.theguardian.com/contribute',
                text: 'Support the Guardian',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
};
