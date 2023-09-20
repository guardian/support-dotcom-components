import {
    countryCodeToLocalLanguageBannerHeader,
    countryCodeToLocalLanguageEpic,
} from './localLanguage';

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
            inputCountryCode: 'ES',
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

describe('countryCodeToLocalLanguageEpic', () => {
    const countriesEpic = [
        {
            inputCountryCode: 'FR',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: { heading: '', paragraphs: [''], highlightedText: '' },
            output: {
                heading: '… il existe une bonne raison de <em>ne pas</em> soutenir le Guardian.',
                paragraphs: [
                    `Actuellement, beaucoup de lecteurs ne sont pas ou plus en mesure de payer pour accéder aux informations. C’est pour cela que nos contenus sont et resteront gratuits et ouverts à tous. Si tel est votre cas, vous pouvez continuer à lire nos articles librement, comme vous le faites à présent, depuis <strong>la France.</strong>`,
                    `Si au contraire, vous avez les moyens de contribuer financièrement, voici <strong>trois</strong> bonnes raisons de soutenir le Guardian dès aujourd’hui.`,
                    `<strong>1.</strong> Nous sommes une rédaction indépendante. Personne ne contrôle notre ligne éditoriale ; fait rare en Europe où la liberté des médias est souvent compromise par le poids des actionnaires et la corruption.`,
                    `<strong>2.</strong> Notre journalisme d'investigation met en lumière les dessous du pouvoir et dénonce l’injustice en Europe et dans le monde entier.`,
                    `<strong>3.</strong> Même sous l'ère du Brexit, nous restons plus européens que jamais. Nous venons de lancer notre nouvelle édition en ligne en anglais, dédiée à nos lecteurs en Europe, et donc à vous, en France. Cette année, nous avons investi dans notre journalisme européen, recruté de nouveaux correspondants sur le continent et publié plusieurs milliers d'articles sur les affaires européennes. Nous comptons désormais environ 180 000 de nos contributeurs en Europe.`,
                    `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. `,
                ],
                highlightedText:
                    'Si vous le pouvez, une contribution de seulement €2 par mois peut dès aujourd’hui faire toute la différence. Merci.',
            },
        },
        {
            inputCountryCode: 'DE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: { heading: '', paragraphs: [''], highlightedText: '' },
            output: {
                heading:
                    '… es gibt einen guten Grund, den Guardian <em>nicht</em> zu unterstützen.',
                paragraphs: [
                    `Nicht jeder kann es sich zur Zeit leisten, für Nachrichten zu bezahlen. Deshalb bieten wir unseren Journalismus jedem frei zugänglich an. Falls das auf Sie zutrifft, lesen Sie bitte kostenfrei weiter, wenn Sie heute aus <strong>Deutschland</strong> zu uns stoßen.`,
                    `Aber wenn Sie dazu in der Lage sind, dann gibt es <strong>drei</strong> gute Gründe, uns heute zu unterstützen.`,
                    `<strong>1.</strong> Wir sind absolut unabhängig und legen unsere eigene Agenda fest, eine zunehmende Seltenheit in einem Europa der nicht unabhängigen Medien.`,
                    `<strong>2.</strong> Unser furchtloser, investigativer Journalismus bietet eine wirksame Kontrolle in einer Zeit, in der die Reichen und Mächtigen in Europa und darüber hinaus immer mehr ihre Interessen durchsetzen.`,
                    `<strong>3.</strong> Seit dem Brexit sind wir mehr und nicht weniger europäisch geworden und haben jetzt eine neue Europa-Ausgabe herausgebracht. Wir haben eine Reihe neuer Korrespondenten auf dem europäischen Festland eingestellt, veröffentlichen jährlich Tausende Artikel zu europäischen Themen und werden von rund 180.000 Unterstützern finanziert, die in Europa leben – vom Atlantik bis zum Schwarzen Meer, vom hohen Norden bis zum Mittelmeer, darunter viele in Deutschland.`,
                    `Helfen Sie mit, den Journalismus des Guardian auch in den kommenden Jahren zu unterstützen, sei es mit einem kleinen oder größeren Betrag. `,
                ],
                highlightedText:
                    'Wenn möglich, unterstützen Sie uns bitte monatlich mit einem Beitrag von €2 oder mehr. Es dauert weniger als eine Minute, dies einzurichten und Sie können sicher sein, dass Sie jeden Monat einen großen Beitrag zur Unterstützung eines offenen, unabhängigen Journalismus leisten. Vielen Dank.',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: { heading: '', paragraphs: [''], highlightedText: '' },
            output: {
                heading: '… er is een goede reden om de Guardian <em>niet</em> te steunen.',
                paragraphs: [
                    `Niet iedereen kan het zich veroorloven om voor nieuws te betalen. Daarom houden we onze nieuwssite open voor iedereen. Als jij dat wilt, blijf ons dan vooral gratis lezen vanuit <strong>Nederland.</strong>`,
                    `Maar als je ons wel kan steunen, dan zijn daar <strong>drie</strong> goede redenen voor. `,
                    `<strong>1.</strong> We zijn volstrekt onafhankelijk en bepalen onze eigen agenda en dat is steeds meer een uitzondering in Europa.`,
                    `<strong>2.</strong> Onze onverschrokken onderzoeksjournalistiek is een belangrijke factor in deze tijd waarin de elite met steeds meer wegkomt, in Europa en daarbuiten.`,
                    `<strong>3.</strong> Sinds Brexit zijn we meer, niet minder, Europees geworden en hebben nu zelfs een nieuwe Europese editie gelanceerd. We hebben een groot aantal nieuwe correspondenten in Europa en publiceren duizenden artikelen per jaar over Europese zaken. We krijgen steun van ongeveer 180.000 supporters die in Europa wonen – van de Atlantische Oceaan tot aan de Zwarte Zee, van de Noordpool tot aan de Middellandse Zee, waaronder ook velen uit Nederland.`,
                    `Help mee om de journalistiek van de Guardian de komende jaren te versterken, met welk bedrag dan ook. `,
                ],
                highlightedText:
                    'Als je kunt, steun ons dan maandelijks vanaf slechts €2. Het kost minder dan een minuut om het te regelen en je kunt er zeker van zijn dat je elke maand een grote impact hebt op eerlijke, onafhankelijke berichtgeving.',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE1',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL1',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'NL',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: { heading: '', paragraphs: [''], highlightedText: '' },
            output: { heading: '', paragraphs: [''], highlightedText: '' },
        },
        {
            inputCountryCode: 'IT',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'SE',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'ES',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'GB',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
            output: {
                heading: 'default',
                paragraphs: ['default'],
                highlightedText: 'default',
            },
        },
        {
            inputCountryCode: 'US',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight (US)`,
            },
            output: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight (US)`,
            },
        },
        {
            inputCountryCode: '',
            inputTestName: 'LOCAL-LANGUAGE',
            inputVariant: 'CONTROL',
            inputDefaultEpic: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight`,
            },
            output: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight`,
            },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: { heading: '', paragraphs: [''], highlightedText: '' },
            output: { heading: '', paragraphs: [''], highlightedText: '' },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight`,
            },
            output: {
                heading: 'EpicHeaderTest',
                paragraphs: ['1', '2', '3', '4', '5'],
                highlightedText: `Highlight`,
            },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: {
                heading: undefined,
                paragraphs: undefined,
                highlightedText: undefined,
            },
            output: {
                heading: undefined,
                paragraphs: undefined,
                highlightedText: undefined,
            },
        },
        {
            inputCountryCode: '',
            inputTestName: '',
            inputVariant: '',
            inputDefaultEpic: undefined,
            output: undefined,
        },
    ];

    countriesEpic.forEach(
        ({ inputTestName, inputVariant, inputCountryCode, inputDefaultEpic, output }) => {
            it(`returns ${output}, given ${inputCountryCode}`, () => {
                expect(
                    countryCodeToLocalLanguageEpic(
                        inputTestName,
                        inputVariant,
                        inputCountryCode,
                        inputDefaultEpic,
                    ),
                ).toEqual(output);
            });
        },
    );
});
