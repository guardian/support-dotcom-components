import { EpicTest, EpicVariant } from '@sdc/shared/dist/types';

const localLanguagesEpicCopy = {
    FR: {
        heading: '… il existe une bonne raison de ne pas soutenir le Guardian.',
        paragraphs: [
            `Actuellement, beaucoup de lecteurs ne sont pas ou plus en mesure de payer pour accéder aux informations. C’est pour cela que nos contenus sont et resteront gratuits et ouverts à tous. Si tel est votre cas, vous pouvez continuer à lire nos articles librement, comme vous le faites à présent, depuis la France.`,
            `Si au contraire, vous avez les moyens de contribuer financièrement, voici trois bonnes raisons de soutenir le Guardian dès aujourd’hui.`,
            `1. Nous sommes une rédaction indépendante. Personne ne contrôle notre ligne éditoriale ; fait rare en Europe où la liberté des médias est souvent compromise par le poids des actionnaires et la corruption. `,
            `2. Notre journalisme d'investigation met en lumière les dessous du pouvoir et dénonce l’injustice en Europe et dans le monde entier.`,
            `3. Même sous l'ère du Brexit, nous restons plus européens que jamais. Nous venons de lancer notre nouvelle édition en ligne en anglais, dédiée à nos lecteurs en Europe, et donc à vous, en France. Cette année, nous avons investi dans notre journalisme européen, recruté de nouveaux correspondants sur le continent et publié plus de 10 000 articles sur les affaires européennes. Nous comptons désormais environ 180 000 de nos contributeurs en Europe.`,
            `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. Si vous le pouvez, `,
        ],
        highlightedText:
            'une contribution de seulement 2 euros par mois peut dès aujourd’hui faire toute la différence. Merci.',
    },
    DE: {
        heading: 'Hallo Germany',
        paragraphs: ['Hallo1', 'Hallo2', 'Hallo3'],
        highlightedText: 'Hallo Germany',
    },
    NL: {
        heading: 'Hallo Netherlands',
        paragraphs: ['Hallo1', 'Hallo2'],
        highlightedText: 'Hallo Netherlands',
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
