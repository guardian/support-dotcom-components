import { countryCodeToVerfiedLocalLanguage } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: 'Faites partie de notre aventure européenne !',
                epicHeader: 'Faites partie de notre aventure européenne !',
            },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
                epicHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
            },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefainputDefaultLocalLanguageultLL: undefined,
            output: {
                bannerHeader: 'Prendi parte alla nostra nuova avventura europea!',
                epicHeader: 'Prendi parte alla nostra nuova avventura europea!',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
                epicHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
            },
        },
        {
            inputCountryCode: 'SE',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: 'Ta del av vårt nya europeiska äventyr!',
                epicHeader: 'Ta del av vårt nya europeiska äventyr!',
            },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: '¡Participa en nuestra nueva aventura europea!',
                epicHeader: '¡Participa en nuestra nueva aventura europea!',
            },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: undefined,
            output: {
                bannerHeader: '',
                epicHeader: '',
            },
        },
        {
            inputCountryCode: 'US',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
            },
            output: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
            },
        },
        {
            inputCountryCode: '',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
            },
            output: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
            },
        },
    ];

    countries.forEach(
        ({ inputTestName, inputVariant, inputCountryCode, inputDefaultLocalLanguage, output }) => {
            it(`returns ${output}, given ${inputCountryCode}`, () => {
                expect(
                    countryCodeToVerfiedLocalLanguage(
                        inputTestName,
                        inputVariant,
                        inputCountryCode,
                        inputDefaultLocalLanguage,
                    ),
                ).toEqual(output);
            });
        },
    );
});
