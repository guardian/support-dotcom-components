import { EpicTest, EpicVariant } from '../types/epic';
import { BannerTest, BannerVariant } from '../types/banner';
import { OphanAction, OphanComponentEvent } from '../types/ophan';
import { addRegionIdToSupportUrl } from './geolocation';
import { Tracking } from '../types/shared';

type LinkParams = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
    numArticles: number;
};

export const addTrackingParams = (
    baseUrl: string,
    params: Tracking,
    numArticles?: number,
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
            labels: params.labels,
        }),
    );

    const trackingLinkParams: LinkParams = {
        REFPVID: params.ophanPageId || 'not_found',
        INTCMP: params.campaignCode || '',
        acquisitionData: acquisitionData,
        numArticles,
    };

    const queryString = Object.entries(trackingLinkParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes('?');

    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join('&')}`;
};

export const addRegionIdAndTrackingParamsToSupportUrl = (
    baseUrl: string,
    tracking: Tracking,
    numArticles?: number,
    countryCode?: string,
): string => {
    const isSupportUrl = /\bsupport\./.test(baseUrl);

    return isSupportUrl
        ? addTrackingParams(addRegionIdToSupportUrl(baseUrl, countryCode), tracking, numArticles)
        : baseUrl;
};

const campaignPrefix = 'gdnwb_copts_memco';

export const buildCampaignCode = (test: EpicTest, variant: EpicVariant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (testName: string, variantName: string): string =>
    `AMP__${testName}__${variantName}`;

const createEventFromTracking = (action: OphanAction) => {
    return (tracking: Tracking, componentId: string): OphanComponentEvent => {
        const { abTestName, abTestVariant, componentType, products = [], campaignCode } = tracking;
        const abTest =
            abTestName && abTestVariant
                ? {
                      name: abTestName,
                      variant: abTestVariant,
                  }
                : null;

        return {
            component: {
                componentType,
                products,
                campaignCode,
                id: componentId,
            },
            ...(abTest ? { abTest } : {}),
            action,
        };
    };
};

export const createClickEventFromTracking = createEventFromTracking('CLICK');

export const createViewEventFromTracking = createEventFromTracking('VIEW');

export const createInsertEventFromTracking = createEventFromTracking('INSERT');
