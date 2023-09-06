export const LocalLanguageBannerTemplateName = 'EuropeMomentLocalLanguageBanner';

export type LocalLanguage = {
    testName: string;
    variantName: string;
    bannerHeader?: string;
};
type LocalLanguages = Record<string, LocalLanguage>;

const localLanguages: LocalLanguages = {
    FR: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
        bannerHeader: 'Soutenez un journalisme européen et indépendant ',
    },
    DE: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
        bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
    },
    IT: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
        bannerHeader: 'Sostieni un giornalismo europeo indipendente',
    },
    NL: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
        bannerHeader: 'Steun de onafhankelijke journalistiek',
    },
    SE: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
        bannerHeader: 'Var med och stöd oberoende journalistik i Europa',
    },
    SP: {
        testName: 'LOCAL-LANGUAGE',
        variantName: 'CONTROL',
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
        testName === hasCountryLanguageOrDefault?.testName &&
        variantName === hasCountryLanguageOrDefault?.variantName
    ) {
        return (
            localLanguages[countryCode] ?? {
                testName: dfltLocalLanguage.testName,
                variantName: dfltLocalLanguage.variantName,
                bannerHeader: dfltLocalLanguage?.bannerHeader,
            }
        );
    }
};
