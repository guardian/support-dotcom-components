import { Image } from '@sdc/shared/dist/types';
import { ReactNode } from 'react';
import { BannerId } from '../common/types';

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

type GuardianRoundel = 'default' | 'brand' | 'inverse';
type GuardianTheme = 'default' | 'brand';

export interface CtaSettings {
    default: CtaStateSettings;
    hover: CtaStateSettings;
    mobile?: CtaStateSettings;
    desktop?: CtaStateSettings;
    theme?: GuardianTheme;
    guardianRoundel?: GuardianRoundel;
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
    image?: ReactNode;
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
    choiceCards?: boolean;
    bannerId?: BannerId;
    tickerStylingSettings?: TickerStylingSettings;
    headerSettings?: HeaderSettings;
}
