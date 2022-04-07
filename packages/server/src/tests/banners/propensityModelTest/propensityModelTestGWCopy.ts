import { BannerContent } from '@sdc/shared/dist/types';

const ausPromoEnds = Date.parse('2022-04-10');
const isAusPromoLive = (): boolean => Date.now() < ausPromoEnds;

const francePromoEnds = Date.parse('2022-04-26');
const isFrancePromoLive = (): boolean => Date.now() < francePromoEnds;

export const AU_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print, in Australia',
    paragraphs: [
        `News moves fast. Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian’s bureaux in Australia and across the globe and delivered to your door.${
            isAusPromoLive() ? 'For a limited time, save 25% on an annual subscription.' : ''
        }`,
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Learn more',
    },
};

export const NZ_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print, delivered to you',
    paragraphs: [
        `News moves fast. Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian’s bureaux in Australia and across the globe and delivered to your door.${
            isAusPromoLive() ? 'For a limited time, save 25% on an annual subscription.' : ''
        }`,
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Learn more',
    },
};

export const EU_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print',
    paragraphs: [
        isFrancePromoLive()
            ? 'The French election comes at a time of unpredictability for Europe. Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian and Observer editorial team from across the globe and delivered to your door. For a limited time, save 30% on an annual subscription.'
            : 'More people across Europe are reading the Guardian. Pause to consider a whole new perspective with the Guardian’s weekly news magazine. Home delivery available wherever you are.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Support the Guardian',
    },
};

export const US_CAN_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print',
    paragraphs: [
        'Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian and delivered to your door.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Support the Guardian',
    },
};

export const UK_ROW_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print',
    paragraphs: [
        isFrancePromoLive()
            ? 'Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian and delivered to your door.'
            : 'More people across Europe are reading the Guardian. Pause to consider a whole new perspective with the Guardian’s weekly news magazine. Home delivery available wherever you are.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Support the Guardian',
    },
};
