import { Image } from '@sdc/shared/src/types';

export type CtaStateSettings = {
    textColour: string;
    backgroundColour: string;
    border?: string;
};

export interface CtaSettings {
    default: CtaStateSettings;
    hover: CtaStateSettings;
}

export interface VisualContainerSettings {
    display: string;
}

export interface HighlightedTextSettings {
    textColour: string;
    highlightColour?: string;
}

export interface BannerTemplateSettings {
    backgroundColour: string;
    headerBackground?: string;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
    closeButtonSettings: CtaSettings;
    highlightedTextSettings: HighlightedTextSettings;
    setReminderCtaSettings?: CtaSettings;
    imageSettings: Image;
    desktopVisualContainerOverride?: VisualContainerSettings;
    mobileVisualContainerOverride?: VisualContainerSettings;
    removeContainerPaddingRight?: boolean;
}
