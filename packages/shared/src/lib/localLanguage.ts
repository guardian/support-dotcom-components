export const LocalLanguageBannerTemplateName = 'EuropeMomentLocalLanguageBanner';
const LocalLanguageBannerTestName = 'LOCAL-LANGUAGE';
const LocalLanguageBannerVariant = 'CONTROL';
const LocalLanguageEpicTestName = 'LOCAL-LANGUAGE';
const LocalLanguageEpicVariant = 'CONTROL';

export type LocalLanguage = {
    bannerHeader?: string;
    epicHeader?: string;
};

type LocalLanguages = Record<string, LocalLanguage>;

const localLanguages: LocalLanguages = {
    FR: {
        bannerHeader: 'Faites partie de notre aventure européenne !',
        epicHeader: 'Faites partie de notre aventure européenne !',
    },
    DE: {
        bannerHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
        epicHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
    },
    IT: {
        bannerHeader: 'Prendi parte alla nostra nuova avventura europea!',
        epicHeader: 'Prendi parte alla nostra nuova avventura europea!',
    },
    NL: {
        bannerHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
        epicHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
    },
    SE: {
        bannerHeader: 'Ta del av vårt nya europeiska äventyr!',
        epicHeader: 'Ta del av vårt nya europeiska äventyr!',
    },
    SP: {
        bannerHeader: '¡Participa en nuestra nueva aventura europea!',
        epicHeader: '¡Participa en nuestra nueva aventura europea!',
    },
};

export const countryCodeToVerfiedLocalLanguage = (
    testName: string,
    variantName: string,
    countryCode?: string,
    dfltLocalLanguage?: LocalLanguage,
): LocalLanguage => {
    if (
        testName === (LocalLanguageEpicTestName || LocalLanguageBannerTestName) &&
        variantName === (LocalLanguageEpicVariant || LocalLanguageBannerVariant)
    ) {
        return (
            localLanguages[countryCode] ?? {
                bannerHeader: dfltLocalLanguage?.bannerHeader,

                epicHeader: dfltLocalLanguage?.epicHeader,
            }
        );
    }
};
