import {
    EpicTestTracking,
    EpicPageTracking,
    EpicTracking,
    EpicLocalisation,
    EpicTargeting,
} from './ContributionsEpicTypes';

const content = {
    heading: 'Since you’re here...',
    paragraphs: [
        '... we have a small favour to ask. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    ],
    highlightedText:
        'Support The Guardian from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
};

const pageTracking: EpicPageTracking = {
    ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
    ophanComponentId: 'ACQUISITIONS_EPIC',
    platformId: 'GUARDIAN_WEB',
    referrerUrl:
        'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
};

const testTracking: EpicTestTracking = {
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
};

const tracking: EpicTracking = {
    ...pageTracking,
    ...testTracking,
};

const localisation: EpicLocalisation = {
    countryCode: 'GB',
};

const targeting: EpicTargeting = {
    contentType: 'Article',
    sectionName: 'environment',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [
        {
            id: 'environment/drought',
            type: 'Keyword',
        },
        {
            id: 'environment/climate-change',
            type: 'Keyword',
        },
    ],
    showSupportMessaging: true,
    isRecurringContributor: false,
    lastOneOffContributionDate: 1548979200000, // 2019-02-01
    mvtId: 2,
    weeklyArticleHistory: [
        { week: 18337, count: 10 },
        { week: 18330, count: 5 },
    ],
};

const testData = { content, tracking, testTracking, pageTracking, localisation, targeting };

export default testData;
