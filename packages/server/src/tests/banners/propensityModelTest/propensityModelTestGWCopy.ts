import { BannerContent } from '@sdc/shared/dist/types';
import { CountryGroupId } from '@sdc/shared/dist/lib';

export const AU_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print, in Australia',
    paragraphs: [
        'News moves fast. Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian’s bureaux in Australia and across the globe and delivered to your door. For a limited time, save 25% on an annual subscription.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly?promoCode=GW25OZ',
        text: 'Learn more',
    },
};

export const NZ_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print, delivered to you',
    paragraphs: [
        'News moves fast. Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian’s bureaux in Australia and across the globe and delivered to your door. For a limited time, save 25% on an annual subscription.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly?promoCode=GW25OZ',
        text: 'Learn more',
    },
};

export const EU_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print',
    paragraphs: [
        'More people across Europe are reading the Guardian. Pause to consider a whole new perspective with the Guardian’s weekly news magazine. Home delivery available wherever you are.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Support the Guardian',
    },
};

export const UK_US_ROW_GW_CONTENT: BannerContent = {
    heading: 'Read the Guardian in print',
    paragraphs: [
        'Find clarity with the Guardian Weekly – an essential roundup of news, analysis and insight, handpicked from the Guardian and delivered to your door.',
    ],
    cta: {
        baseUrl: 'https://support.theguardian.com/subscribe/weekly',
        text: 'Support the Guardian',
    },
};

// TODO content
export const GW_CONTENT: { [key in CountryGroupId]: BannerContent } = {
    GBPCountries: UK_US_ROW_GW_CONTENT,
    UnitedStates: UK_US_ROW_GW_CONTENT,
    International: UK_US_ROW_GW_CONTENT,
    EURCountries: EU_GW_CONTENT,
    AUDCountries: AU_GW_CONTENT,
    Canada: UK_US_ROW_GW_CONTENT,
    NZDCountries: NZ_GW_CONTENT,
};
