export const LocalLanguageBannerTemplateName = 'LocalLanguageMomentBanner';
const LocalLanguageBannerTestName = 'PD-TEST';
const LocalLanguageBannerVariant = 'CONTROL';
const LocalLanguageEpicTestName = 'PD-TEST';
const LocalLanguageEpicVariant = 'CONTROL';

export type LocalLanguage = {
    bannerHeader?: string;
    epicHeader?: string;
    epicParagraphs?: string[];
};
type LocalLanguages = Record<string, LocalLanguage>;

const localLanguages: LocalLanguages = {
    FR: {
        bannerHeader: 'Faites partie de notre aventure européenne !',
        epicHeader: 'Faites partie de notre aventure européenne !',
        epicParagraphs: [
            `Le Guardian est une rédaction indépendante au sein de laquelle nos journalistes se passionnent pour la justice sociale, l’environnement et la science. Cette semaine/ Ce mois-ci, nous lançons notre nouvelle édition en ligne dédiée à nos lecteurs en Europe, et donc à vous, en France. Nous vous invitons à faire partie de cette aventure en nous apportant votre soutien dès aujourd’hui.`,
            `Nos investigations mettent en lumière les dessous du pouvoir et dénoncent l’injustice et la corruption. Dans un monde surmédiatisé, étouffé par la désinformation et le sensationnalisme, nous nous engageons à relayer l'exactitude et la véracité des faits. Aucun milliardaire, aucun actionnaire ne contrôle notre ligne éditoriale. Nos contenus sont gratuits et accessibles à tous, nous n’avons pas de paywall. Nous voulons garantir un accès libre à une information fiable et intègre, et ce, au plus grand nombre.`,
            `Afin que ce travail essentiel perdure dans les années à venir, nous avons besoin du soutien des lecteurs. Si vous le pouvez, une contribution de seulement 2 euros par mois peut dès aujourd’hui faire toute la différence. Merci.`,
        ],
    },
    DE: {
        bannerHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
        epicHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
        epicParagraphs: ['1', '2', '3', '4'],
    },
    IT: {
        bannerHeader: 'Prendi parte alla nostra nuova avventura europea!',
        epicHeader: 'Prendi parte alla nostra nuova avventura europea!',
        epicParagraphs: ['1', '2', '3', '4'],
    },
    NL: {
        bannerHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
        epicHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
        epicParagraphs: ['1', '2', '3', '4'],
    },
    SE: {
        bannerHeader: 'Ta del av vårt nya europeiska äventyr!',
        epicHeader: 'Ta del av vårt nya europeiska äventyr!',
        epicParagraphs: ['1', '2', '3', '4'],
    },
    SP: {
        bannerHeader: '¡Participa en nuestra nueva aventura europea!',
        epicHeader: '¡Participa en nuestra nueva aventura europea!',
        epicParagraphs: ['1', '2', '3', '4'],
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
                epicParagraphs: dfltLocalLanguage?.epicParagraphs,
            }
        );
    }
};
