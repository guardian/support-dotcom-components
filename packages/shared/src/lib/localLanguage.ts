export const LocalLanguageBannerTemplateName = 'EuropeMomentLocalLanguageBanner';
const LocalLanguageBannerTestName = 'LOCAL-LANGUAGE';
const LocalLanguageBannerVariant = 'CONTROL';

export type LocalLanguage = {
    bannerHeader?: string;
};
type LocalLanguages = Record<string, LocalLanguage>;

const localLanguages: LocalLanguages = {
    FR: {
        bannerHeader: 'Soutenez un journalisme européen et indépendant ',
    },
    DE: {
        bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
    },
    IT: {
        bannerHeader: 'Sostieni un giornalismo europeo indipendente',
    },
    NL: {
        bannerHeader: 'Steun de onafhankelijke journalistiek',
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
        testName === LocalLanguageBannerTestName &&
        variantName === LocalLanguageBannerVariant &&
        hasCountryLanguageOrDefault
    ) {
        return (
            localLanguages[countryCode] ?? {
                bannerHeader: dfltLocalLanguage?.bannerHeader,
            }
        );
    }
};
