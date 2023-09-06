import { countryCodeToVerfiedLocalLanguage } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Soutenez un journalisme européen et indépendant ',
            },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
            },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Sostieni un giornalismo europeo indipendente',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Steun de onafhankelijke journalistiek',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE1',
            inputVariant: 'CONTROL',
            output: undefined,
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL1',
            output: undefined,
        },
        {
            inputCountryCode: 'NL',
            inputTestName: '',
            inputVariant: '',
            output: undefined,
        },
        {
            inputCountryCode: 'SE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Var med och stöd oberoende journalistik i Europa',
            },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'Fomentar el periodismo europeo independiente',
            },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: undefined,
        },
        {
            inputCountryCode: 'GB',
            inputTestName: '',
            inputVariant: '',
            output: undefined,
        },
        {
            inputCountryCode: 'US',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'BannerHeaderTest',
            },
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'BannerHeaderTest',
            },
        },
        {
            inputCountryCode: '',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'BannerHeaderTest',
            },
            output: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'BannerHeaderTest',
            },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            output: undefined,
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultLocalLanguage: {
                testName: 'LOCAL-LANGUAGE',
                variantName: 'CONTROL',
                bannerHeader: 'BannerHeaderTest',
            },
            output: undefined,
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
