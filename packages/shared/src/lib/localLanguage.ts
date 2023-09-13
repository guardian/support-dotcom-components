type LocalLanguageBannerHeader = {
    bannerHeader?: string;
};
type LocalLanguageEpic = {
    heading?: string;
    paragraphs?: string[];
    highlightedText?: string;
};

const localLanguageBannerHeaders: Record<string, LocalLanguageBannerHeader> = {
    FR: {
        bannerHeader: 'Soutenez un journalisme européen et indépendant ',
    },
    DE: {
        bannerHeader: 'Unterstützen Sie unabhängigen europäischen Journalismus',
    },
    IT: {
        bannerHeader: 'Sostieni un giornalismo europeo indipendente',
    },
    NL: {
        bannerHeader: 'Steun de onafhankelijke journalistiek',
    },
    SE: {
        bannerHeader: 'Var med och stöd oberoende journalistik i Europa',
    },
    SP: {
        bannerHeader: 'Fomentar el periodismo europeo independiente',
    },
};
const localLanguageEpic = {
    FR: {
        heading: '… il existe une bonne raison de ne pas soutenir le Guardian.',
        paragraphs: [
            `Actuellement, beaucoup de lecteurs ne sont pas ou plus en mesure de payer pour accéder aux informations. C’est pour cela que nos contenus sont et resteront gratuits et ouverts à tous. Si tel est votre cas, vous pouvez continuer à lire nos articles librement, comme vous le faites à présent, depuis la France.`,
            `Si au contraire, vous avez les moyens de contribuer financièrement, voici trois bonnes raisons de soutenir le Guardian dès aujourd’hui.`,
            `1. Nous sommes une rédaction indépendante. Personne ne contrôle notre ligne éditoriale ; fait rare en Europe où la liberté des médias est souvent compromise par le poids des actionnaires et la corruption.`,
            `2. Notre journalisme d'investigation met en lumière les dessous du pouvoir et dénonce l’injustice en Europe et dans le monde entier.`,
            `3. Même sous l'ère du Brexit, nous restons plus européens que jamais. Nous venons de lancer notre nouvelle édition en ligne en anglais, dédiée à nos lecteurs en Europe, et donc à vous, en France. Cette année, nous avons investi dans notre journalisme européen, recruté de nouveaux correspondants sur le continent et publié plusieurs milliers d'articles sur les affaires européennes. Nous comptons désormais environ 180 000 de nos contributeurs en Europe.`,
            `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. `,
        ],
        highlightedText:
            'Si vous le pouvez, une contribution de seulement €2 par mois peut dès aujourd’hui faire toute la différence. Merci.',
    },
    DE: {
        heading: '… es gibt einen guten Grund, den Guardian nicht zu unterstützen.',
        paragraphs: [
            `Nicht jeder kann es sich zur Zeit leisten, für Nachrichten zu bezahlen. Deshalb bieten wir unseren Journalismus jedem frei zugänglich an. Falls das auf Sie zutrifft, lesen Sie bitte kostenfrei weiter, wenn Sie heute aus Deutschland zu uns stoßen.`,
            `Aber wenn Sie dazu in der Lage sind, dann gibt es drei gute Gründe, uns heute zu unterstützen.`,
            `1. Wir sind absolut unabhängig und legen unsere eigene Agenda fest, eine zunehmende Seltenheit in einem Europa der nicht unabhängigen Medien.`,
            `2. Unser furchtloser, investigativer Journalismus bietet eine wirksame Kontrolle in einer Zeit, in der die Reichen und Mächtigen in Europa und darüber hinaus immer mehr ihre Interessen durchsetzen.`,
            `3. Seit dem Brexit sind wir mehr und nicht weniger europäisch geworden und haben jetzt eine neue Europa-Ausgabe herausgebracht. Wir haben eine Reihe neuer Korrespondenten auf dem europäischen Festland eingestellt, veröffentlichen jährlich tausende von Artikeln zu europäischen Themen und werden von rund 180.000 Unterstützern finanziert, die in Europa leben – vom Atlantik bis zum Schwarzen Meer, vom hohen Norden bis zum Mittelmeer, darunter viele in Deutschland.`,
            `Helfen Sie mit, den Journalismus des Guardian auch in den kommenden Jahren zu unterstützen, sei es mit einem kleinen oder größeren Betrag. `,
        ],
        highlightedText:
            'Wenn möglich, unterstützen Sie uns bitte monatlich mit einem Beitrag von €2 oder mehr. Es dauert weniger als eine Minute, dies einzurichten und Sie können sicher sein, dass Sie jeden Monat einen großen Beitrag zur Unterstützung eines offenen, unabhängigen Journalismus leisten. Vielen Dank.',
    },
    NL: {
        heading: '… er is een goede reden om de Guardian niet te steunen.',
        paragraphs: [
            `Niet iedereen kan het zich veroorloven om voor nieuws te betalen. Daarom houden we onze nieuwssite open voor iedereen. Als jij dat wilt, blijf ons dan vooral gratis lezen vanuit Nederland.`,
            `Maar als je ons wel kan steunen, dan zijn daar drie goede redenen voor. `,
            `1. We zijn volstrekt onafhankelijk en bepalen onze eigen agenda en dat is steeds meer een uitzondering in Europa.`,
            `2. Onze onverschrokken onderzoeksjournalistiek is een belangrijke factor in deze tijd waarin de elite met steeds meer wegkomt, in Europa en daarbuiten.`,
            `3. Sinds Brexit zijn we meer, niet minder, Europees geworden en hebben nu zelfs een nieuwe Europese editie gelanceerd. We hebben een groot aantal nieuwe correspondenten in Europa en publiceren duizenden artikelen per jaar over Europese zaken. We krijgen steun van ongeveer 180.000 supporters die in Europa wonen – van de Atlantische Oceaan tot aan de Zwarte Zee, van de Noordpool tot aan de Middellandse Zee, waaronder ook velen uit Nederland.`,
            `Help mee om de journalistiek van de Guardian de komende jaren te versterken, met welk bedrag dan ook. `,
        ],
        highlightedText:
            'Als je kunt, steun ons dan maandelijks vanaf slechts €2. Het kost minder dan een minuut om het te regelen en je kunt er zeker van zijn dat je elke maand een grote impact hebt op eerlijke, onafhankelijke berichtgeving.',
    },
};

export const countryCodeToLocalLanguageBannerHeader = (
    testName: string,
    variantName: string,
    countryCode: string,
    defaultBannerHeader: LocalLanguageBannerHeader,
): LocalLanguageBannerHeader => {
    if (
        testName === 'LOCAL-LANGUAGE' &&
        variantName === 'CONTROL' &&
        localLanguageBannerHeaders[countryCode]
    ) {
        return localLanguageBannerHeaders[countryCode];
    }
    return defaultBannerHeader;
};

export const countryCodeToLocalLanguageEpic = (
    testName: string,
    variantName: string,
    countryCode: string,
    defaultEpic: LocalLanguageEpic,
): LocalLanguageEpic => {
    if (
        testName === 'LOCAL-LANGUAGE' &&
        variantName === 'CONTROL' &&
        localLanguageEpic[countryCode]
    ) {
        return localLanguageEpic[countryCode];
    }
    return defaultEpic;
};
