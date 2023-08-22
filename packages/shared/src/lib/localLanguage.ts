type LocalLanguageHeader = {
    header: string;
};
type LocalLanguageHeaders = Record<string, LocalLanguageHeader>;

const localLanguagesHeaders: LocalLanguageHeaders = {
    FR: {
        header:
            'Faites partie de notre <span style="color:red;font-weight:bold">aventure</span> européenne !',
    },
    DE: {
        header: 'hallo (German)',
    },
    IT: {
        header: 'Prendi parte alla nostra nuova avventura europea!',
    },
    NL: {
        header: 'hallo (Dutch)',
    },
    SE: {
        header: 'halla',
    },
    SP: {
        header: 'hola',
    },
};
export const LocalLanguageBannerTemplateName = 'LocalLanguageMomentBanner';
export const LocalLanguageBannerTestName = 'PD-TEST';
export const LocalLanguageBannerVariant = 'CONTROL';

export const countryCodeToLocalLanguageHeader = (countryCode?: string): string => {
    return localLanguagesHeaders[countryCode]
        ? localLanguagesHeaders[countryCode].header
        : 'default (English)';
};
