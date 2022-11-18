import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022-10-31_EPIC_UKRAINE_OCT_UPDATE__UK_AUS';

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
    hasCountryName: true,
    highPriority: true,
    useLocalViewLog: false,
    variants: [
        {
            name: 'V2_authored_photo',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [
                "I've spent much of this year covering Europe's biggest war since 1945. It has been the most intense time of my 30-year career. I've reported on mass graves and the aftermath of deadly bombings. I've spoken to Ukrainians tortured by Russian forces, and relatives of those murdered. The work is all-consuming.",
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
