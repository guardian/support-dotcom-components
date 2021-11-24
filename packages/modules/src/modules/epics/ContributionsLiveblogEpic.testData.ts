import { EpicTargeting, PageTracking, TestTracking, Tracking } from '@sdc/shared/types';

const content = {
    paragraphs: [
        'In these extraordinary times, the Guardian’s editorial independence has never been more important. Because no one sets our agenda, or edits our editor, we can keep delivering quality, trustworthy, fact-checked journalism each and every day. Free from commercial or political bias, we can report fearlessly on world events and challenge those in power.',
        'Your support protects the Guardian’s independence. We believe every one of us deserves equal access to accurate news and calm explanation. No matter how unpredictable the future feels, we will remain with you, delivering high quality news so we can all make critical decisions about our lives, health and security – based on fact, not fiction.',
        'Support the Guardian from as little as £1 – and it only takes a minute. Thank you.',
    ],
    cta: {
        text: 'Make a contribution',
        baseUrl: 'https://support.theguardian.com/contribute',
    },
};

const pageTracking: PageTracking = {
    ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl:
        'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
};

const testTracking: TestTracking = {
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    campaignId: 'remote_epic_test',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
    componentType: 'ACQUISITIONS_EPIC',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};

const tracking: Tracking = {
    ...pageTracking,
    ...testTracking,
};

const targeting: EpicTargeting = {
    contentType: 'Article',
    sectionId: 'environment',
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
    hasOptedOutOfArticleCount: false,
    countryCode: 'GB',
};

const testData = { content, tracking, testTracking, pageTracking, targeting };

export default testData;
