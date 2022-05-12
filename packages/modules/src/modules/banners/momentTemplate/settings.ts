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

export interface BannerTemplateSettings {
    backgroundColour: string;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
    closeButtonSettings: CtaSettings;
    imageSettings: Image;
}
