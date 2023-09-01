export const LocalLanguageBannerTemplateName = 'LocalLanguageMomentBanner';
const LocalLanguageBannerTestName = 'LOCAL-LANGUAGE';
const LocalLanguageBannerVariant = 'CONTROL';
const LocalLanguageEpicTestName = 'LOCAL-LANGUAGE';
const LocalLanguageEpicVariant = 'CONTROL';

export type LocalLanguage = {
    bannerHeader?: string;
    epicHeader?: string;
    epicParagraphs?: string[];
    epicHighlightedText?: string;
};
type LocalLanguages = Record<string, LocalLanguage>;

const localLanguages: LocalLanguages = {
    FR: {
        bannerHeader: 'Soutenez un journalisme européen et indépendant ',
        epicHeader: '… il existe une bonne raison de ne pas soutenir le Guardian.',
        epicParagraphs: [
            `Actuellement, beaucoup de lecteurs ne sont pas ou plus en mesure de payer pour accéder aux informations. C’est pour cela que nos contenus sont et resteront gratuits et ouverts à tous. Si tel est votre cas, vous pouvez continuer à lire nos articles librement, comme vous le faites à présent, depuis la France.`,
            `Si au contraire, vous avez les moyens de contribuer financièrement, voici trois bonnes raisons de soutenir le Guardian dès aujourd’hui.`,
            `1. Nous sommes une rédaction indépendante. Personne ne contrôle notre ligne éditoriale ; fait rare en Europe où la liberté des médias est souvent compromise par le poids des actionnaires et la corruption. `,
            `2. Notre journalisme d'investigation met en lumière les dessous du pouvoir et dénonce l’injustice en Europe et dans le monde entier.`,
            `3. Même sous l'ère du Brexit, nous restons plus européens que jamais. Nous venons de lancer notre nouvelle édition en ligne en anglais, dédiée à nos lecteurs en Europe, et donc à vous, en France. Cette année, nous avons investi dans notre journalisme européen, recruté de nouveaux correspondants sur le continent et publié plus de 10 000 articles sur les affaires européennes. Nous comptons désormais environ 180 000 de nos contributeurs en Europe.`,
            `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. Si vous le pouvez, `,
        ],
        epicHighlightedText: `une contribution de seulement 2 euros par mois peut dès aujourd’hui faire toute la différence. Merci.`,
    },
    DE: {
        bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
        epicHeader: 'Header (German)',
        epicParagraphs: ['Para1 (German)', 'Para2 (German)', 'Para3 (German)', 'Para4 (German), '],
        epicHighlightedText: `Highlight (German)`,
    },
    IT: {
        bannerHeader: 'Sostieni un giornalismo europeo indipendente',
    },
    NL: {
        bannerHeader: 'Steun de onafhankelijke journalistiek',
        epicHeader: 'Header (Dutch)',
        epicParagraphs: ['Para1 (Dutch)', 'Para2 (Dutch)', 'Para3 (Dutch), '],
        epicHighlightedText: `Highlight (Dutch)`,
    },
    SE: {
        bannerHeader: 'Var med och stöd oberoende journalistik i Europa',
    },
    SP: {
        bannerHeader: 'Fomentar el periodismo europeo independiente',
    },
};

export const countryCodeToVerfiedLocalLanguage = (
    testName: string,
    variantName: string,
    countryCode?: string,
    dfltLocalLanguage?: LocalLanguage,
): LocalLanguage | undefined => {
    const hasCountryLanguageOrDefault = localLanguages[countryCode] || dfltLocalLanguage;
    if (
        testName === (LocalLanguageEpicTestName || LocalLanguageBannerTestName) &&
        variantName === (LocalLanguageEpicVariant || LocalLanguageBannerVariant) &&
        hasCountryLanguageOrDefault
    ) {
        return (
            localLanguages[countryCode] ?? {
                bannerHeader: dfltLocalLanguage?.bannerHeader,
                epicHeader: dfltLocalLanguage?.epicHeader,
                epicParagraphs: dfltLocalLanguage?.epicParagraphs,
                epicHighlightedText: dfltLocalLanguage?.epicHighlightedText,
            }
        );
    }
};
