import { neutral } from '@guardian/src-foundations';
import { BannerTemplateSettings } from '../momentTemplate/settings';

export const settings: Omit<BannerTemplateSettings, 'imageSettings'> = {
    backgroundColour: '#fffDf5',
    headerBackground: '#ffe500',
    primaryCtaSettings: {
        default: {
            backgroundColour: '#121212',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#454545',
            textColour: 'white',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[0],
            border: `1px solid ${neutral[0]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: '',
    },
    setReminderCtaSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
};
