import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022-10-31_EPIC_UKRAINE_OCT_UPDATE__EU_ROW';

export const epicProfileWithImageTest_EUROW: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['EURCountries', 'International', 'NZDCountries', 'Canada'],
    audience: 1,
    tagIds: ['world/russia', 'world/ukraine'],
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
    highPriority: true,
    useLocalViewLog: false,
    variants: [
        {
            name: 'Control',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                'Thank you for joining us from %%COUNTRY_NAME%%.',
                'Where will it all end? The conflict in Ukraine appears further than ever from resolution. Nuclear threats, mass graves, the sense that both sides are "all in".',
                "It's our job at the Guardian to decipher a rapidly changing landscape, and report the facts in sober fashion, without getting carried away. Our correspondents are on the ground in Ukraine and Russia and throughout the globe delivering round-the-clock reporting and analysis during this fluid situation.",
                "We know there is no substitute for being there - and we'll stay on the ground, as we did during the 1917 Russian Revolution, the Ukrainian famine of the 1930s, the collapse of the Soviet Union in 1991 and the first Russo-Ukrainian conflict in 2014. We have an illustrious, 200-year history of reporting throughout Europe in times of upheaval, peace and everything in between. We won't let up now.",
                "Tens of millions have placed their trust in the Guardian's fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. We'd like to invite you to join more than 1.5 million supporters from 180 countries who now power us financially - keeping us open to all, and fiercely independent.",
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital to establish the facts: who is lying and who is telling the truth.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'V2_authored_photo',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "I'm back in Ukraine, where I've spent much of this year covering Europe's biggest war since 1945. It has been the most intense time of my 30-year career. I've reported on mass graves and the aftermath of deadly bombings. I've spoken to Ukrainians tortured by Russian forces, and relatives of those murdered. The work is all-consuming.",
                "For Ukrainians, this war is an existential struggle against a new but familiar Russian imperialism. Our team of reporters and editors intend to cover this war for as long as it lasts, however expensive that may prove to be. We are committed to telling the human stories of those caught up in war, as well as the international dimension. But we can't do this without funding from Guardian readers. It is your passion, engagement and financial support which underpins our independent journalism and makes it possible for us to report from places like Ukraine.",
                'If you are able to show your support for our work today, you can do so from just %%CURRENCY_SYMBOL%%1, or give a little more on a regular basis. This makes a real difference; it will boost our resources and enhance our ability to report the truth about what is happening in this terrible conflict.',
                'Thank you.',
            ],
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
            bylineWithImage: {
                name: 'Luke Harding',
                description: 'Foreign correspondent',
                headshot: {
                    mainUrl: 'https://uploads.guim.co.uk/2017/12/26/Luke_Harding,_L.png',
                    altText: 'Luke Harding head photograph',
                },
            },
        },
    ],
};
