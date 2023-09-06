import { countryCodeToLocalLanguageBannerHeader } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: { bannerHeader: 'Soutenez un journalisme européen et indépendant ' },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: { bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus' },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: { bannerHeader: 'Sostieni un giornalismo europeo indipendente' },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: { bannerHeader: 'Steun de onafhankelijke journalistiek' },
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
            output: { bannerHeader: 'Var med och stöd oberoende journalistik i Europa' },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: { bannerHeader: 'Fomentar el periodismo europeo independiente' },
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
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
        },
        {
            inputCountryCode: '',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
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
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
        },
    ];

    countries.forEach(
        ({ inputTestName, inputVariant, inputCountryCode, inputDefaultLocalLanguage, output }) => {
            it(`returns ${output}, given ${inputCountryCode}`, () => {
                expect(
                    countryCodeToLocalLanguageBannerHeader(
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
