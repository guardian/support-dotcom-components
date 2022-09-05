import { EpicTest, SecondaryCtaType } from '@sdc/shared/types';
export const epicNewsletterFirstEdition_uk: EpicTest = {
    name: '2022-09-01_NL_first-edition_epic',
    status: 'Live',
    locations: ['GBPCountries'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: ['football/football'],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    articlesViewedSettings: {
        maxViews: 2,
        minViews: 0,
        periodInWeeks: 52,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
    variants: [
        {
            name: 'control',
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            paragraphs: [
                '… we have a small favour to ask. Tens of millions have placed their trust in the Guardian’s fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: {
                text: 'Continue',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
        },
        {
            name: 'newsletter_signup',
            heading: 'Sign up to First Edition',
            paragraphs: [
                "Scroll less and understand more with the Guardian's First Edition newsletter. It's free, easy to digest and sheds light on the day's top stories.  From breaking global news to politics, opinion, culture and sport - editor Archie Bland and assistant editor Nimo Omer bring you some clarity before the morning rush by 7am each weekday.",
                "Tens of millions have placed their trust in the Guardian's fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. By asking you to sign up to our newsletter, we're inviting you to be one of the millions of readers championing our independent journalism. With no shareholders or billionaire owner, our reporting is never manipulated or silenced by corporate or political ties.",
                'This newsletter is free for everyone to read, in the same way we keep our journalism open to all - an antidote to paywalls and exclusivity. Every act of involvement and participation with the Guardian, however big or small, helps to enable our mission for fairness and information equality.',
                'Sign up for the First Edition newsletter now - it takes less than a minute. If you have some time, browse through our other newsletters to receive more exciting insights and in-depth reads on the topics that matter to you.',
            ],
            newsletterSignup: {
                url: 'https://www.theguardian.com/email/form/plaintone/rrcp-epic/4156',
            },
        },
    ],
};

export const epicNewsletterMorningMail_au: EpicTest = {
    name: '2022-09-01_NL_morning-mail_epic',
    status: 'Live',
    locations: ['AUDCountries'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: ['football/football'],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    articlesViewedSettings: {
        maxViews: 2,
        minViews: 0,
        periodInWeeks: 52,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
    variants: [
        {
            name: 'control',
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            paragraphs: [
                '… we have a small favour to ask. Tens of millions have placed their trust in the Guardian’s fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: {
                text: 'Continue',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
        },
        {
            name: 'newsletter_signup',
            heading: 'Sign up to Morning Mail',
            paragraphs: [
                'Our daily email breaks down the key stories of the day and why they matter',
            ],
            newsletterSignup: {
                url: 'https://www.theguardian.com/email/form/plaintone/rrcp-epic/4148',
            },
        },
    ],
};

export const epicNewsletterFirstThing_us: EpicTest = {
    name: '2022-09-01_NL_first-thing_epic',
    status: 'Live',
    locations: ['UnitedStates'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: ['football/football'],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    articlesViewedSettings: {
        maxViews: 2,
        minViews: 0,
        periodInWeeks: 52,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
    variants: [
        {
            name: 'control',
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            paragraphs: [
                '… we have a small favour to ask. Tens of millions have placed their trust in the Guardian’s fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: {
                text: 'Continue',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
        },
        {
            name: 'newsletter_signup',
            heading: 'Sign up to First Thing',
            paragraphs: [
                'Our daily email breaks down the key stories of the day and why they matter',
            ],
            newsletterSignup: {
                url:
                    'https://www.theguardian.com/email/form/plaintone/rrcp-epic/us-morning-newsletter',
            },
        },
    ],
};

export const epicNewsletterFiver_all: EpicTest = {
    name: '2022-09-01_NL_fiver_epic',
    status: 'Live',
    locations: [
        'GBPCountries',
        'UnitedStates',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    audience: 1,
    tagIds: ['football/football'],
    sections: [],
    excludedTagIds: ['sport/series/sexual-abuse-in-sport', 'football/hillsborough-disaster'],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    articlesViewedSettings: {
        maxViews: 2,
        minViews: 0,
        periodInWeeks: 52,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: false,
    useLocalViewLog: false,
    hasArticleCountInCopy: false,
    variants: [
        {
            name: 'control',
            separateArticleCount: {
                type: 'above',
            },
            showChoiceCards: true,
            paragraphs: [],
            image: {
                mainUrl:
                    'https://i.guim.co.uk/img/media/fba3e8b9923987c859c4f2b3f198b2902d49fe94/69_19_1026_2831/725.jpg?quality=85&s=1d3ff5fcb4a8432fe15b23438b8f387e',
                altText:
                    'Image of a cartoon strip by David Squires, asking if you would be willing to help support the Guardian',
            },
            cta: {
                text: 'Continue',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: {
                type: SecondaryCtaType.ContributionsReminder,
            },
        },
        {
            name: 'newsletter_signup',
            heading: 'Sign up to the Fiver',
            paragraphs: [
                "Kick off your evenings with the Guardian's take on the world of football",
            ],
            newsletterSignup: {
                url: 'https://www.theguardian.com/email/form/plaintone/rrcp-epic/4163',
            },
        },
    ],
};
