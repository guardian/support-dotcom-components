import { epic } from '@sdc/shared/dist/config';
import { EpicTest, SecondaryCtaType } from '@sdc/shared/dist/types';

const CTA = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};

const testName = '20220408_Epic-profile-with-image';

export const epicProfileTest: EpicTest = {
    name: testName,
    campaignId: testName,
    hasArticleCountInCopy: false,
    isOn: true,
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
    isLiveBlog: false,
    hasCountryName: false,
    variants: [
        {
            name: 'CONTROL',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [],
            highlightedText: '',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
        },
        {
            name: 'VARIANT',
            modulePathBuilder: epic.endpointPathBuilder,
            paragraphs: [],
            highlightedText: '',
            cta: CTA,
            secondaryCta: { type: SecondaryCtaType.ContributionsReminder },
            separateArticleCount: { type: 'above' },
            showChoiceCards: true,
            bylineWithImage: {
                name: 'Zoe Williams',
                description: 'Guardian columnist',
                headshot: {
                    mainUrl: 'https://uploads.guim.co.uk/2017/10/09/Zoe-Williams,-L.png',
                    altText: 'Zoe Williams headshot',
                },
            },
        },
    ],
    highPriority: true,
    useLocalViewLog: true, // TODO - work out if we want this set to true
};
