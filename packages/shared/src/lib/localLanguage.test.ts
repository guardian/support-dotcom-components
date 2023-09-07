import { countryCodeToLocalLanguageBannerHeader } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Soutenez un journalisme européen et indépendant ' },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus' },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Sostieni un giornalismo europeo indipendente' },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Steun de onafhankelijke journalistiek' },
        },
        {
            inputCountryCode: 'SE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Var med och stöd oberoende journalistik i Europa' },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Fomentar el periodismo europeo independiente' },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as £1. Thank you.',
            },
            output: { bannerHeader: 'Support the Guardian from as little as £1. Thank you.' },
        },
        {
            inputCountryCode: 'US',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'Support the Guardian from as little as $1. Thank you.',
            },
            output: { bannerHeader: 'Support the Guardian from as little as $1. Thank you.' },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE-INCORRECT',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL-INCORRECT',
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: '',
            inputVariant: '',
            inputDefaultLocalLanguage: { bannerHeader: 'BannerHeaderTest' },
            output: { bannerHeader: 'BannerHeaderTest' },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: '',
            inputVariant: '',
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
            inputDefaultLocalLanguage: { bannerHeader: '' },
            output: { bannerHeader: '' },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultLocalLanguage: { bannerHeader: undefined },
            output: { bannerHeader: undefined },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultLocalLanguage: undefined,
            output: undefined,
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
