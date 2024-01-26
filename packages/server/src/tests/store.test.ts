import { removeNullValues } from './store';
const test = {
    channel: 'Banner2',
    name: 'CHANNEL2',
    articlesViewedSettings: null,
    campaignName: 'NOT_IN_CAMPAIGN',
    contextTargeting: {
        excludedSectionIds: [],
        excludedTagIds: [],
        sectionIds: [],
        tagIds: [],
    },
    controlProportionSettings: null,
    deviceType: null,
    locations: [],
    lockStatus: null,
    nickname: 'CHANNEL2',
    priority: 1,
    signedInStatus: 'All',
    status: 'Live',
    userCohort: 'AllNonSupporters',
    variants: [
        {
            name: 'CONTROL',
            bannerContent: {
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support the Guardian',
                },
                heading: 'We chose a different approach. Will you support it?',
                highlightedText:
                    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
                messageText: null,
                paragraphs: [
                    'We believe every one of us deserves to read quality, independent, fact-checked news and measured explanation – that’s why we keep Guardian journalism open to all. Our editorial independence has never been so vital. No one sets our agenda, or edits our editor, so we can keep providing independent reporting each and every day. No matter how unpredictable the future feels, we will remain with you. Every contribution, however big or small, makes our work possible – in times of crisis and beyond.',
                ],
                secondaryCta: null,
            },
            mobileBannerContent: null,
            separateArticleCount: true,
            template: 'ContributionsBanner',
            tickerSettings: null,
        },
    ],
};

const testWithNoNulls = {
    channel: 'Banner2',
    name: 'CHANNEL2',
    campaignName: 'NOT_IN_CAMPAIGN',
    contextTargeting: {
        excludedSectionIds: [],
        excludedTagIds: [],
        sectionIds: [],
        tagIds: [],
    },
    locations: [],
    nickname: 'CHANNEL2',
    priority: 1,
    signedInStatus: 'All',
    status: 'Live',
    userCohort: 'AllNonSupporters',
    variants: [
        {
            name: 'CONTROL',
            bannerContent: {
                cta: {
                    baseUrl: 'https://support.theguardian.com/contribute',
                    text: 'Support the Guardian',
                },
                heading: 'We chose a different approach. Will you support it?',
                highlightedText:
                    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
                paragraphs: [
                    'We believe every one of us deserves to read quality, independent, fact-checked news and measured explanation – that’s why we keep Guardian journalism open to all. Our editorial independence has never been so vital. No one sets our agenda, or edits our editor, so we can keep providing independent reporting each and every day. No matter how unpredictable the future feels, we will remain with you. Every contribution, however big or small, makes our work possible – in times of crisis and beyond.',
                ],
            },
            separateArticleCount: true,
            template: 'ContributionsBanner',
        },
    ],
};

describe('removeNullValues', () => {
    it('should remove all nulls from data', () => {
        const result = removeNullValues(test);
        expect(result).toEqual(testWithNoNulls);
    });
});
