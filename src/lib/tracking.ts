import { EpicTracking } from '../components/modules/epics/ContributionsEpicTypes';
import { Test, Variant } from '../lib/variants';
import { BannerTest, BannerVariant, BannerTracking } from '../types/BannerTypes';
import { OphanComponentEvent } from '../types/OphanTypes';
import { addRegionIdToSupportUrl } from './geolocation';
import {HeaderTracking} from "../types/HeaderTypes";

type LinkParams = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
};

// TODO: Unify Epic and Banner tracking?
export const addTrackingParams = (
    baseUrl: string,
    params: EpicTracking | BannerTracking | HeaderTracking,
): string => {
    const acquisitionData = encodeURIComponent(
        JSON.stringify({
            source: params.platformId,
            componentId: params.campaignCode,
            componentType: params.componentType,
            campaignCode: params.campaignCode,
            abTest: {
                name: params.abTestName,
                variant: params.abTestVariant,
            },
            referrerPageviewId: params.ophanPageId,
            referrerUrl: params.referrerUrl,
            isRemote: true, // Temp param to indicate served by remote service
        }),
    );

    const trackingLinkParams: LinkParams = {
        REFPVID: params.ophanPageId || 'not_found',
        INTCMP: params.campaignCode || '',
        acquisitionData: acquisitionData,
    };

    const queryString = Object.entries(trackingLinkParams).map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes('?');

    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join('&')}`;
};

export const addRegionIdAndTrackingParamsToSupportUrl = (
    baseUrl: string,
    tracking: EpicTracking | BannerTracking | HeaderTracking,
    countryCode?: string,
): string => {
    const isSupportUrl = /\bsupport\./.test(baseUrl);

    return isSupportUrl
        ? addTrackingParams(addRegionIdToSupportUrl(baseUrl, countryCode), tracking)
        : baseUrl;
};

const campaignPrefix = 'gdnwb_copts_memco';

export const buildCampaignCode = (test: Test, variant: Variant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (testName: string, variantName: string): string =>
    `AMP__${testName}__${variantName}`;

export const createClickEventFromTracking = (
    tracking: BannerTracking,
    componentId: string,
): OphanComponentEvent => {
    const { abTestName, abTestVariant, componentType, products = [], campaignCode } = tracking;

    return {
        component: {
            componentType,
            products,
            campaignCode,
            id: componentId,
        },
        abTest: {
            name: abTestName,
            variant: abTestVariant,
        },
        action: 'CLICK',
    };
};

export const createViewEventFromTracking = (
    tracking: BannerTracking,
    componentId: string,
): OphanComponentEvent => {
    const { abTestName, abTestVariant, componentType, products = [], campaignCode } = tracking;

    return {
        component: {
            componentType,
            products,
            campaignCode,
            id: componentId,
        },
        abTest: {
            name: abTestName,
            variant: abTestVariant,
        },
        action: 'VIEW',
    };
};
