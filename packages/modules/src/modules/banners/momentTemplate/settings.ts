import { Image } from '@sdc/shared/src/types';
import { ReactNode } from 'react';
import { BannerId } from '../common/types';

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
}

export interface HighlightedTextSettings {
    textColour: string;
    highlightColour?: string;
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
    backgroundColour: string;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings?: CtaSettings;
    closeButtonSettings: CtaSettings;
    highlightedTextSettings: HighlightedTextSettings;
    setReminderCtaSettings?: CtaSettings;
    articleCountTextColour?: string;
    imageSettings?: Image;
    alternativeVisual?: ReactNode;
    bannerId?: BannerId;
    tickerStylingSettings?: TickerStylingSettings;
    headerSettings?: HeaderSettings;
}
