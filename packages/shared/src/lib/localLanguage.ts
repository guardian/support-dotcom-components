type LocalLanguageHeader = {
    header: string;
    epic: string;
};
type LocalLanguageHeaders = Record<string, LocalLanguageHeader>;

const localLanguagesHeaders: LocalLanguageHeaders = {
    FR: {
        header:
            'Faites partie de notre <span style="color:red;font-weight:bold">aventure</span> européenne !',
        epic:
            'epic Faites partie de notre <span style="color:red;font-weight:bold">aventure</span> européenne !',
    },
    DE: {
        header: 'hallo (German)',
        epic: 'epic hallo (German)',
    },
    IT: {
        header: 'Prendi parte alla nostra nuova avventura europea!',
        epic: 'epic Prendi parte alla nostra nuova avventura europea!',
    },
    NL: {
        header: 'hallo (Dutch)',
        epic: 'epic hallo (Dutch)',
    },
    SE: {
        header: 'halla',
        epic: 'epic halla',
    },
    SP: {
        header: 'hola',
        epic: 'epic hola',
    },
};
export const LocalLanguageBannerTemplateName = 'LocalLanguageMomentBanner';
export const LocalLanguageBannerTestName = 'PD-TEST';
export const LocalLanguageBannerVariant = 'CONTROL';

export const countryCodeToLocalLanguageHeader = (countryCode?: string): string => {
    return localLanguagesHeaders[countryCode] ? localLanguagesHeaders[countryCode].header : '';
};

export const LocalLanguageEpicTestName = 'PD-TEST';
export const LocalLanguageEpicVariant = 'CONTROL';

export const countryCodeToLocalLanguageEpic = (countryCode?: string): string => {
    return localLanguagesHeaders[countryCode] ? localLanguagesHeaders[countryCode].epic : '';
};
