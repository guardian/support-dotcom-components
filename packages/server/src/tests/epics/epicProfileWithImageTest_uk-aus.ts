import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022-06-13_Harding_Hardcoded__UK-AUS';

export const epicProfileWithImageTest_UKAUS: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['GBPCountries', 'AUDCountries'],
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
    hasCountryName: false,
    highPriority: true,
    useLocalViewLog: false,
    variants: [
        {
            name: 'Control',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "Russia's invasion of Ukraine has abruptly transformed the world. Millions of people have already fled. A new Iron Curtain is grinding into place. An economic war deepens, as the military conflict escalates, civilian casualties rise and evidence of horrific war crimes mounts.",
                "It's our job at the Guardian to decipher a rapidly changing landscape, particularly when it involves a mounting refugee crisis and the risk of unthinkable escalation. Our correspondents are on the ground in Ukraine and throughout the globe delivering round-the-clock reporting and analysis during this perilous situation.",
                "We know there is no substitute for being there – and we'll stay on the ground, as we did during the 1917 Russian Revolution, the Ukrainian famine of the 1930s, the collapse of the Soviet Union in 1991 and the first Russo-Ukrainian conflict in 2014. We have an illustrious, 200-year history of reporting throughout Europe in times of upheaval, peace and everything in between. We won't let up now.",
                "Tens of millions have placed their trust in the Guardian's fearless journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. We'd like to invite you to join more than 1.5 million supporters from 180 countries who now power us financially – keeping us open to all, and fiercely independent.",
                'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital to establish the facts: who is lying and who is telling the truth.',
                'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
                'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'V1_authored_plain',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "I write from Ukraine, where I've spent much of the past six months, reporting on the build-up to the conflict and the grim reality of war. It has been the most intense time of my 30-year career. In December I visited the trenches outside Donetsk with the Ukrainian army; in January I went to Mariupol and drove along the coast to Crimea; on 24 February I was with other colleagues in the Ukrainian capital as the first Russian bombs fell.",
                "This is the biggest war in Europe since 1945. It is, for Ukrainians, an existential struggle against a new but familiar Russian imperialism. Our team of reporters and editors intend to cover this war for as long as it lasts, however expensive that may prove to be. We are committed to telling the human stories of those caught up in war, as well as the international dimension. But we can't do this without the support of Guardian readers. It is your passion, engagement and financial contributions which underpin our independent journalism and make it possible for us to report from places like Ukraine.",
                'If you are able to help with a monthly or single contribution it will boost our resources and enhance our ability to report the truth about what is happening in this terrible conflict.',
                'Thank you.',
                '<strong>Luke Harding</strong>, Foreign correspondent',
            ],
            highlightedText: '',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'V2_authored_photo',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "I write from Ukraine, where I've spent much of the past six months, reporting on the build-up to the conflict and the grim reality of war. It has been the most intense time of my 30-year career. In December I visited the trenches outside Donetsk with the Ukrainian army; in January I went to Mariupol and drove along the coast to Crimea; on 24 February I was with other colleagues in the Ukrainian capital as the first Russian bombs fell.",
                "This is the biggest war in Europe since 1945. It is, for Ukrainians, an existential struggle against a new but familiar Russian imperialism. Our team of reporters and editors intend to cover this war for as long as it lasts, however expensive that may prove to be. We are committed to telling the human stories of those caught up in war, as well as the international dimension. But we can't do this without the support of Guardian readers. It is your passion, engagement and financial contributions which underpin our independent journalism and make it possible for us to report from places like Ukraine.",
                'If you are able to help with a monthly or single contribution it will boost our resources and enhance our ability to report the truth about what is happening in this terrible conflict.',
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
