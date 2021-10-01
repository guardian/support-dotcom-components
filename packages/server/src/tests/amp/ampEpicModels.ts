import { CountryGroupId } from '@sdc/shared/lib';
import { Cta, TickerSettings } from '@sdc/shared/types';
import { AMPTicker } from './ampTicker';

/**
 * Models for the data returned to AMP
 */
export interface AMPCta {
    text: string;
    url: string;
    componentId: string;
    campaignCode: string;
}

export interface AMPEpic {
    testName: string;
    variantName: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: AMPCta;
    ticker?: AMPTicker;
    showChoiceCards?: boolean;
}

/**
 * Models for the data published by the epic tool
 */
export interface AmpEpicTestVariant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta?: Cta;
    tickerSettings?: TickerSettings;
    showChoiceCards?: boolean;
}

export interface AmpEpicTest {
    name: string;
    nickname?: string;
    isOn: boolean;
    locations: CountryGroupId[];
    variants: AmpEpicTestVariant[];
}
