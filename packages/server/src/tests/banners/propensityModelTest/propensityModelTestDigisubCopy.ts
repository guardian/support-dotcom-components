import { BannerContent, SecondaryCtaType } from '@sdc/shared/types';

const buildDigisubContent = (paragraphs: string[], highlightedText: string): BannerContent => ({
    heading: 'Power open, independent journalism',
    paragraphs,
    highlightedText,
    cta: {
        baseUrl:
            'https://support.theguardian.com/subscribe/digital/checkout?promoCode=DK0NT24WG&period=Monthly',
        text: 'Subscribe',
    },
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            baseUrl: 'https://support.theguardian.com/subscribe/digital',
            text: 'Find out more',
        },
    },
});

const DEFAULT_HIGHLIGHTED_TEXT =
    'And to say thank you, we’ll give you ad-free reading, and exclusive access to premium features on our award-winning apps.';
const AU_HIGHLIGHTED_TEXT =
    'And to say thank you, we’ll give you ad-free reading, and exclusive access to the Australia Weekend app.';

const buildDigisubBody = (priceCopy: string): string =>
    `Millions turn to the Guardian every day for fiercely independent journalism that’s open and free for all. We have no shareholders, no billionaire owner and no commercial or political bosses. Just the passion and determination to bring readers quality, truth-seeking reporting on the world, its people and power. This makes us different. <strong>Show your support today by becoming a digital subscriber, ${priceCopy}.</strong> Doing so helps to protect our vital independence, it keeps us free of a paywall, and makes a real difference for our future.`;

export const US_ROW_DIGISUB_CONTENT = buildDigisubContent(
    [buildDigisubBody('from just $2.50 a week')],
    DEFAULT_HIGHLIGHTED_TEXT,
);
export const UK_DIGISUB_CONTENT = buildDigisubContent(
    [buildDigisubBody('from just £5.99 a month')],
    DEFAULT_HIGHLIGHTED_TEXT,
);
export const AU_DIGISUB_CONTENT = buildDigisubContent(
    [buildDigisubBody('from less than $3 a week')],
    AU_HIGHLIGHTED_TEXT,
);
export const EU_DIGISUB_CONTENT = buildDigisubContent(
    [buildDigisubBody('from just €7.49 a month')],
    DEFAULT_HIGHLIGHTED_TEXT,
);
export const CA_NZ_DIGISUB_CONTENT = buildDigisubContent(
    [buildDigisubBody('from just $3 a week')],
    DEFAULT_HIGHLIGHTED_TEXT,
);
