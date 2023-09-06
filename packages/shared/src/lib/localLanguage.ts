export type LocalLanguage = {
    bannerHeader?: string;
};

const localLanguageBannerHeaders: Record<string, LocalLanguage> = {
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

export const countryCodeToLocalLanguageBannerHeader = (
    testName: string,
    variantName: string,
    countryCode?: string,
    defaultBannerHeader?: LocalLanguage,
): LocalLanguage | undefined => {
    if (
        testName === 'LOCAL-LANGUAGE' &&
        variantName === 'CONTROL' &&
        localLanguageBannerHeaders[countryCode]
    ) {
        return localLanguageBannerHeaders[countryCode];
    }
    return defaultBannerHeader;
};
