import { countryCodeToVerfiedLocalLanguage } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Soutenez un journalisme européen et indépendant ',
                epicHeader: '… il existe une bonne raison de ne pas soutenir le Guardian.',
                epicParagraphs: [
                    `Actuellement, beaucoup de lecteurs ne sont pas ou plus en mesure de payer pour accéder aux informations. C’est pour cela que nos contenus sont et resteront gratuits et ouverts à tous. Si tel est votre cas, vous pouvez continuer à lire nos articles librement, comme vous le faites à présent, depuis la France.`,
                    `Si au contraire, vous avez les moyens de contribuer financièrement, voici trois bonnes raisons de soutenir le Guardian dès aujourd’hui.`,
                    `1. Nous sommes une rédaction indépendante. Personne ne contrôle notre ligne éditoriale ; fait rare en Europe où la liberté des médias est souvent compromise par le poids des actionnaires et la corruption. `,
                    `2. Notre journalisme d'investigation met en lumière les dessous du pouvoir et dénonce l’injustice en Europe et dans le monde entier.`,
                    `3. Même sous l'ère du Brexit, nous restons plus européens que jamais. Nous venons de lancer notre nouvelle édition en ligne en anglais, dédiée à nos lecteurs en Europe, et donc à vous, en France. Cette année, nous avons investi dans notre journalisme européen, recruté de nouveaux correspondants sur le continent et publié plus de 10 000 articles sur les affaires européennes. Nous comptons désormais environ 180 000 de nos contributeurs en Europe.`,
                    `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. Si vous le pouvez, `,
                ],
                epicHighlightedText: `une contribution de seulement 2 euros par mois peut dès aujourd’hui faire toute la différence. Merci.`,
            },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
                epicHeader: 'Header (German)',
                epicParagraphs: [
                    'Para1 (German)',
                    'Para2 (German)',
                    'Para3 (German)',
                    'Para4 (German), ',
                ],
                epicHighlightedText: `Highlight (German)`,
            },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Sostieni un giornalismo europeo indipendente',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Steun de onafhankelijke journalistiek',
                epicHeader: 'Header (Dutch)',
                epicParagraphs: ['Para1 (Dutch)', 'Para2 (Dutch)', 'Para3 (Dutch), '],
                epicHighlightedText: `Highlight (Dutch)`,
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
                bannerHeader: 'Var med och stöd oberoende journalistik i Europa',
            },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            output: {
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
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
                epicParagraphs: ['1', '2', '3', '4', '5'],
                epicHighlightedText: `Highlight (US)`,
            },
            output: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
                epicParagraphs: ['1', '2', '3', '4', '5'],
                epicHighlightedText: `Highlight (US)`,
            },
        },
        {
            inputCountryCode: '',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultLocalLanguage: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
                epicParagraphs: ['1', '2', '3', '4', '5'],
                epicHighlightedText: `Highlight`,
            },
            output: {
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
                epicParagraphs: ['1', '2', '3', '4', '5'],
                epicHighlightedText: `Highlight`,
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
                bannerHeader: 'BannerHeaderTest',
                epicHeader: 'EpicHeaderTest',
                epicParagraphs: ['1', '2', '3', '4', '5'],
                epicHighlightedText: `Highlight`,
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
