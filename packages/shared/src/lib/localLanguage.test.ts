import { countryCodeToVerfiedLocalLanguage } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Faites partie de notre aventure européenne !',
                epicHeader: 'Faites partie de notre aventure européenne !',
                epicParagraphs: [
                    `Le Guardian est une rédaction indépendante au sein de laquelle nos journalistes se passionnent pour la justice sociale, l’environnement et la science. Cette semaine/ Ce mois-ci, nous lançons notre nouvelle édition en ligne dédiée à nos lecteurs en Europe, et donc à vous, en France. Nous vous invitons à faire partie de cette aventure en nous apportant votre soutien dès aujourd’hui.`,
                    `Nos investigations mettent en lumière les dessous du pouvoir et dénoncent l’injustice et la corruption. Dans un monde surmédiatisé, étouffé par la désinformation et le sensationnalisme, nous nous engageons à relayer l'exactitude et la véracité des faits. Aucun milliardaire, aucun actionnaire ne contrôle notre ligne éditoriale. Nos contenus sont gratuits et accessibles à tous, nous n’avons pas de paywall. Nous voulons garantir un accès libre à une information fiable et intègre, et ce, au plus grand nombre.`,
                    `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. Si vous le pouvez, `,
                ],
                epicHighlightedText: `une contribution de seulement 2 euros par mois peut dès aujourd’hui faire toute la différence. Merci.`,
            },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
                epicHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
                epicParagraphs: ['1', '2', '3', '4'],
                epicHighlightedText: `Highlight (German)`,
            },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Prendi parte alla nostra nuova avventura europea!',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
                epicHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
                epicParagraphs: ['1', '2', '3'],
                epicHighlightedText: `Highlight (Dutch)`,
            },
        },
        {
            inputCountryCode: 'SE',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: 'Ta del av vårt nya europeiska äventyr!',
            },
        },
        {
            inputCountryCode: 'SP',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {
                bannerHeader: '¡Participa en nuestra nueva aventura europea!',
            },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: 'PD-TEST',
            inputVariant: 'CONTROL',
            output: {},
        },
        {
            inputCountryCode: 'US',
            inputTestName: 'PD-TEST',
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
            inputTestName: 'PD-TEST',
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
