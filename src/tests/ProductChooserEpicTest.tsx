import { Test } from '../lib/variants';
import { epicChooser } from '../modules';
import { Adventure, buildAdventure } from '../lib/adventure';

export const productChooser: Adventure | null = buildAdventure([
    {
        name: 'start',
        paragraphs: [
            `You've read %%ARTICLE_COUNT%% articles in the last year`,
            `…we have a small favour to ask. Through these challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially either through contributions or subscriptions more than 1.5 million times in 2020, joining supporters in 180 countries.`,
            `We have flexible ways to support us to suit your budget and needs.`,
            'Would you be able to join them in supporting us financially?',
        ],
        options: [
            {
                targetName: 'help',
                text: 'Yes, help me decide',
            },
            {
                targetName: 'end',
                text: 'Not now',
            },
            // {
            //     targetName: 'start',
            //     text: 'Contribute',
            //     href: 'https://support.theguardian.com/uk/contribute',
            // },
            // {
            //     targetName: 'subscriptions',
            //     text: 'Subscribe',
            // },
        ],
    },
    {
        name: 'help',
        paragraphs: [
            'Unlike many others, we have chosen to keep Guardian journalism open for all readers, regardless of where ' +
                'they live or what they can afford to pay. We do this because we believe in information equality, where ' +
                'everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying ' +
                'well-informed on world events, and being inspired to take meaningful action.',
            'If you have £5.99 or more to spend every month, you can opt to have something in return for your support, such as ad free or printed news.',
            'Would you like something in return, or prefer to contribute from just £1?',
        ],
        options: [
            {
                targetName: 'subscriptions',
                text: "I'd like something in return",
            },
            {
                targetName: 'help',
                text: `I'd like to contribute`,
                href: 'https://support.theguardian.com/uk/contribute',
            },
        ],
    },
    {
        name: 'subscriptions',
        paragraphs: [
            `A subscription is a great way to make the most of our journalism and support our work in the process. If there were ever a time to join us, it is now.`,
            'How do you like to read the Guardian?',
        ],
        options: [
            {
                targetName: 'digital',
                text: 'Website/App',
            },
            {
                targetName: 'paper',
                text: 'On printed paper',
            },
            {
                targetName: 'paper',
                text: 'Both',
            },
        ],
    },
    {
        name: 'digital',
        paragraphs: [
            'We’re free to give voice to the voiceless. The unheard. The powerless. Become a digital subscriber today and help to fund our vital work.',
            `With two innovative apps and ad-free reading, a digital subscription gives you the richest experience of Guardian journalism. Plus, for a limited time, you can read our latest special edition - The books of 2021`,
            `From just £5.99 you can take out a digital subscription, or you can contribute from just £1`,
        ],
        options: [
            {
                targetName: 'digital',
                text: 'Subscribe now',
                href: `https://support.theguardian.com/subscribe/digital/checkout?promoCode=DK0NT24WG&period=Monthly`,
            },
            {
                targetName: 'digital',
                text: 'Contribute',
                href: 'https://support.theguardian.com/uk/contribute',
            },
        ],
    },
    {
        name: 'paper',
        paragraphs: [
            `Many readers in %%COUNTRY_NAME%% enjoy a regular printed source of news, opinion and long reads.`,
            `You can keep up with today's news, or catch up on the weekend, to suit your lifestyle and budget.`,
        ],
        options: [
            {
                targetName: 'weekend',
                text: 'Weekend catchup',
            },
            {
                targetName: 'daily',
                text: 'Weekdays',
            },
        ],
    },
    {
        name: 'weekend',
        paragraphs: [
            `The Guardian Weekly magazine is a round-up of the world news, opinion and long reads that have shaped the week. Inside, the past seven days' most memorable stories are reframed with striking photography and insightful companion pieces, all handpicked from The Guardian and The Observer.`,
            `The Saturday Guardian and Observer on Sunday cover the latest UK and international news, as well as our supplements and features to get you through the weekend.`,
        ],
        options: [
            {
                targetName: 'weekend',
                text: 'Guardian Weekly',
                href: 'https://support.theguardian.com/subscribe/weekly/checkout?period=SixWeekly',
            },
            {
                targetName: 'weekend',
                text: 'Weekend Newspaper',
                href:
                    'https://support.theguardian.com/subscribe/paper/checkout?fulfilment=HomeDelivery&product=Weekend',
            },
        ],
    },
    {
        name: 'daily',
        paragraphs: [
            `For readers prepared to spend up to £67.99 a month, Our every day print subscriptions keep you up to date.`,
            `If your budget is tight, you can get a curated daily edition from just £5.99 through our digital subscription`,
        ],
        options: [
            {
                targetName: 'daily',
                text: 'Print Delivery',
                href:
                    'https://support.theguardian.com/subscribe/paper/checkout?fulfilment=HomeDelivery&product=Everyday',
            },
            {
                targetName: 'daily',
                text: 'Digital Subscription',
                href: `https://support.theguardian.com/subscribe/digital/checkout?promoCode=DK0NT24WG&period=Monthly`,
            },
        ],
    },
    {
        name: 'end',
        paragraphs: [
            `Thanks for letting us know.`,
            `If things change in future, we appreciate single contributions from just £1`,
        ],
        options: [
            {
                targetName: 'digital',
                text: 'Contribute',
                href: 'https://support.theguardian.com/uk/contribute',
            },
        ],
    },
]);

export const productChooserEpicTest = (): Promise<Test> => {
    if (productChooser) {
        return Promise.resolve({
            name: 'ProductChooserEpic',
            expiry: '2025-01-27',
            campaignId: 'ProductChooserEpic',
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
                    modulePathBuilder: epicChooser.endpointPathBuilder,
                    adventure: productChooser,
                },
            ],
            highPriority: false,
            useLocalViewLog: false,
        });
    }
    return Promise.reject('Invalid adventure');
};
