import { Image } from '@sdc/shared/dist/types';
import { ReactNode } from 'react';
import { BannerId } from '../common/types';

export type ContainerSettings = {
    backgroundColour: string;
    paddingTop?: string;
};

export type CtaStateSettings = {
    textColour: string;
    backgroundColour: string;
    border?: string;
};

export interface CtaSettings {
    default: CtaStateSettings;
    hover: CtaStateSettings;
    mobile?: CtaStateSettings;
    desktop?: CtaStateSettings;
    theme?: 'default' | 'brand';
}

export interface BodyCopySettings {
    textColour: string;
}

export interface HighlightedTextSettings {
    textColour: string;
    highlightColour?: string;
    newLine?: boolean;
}

export interface TickerStylingSettings {
    textColour: string;
    filledProgressColour: string;
    progressBarBackgroundColour: string;
    goalMarkerColour: string;
}

export interface HeaderSettings {
    textColour: string;
}

export interface BannerTemplateSettings {
    containerSettings: ContainerSettings;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
    closeButtonSettings: CtaSettings;
    bodyCopySettings?: BodyCopySettings;
    highlightedTextSettings: HighlightedTextSettings;
    setReminderCtaSettings?: CtaSettings;
    articleCountTextColour?: string;
    imageSettings?: Image;
    alternativeVisual?: ReactNode;
    bannerId?: BannerId;
    tickerStylingSettings?: TickerStylingSettings;
    headerSettings?: HeaderSettings;
}
