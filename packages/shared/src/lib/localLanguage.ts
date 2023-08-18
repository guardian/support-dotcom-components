type LocalLanguageHeader = {
    header: string;
};

type LocalLanguageHeaders = Record<string, LocalLanguageHeader>;

const localLanguagesHeaders: LocalLanguageHeaders = {
    FR: {
        header: 'Faites partie de notre aventure européenne !',
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

export const LocalLanguageBannerTemplateName = 'WorldPressFreedomDayBanner';
export const LocalLanguageBannerTestName = 'PD-TEST';
export const LocalLanguageBannerVariant = 'CONTROL';

export const countryCodeToLocalLanguageHeader = (countryCode?: string): string => {
    return localLanguagesHeaders[countryCode].header || '';
};
