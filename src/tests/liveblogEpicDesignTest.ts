import { Test, Variant } from '../lib/variants';
import { liveblogEpic, liveblogEpicSmallHeader, liveblogEpicYellowHeader } from '../modules';
import { CountryGroupId } from '../lib/geolocation';

export enum LiveblogEpicDesignTestVariants {
    control = 'control',
    smallHeader = 'smallHeader',
    yellowHeader = 'yellowHeader',
}

const globalParagraphs = [
    'In these extraordinary times, the Guardian’s editorial independence has never been more important. Because no one sets our agenda, or edits our editor, we can keep delivering high-impact, trustworthy journalism each and every day. Free from commercial or political influence, we can report fearlessly on world events and challenge those in power.',
    'We believe everyone deserves equal access to accurate news and calm explanation. Your support enables us to keep our journalism open for all. No matter how unpredictable the future feels, we will provide vital information so we can all make decisions about our lives, health and security – based on fact, not fiction.',
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
];

const USParagraphs = [
    'Since you’re here, we have a small favour to ask. Millions are flocking to the Guardian for independent, quality news every day. As the new year begins, we’re asking you to consider a gift to help fund our journalism.',
    'We believe everyone deserves to access information that’s grounded in science and truth. That’s why we made a different choice: to keep our reporting open for all readers, regardless of where they live or what they can afford to pay.',
    'If you’ve enjoyed our live updates and in-depth coverage, support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
];

const variant = (
    name: string,
    modulePath: string,
    paragraphs: string[],
    heading?: string,
): Variant => ({
    name,
    heading,
    paragraphs,
    cta: {
        text: 'Show your support',
        baseUrl: 'https://support.theguardian.com/contribute',
    },
    modulePath,
});

const liveblogEpicDesignTest = (
    name: string,
    paragraphs: string[],
    locations: CountryGroupId[],
): Test => ({
    name: name,
    expiry: '2021-03-01',
    campaignId: name,
    isOn: true,
    locations,
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
        variant(LiveblogEpicDesignTestVariants.control, liveblogEpic.endpointPath, paragraphs),
        variant(
            LiveblogEpicDesignTestVariants.yellowHeader,
            liveblogEpicYellowHeader.endpointPath,
            paragraphs,
            'Support the Guardian',
        ),
        variant(
            LiveblogEpicDesignTestVariants.smallHeader,
            liveblogEpicSmallHeader.endpointPath,
            paragraphs,
            'Support the Guardian',
        ),
    ],
    highPriority: false,
    useLocalViewLog: false,
});

export const liveblogEpicDesignTestGlobal: Test = liveblogEpicDesignTest(
    '2020-01-20-LiveblogEpicDesignTest__Global',
    globalParagraphs,
    ['GBPCountries', 'AUDCountries', 'EURCountries', 'International', 'NZDCountries', 'Canada'],
);
export const liveblogEpicDesignTestUS: Test = liveblogEpicDesignTest(
    '2020-01-20-LiveblogEpicDesignTest__US',
    USParagraphs,
    ['UnitedStates'],
);
