import { Image } from '@sdc/shared/dist/types';
import { ReactNode } from 'react';
import { BannerId } from '../common/types';
import { ChoiceCardSettings } from '../common/choiceCard/ChoiceCards';

export type ContainerSettings = {
    backgroundColour: string;
    textColor?: string;
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
}

export interface HighlightedTextSettings {
    textColour: string;
    highlightColour?: string;
}

export interface TickerStylingSettings {
    textColour: string;
    filledProgressColour: string;
    progressBarBackgroundColour: string;
}

export interface HeaderSettings {
    textColour?: string;
    headerImage?: Image;
}

export interface BannerTemplateSettings {
    containerSettings: ContainerSettings;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
    closeButtonSettings: CtaSettings;
    highlightedTextSettings: HighlightedTextSettings;
    setReminderCtaSettings?: CtaSettings;
    articleCountTextColour?: string;
    imageSettings?: Image;
    alternativeVisual?: ReactNode;
    choiceCardSettings?: ChoiceCardSettings;
    bannerId?: BannerId;
    tickerStylingSettings?: TickerStylingSettings;
    headerSettings?: HeaderSettings;
}
