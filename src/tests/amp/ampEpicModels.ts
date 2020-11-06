import {Cta} from "../../lib/variants";
import {CountryGroupId} from "../../lib/geolocation";
import {AMPTicker} from "../ampTicker";

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
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: AMPCta;
    ticker?: AMPTicker;
}

// See https://amp.dev/documentation/components/amp-list/
export interface AMPEpicResponse {
    items: AMPEpic[];
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
}

export interface AmpEpicTest {
    name: string;
    nickname?: string;
    isOn: boolean;
    locations: CountryGroupId[];
    tagIds: string[];
    sections: string[];
    excludedTagIds: string[];
    excludedSections: string[];
    variants: AmpEpicTestVariant[];
}
