import {Test, Variant} from "../lib/variants";
import {liveblogEpic, liveblogEpicSmallHeader, liveblogEpicYellowHeader} from "../modules";

const TestName = '2020-01-19-LiveblogEpicDesignTest';

export enum LiveblogEpicDesignTestVariants {
    control = 'control',
    smallHeader = 'smallHeader',
    yellowHeader = 'yellowHeader',
}

const variant = (name: string, modulePath: string, heading?: string): Variant => ({
    name,
    heading,
    paragraphs: [
        'In these extraordinary times, the Guardian’s editorial independence has never been more important. Because no one sets our agenda, or edits our editor, we can keep delivering high-impact, trustworthy journalism each and every day. Free from commercial or political influence, we can report fearlessly on world events and challenge those in power.',
        'We believe everyone deserves equal access to accurate news and calm explanation. Your support enables us to keep our journalism open for all. No matter how unpredictable the future feels, we will provide vital information so we can all make decisions about our lives, health and security – based on fact, not fiction.',
        'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
    ],
    cta: {
        text: 'Show your support',
        baseUrl: 'https://support.theguardian.com/contribute'
    },
    modulePath,
});

export const liveblogEpicDesignTest: Test = {
    name: TestName,
    expiry: '2021-03-01',
    campaignId: TestName,
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
        variant(LiveblogEpicDesignTestVariants.control, liveblogEpic.endpointPath),
        variant(LiveblogEpicDesignTestVariants.yellowHeader, liveblogEpicYellowHeader.endpointPath, 'Support the Guardian'),
        variant(LiveblogEpicDesignTestVariants.smallHeader,liveblogEpicSmallHeader.endpointPath, 'Support the Guardian'),
    ],
    highPriority: false,
    useLocalViewLog: false,
};
