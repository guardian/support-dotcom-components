import { EpicTest, EpicVariant } from '@sdc/shared/dist/types';

const localLanguagesEpicCopy = {
    // Copy to be updated if this approach is taken forward
    FR: {
        heading: 'Bonjour',
        paragraphs: ['Bonjour', 'Bonjour', 'Bonjour '],
        highlightedText: 'Bonjour',
    },
    DE: {
        heading: 'Hallo Germany',
        paragraphs: ['Hallo', 'Hallo', 'Hallo '],
        highlightedText: 'Hallo',
    },
    NL: {
        heading: 'Hallo Netherlands',
        paragraphs: ['Hallo', 'Hallo', 'Hallo '],
        highlightedText: 'Hallo',
    },
};

// Epic Tests below & variant info to be finalised
const getEpicVariant = (countryCode: keyof typeof localLanguagesEpicCopy) => {
    const variant: EpicVariant = {
        name: 'variant',
        heading: localLanguagesEpicCopy[countryCode].heading,
        paragraphs: localLanguagesEpicCopy[countryCode].paragraphs,
        highlightedText: localLanguagesEpicCopy[countryCode].highlightedText,
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        showChoiceCards: true,
        separateArticleCount: { type: 'above' },
    };

    return variant;
};

const franceCopyTest: EpicTest = {
    name: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_FRANCE',

    // These are specific to hardcoded tests
    // expiry: '2023-09-01',
    campaignId: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_FRANCE',

    hasArticleCountInCopy: true,
    status: 'Live',
    locations: ['EURCountries'],
    countryCodeLocations: ['FR'],
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false,
    hasCountryName: false,
    highPriority: true,
    isLiveBlog: false,
    useLocalViewLog: true,
    userCohort: 'AllNonSupporters',
    variants: [getEpicVariant('FR')],
    // articlesViewedSettings: {
    //     minViews: ,
    //     periodInWeeks: ,
    // },
};

const germanCopyTest: EpicTest = {
    name: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_GERMANY',

    // These are specific to hardcoded tests
    // expiry: '2023-09-01',
    campaignId: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_GERMANY',

    audience: 1,
    alwaysAsk: false,
    excludedSections: [],
    excludedTagIds: [],
    hasArticleCountInCopy: true,
    hasCountryName: false,
    highPriority: true,
    isLiveBlog: false,
    status: 'Live',
    locations: ['EURCountries'],
    countryCodeLocations: ['DE'],
    sections: [],
    tagIds: [],
    useLocalViewLog: true,
    userCohort: 'AllNonSupporters',
    variants: [getEpicVariant('DE')],
};

const netherlandsCopyTest: EpicTest = {
    name: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_NETHERLANDS',

    // These are specific to hardcoded tests
    // expiry: '2023-09-01',
    campaignId: 'EPIC_LOCAL_LANGUAGE_SEPT_2023_NETHERLANDS',

    audience: 1,
    alwaysAsk: false,
    excludedSections: [],
    excludedTagIds: [],
    hasArticleCountInCopy: true,
    hasCountryName: false,
    highPriority: true,
    isLiveBlog: false,
    status: 'Live',
    locations: ['EURCountries'],
    countryCodeLocations: ['NL'],
    sections: [],
    tagIds: [],
    useLocalViewLog: true,
    userCohort: 'AllNonSupporters',
    variants: [getEpicVariant('NL')],
};

export const localLanguagesEpicTests = [franceCopyTest, germanCopyTest, netherlandsCopyTest];
