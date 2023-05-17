import { neutral } from '@guardian/src-foundations';
import { BannerTemplateSettings } from '../momentTemplate/settings';

export const settings: Omit<BannerTemplateSettings, 'imageSettings'> = {
    containerSettings: {
        backgroundColour: '#ffe500',
    },
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
            backgroundColour: '#ffe500',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#ffe500',
            textColour: neutral[0],
            border: `1px solid ${neutral[0]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    bodyCopySettings: {
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: neutral[100],
        },
    },
    setReminderCtaSettings: {
        default: {
            backgroundColour: '#ffe500',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
};
