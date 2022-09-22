import { neutral, news } from '@guardian/src-foundations';
import { BannerTemplateSettings } from '../momentTemplate/settings';

export const settings: Omit<BannerTemplateSettings, 'imageSettings'> = {
    backgroundColour: '#FBF6EF',
    articleCountTextColour: news[400],
    primaryCtaSettings: {
        default: {
            backgroundColour: neutral[7],
            textColour: neutral[100],
        },
        hover: {
            backgroundColour: '#454545',
            textColour: neutral[100],
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#FBF6EF',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#FBF6EF',
            textColour: neutral[0],
            border: `1px solid ${neutral[0]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[100],
        highlightColour: news[400],
    },
};
