import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022-06-13_Harding_Hardcoded__EU-ROW';

export const epicProfileWithImageTest_EUROW: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['EURCountries', 'International', 'NZDCountries', 'Canada'],
    audience: 1,
    tagIds: ['world/russia', 'world/ukraine'],
    sections: [],
    excludedTagIds: ['news/series/uber-files'],
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
