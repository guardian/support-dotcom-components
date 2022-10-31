import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Continue',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '2022-06-13_Harding_Hardcoded__US';

export const epicProfileWithImageTest_US: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    status: 'Live',
    locations: ['UnitedStates'],
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
            paragraphs: [],
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
            paragraphs: [],
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
