import { Image } from '@sdc/shared/src/types';
import { ReactNode } from 'react';

export type CtaStateSettings = {
    textColour: string;
    backgroundColour: string;
    border?: string;
};

export interface CtaSettings {
    default: CtaStateSettings;
    hover: CtaStateSettings;
}

export interface HighlightedTextSettings {
    textColour: string;
    highlightColour?: string;
}

type SignInComponentAfter = 'BODY' | 'CTA';

export interface BannerTemplateSettings {
    backgroundColour: string;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
    closeButtonSettings: CtaSettings;
    highlightedTextSettings: HighlightedTextSettings;
    setReminderCtaSettings?: CtaSettings;
    articleCountTextColour?: string;
    imageSettings?: Image;
    alternativeVisual?: ReactNode;
    signInComponentAfter?: SignInComponentAfter;
}
