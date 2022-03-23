import { BannerContent, SecondaryCtaType } from '@sdc/shared/types';

const digisubContent = (paragraphs: string[]): BannerContent => ({
    heading: 'Power open, independent journalism',
    paragraphs,
    highlightedText:
        'And to say thank you, we’ll give you ad-free reading, and exclusive access to premium features on our award-winning apps.',
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

// TODO
export const USDigisubContent = digisubContent([
    'Millions turn to the Guardian every day for fiercely independent journalism that’s open and free for all. We have no shareholders, no billionaire owner and no commercial or political bosses. Just the passion and determination to bring readers quality, truth-seeking reporting on the world, its people and power. This makes us different. Show your support today by becoming a digital subscriber, from just $2.50 a week. Doing so helps to protect our vital independence, it keeps us free of a paywall, and makes a real difference for our future.',
]);
export const UKDigisubContent = digisubContent([
    'Millions turn to the Guardian every day for fiercely independent journalism that’s open and free for all. We have no shareholders, no billionaire owner and no commercial or political bosses. Just the passion and determination to bring readers quality, truth-seeking reporting on the world, its people and power. This makes us different. Show your support today by becoming a digital subscriber, from just $2.50 a week. Doing so helps to protect our vital independence, it keeps us free of a paywall, and makes a real difference for our future.',
]);

// TODO
export const GWContent: BannerContent = {
    heading: '',
    paragraphs: [],
    highlightedText: '',
    cta: {
        baseUrl: '',
        text: '',
    },
};
