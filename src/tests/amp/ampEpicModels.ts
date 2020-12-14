import { Cta, TickerSettings } from '../../lib/variants';
import { CountryGroupId } from '../../lib/geolocation';
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
}

export interface AmpEpicTest {
    name: string;
    nickname?: string;
    isOn: boolean;
    locations: CountryGroupId[];
    variants: AmpEpicTestVariant[];
}

/**
 * Models for the data published by the epic tool
 */
export interface AmpEpicOphanData {
    testName: string;
    variantName: string;
}
