import { EpicTest, EpicVariant } from '@sdc/shared/types';
import { BannerTest, BannerVariant } from '@sdc/shared/types';
import { OphanAction, OphanComponentEvent } from '@sdc/shared/types';
import { addRegionIdToSupportUrl } from './geolocation';
import { Tracking } from '@sdc/shared/types';

type LinkParams = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
};

export const addTrackingParams = (baseUrl: string, params: Tracking): string => {
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
    };

    const queryString = Object.entries(trackingLinkParams).map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes('?');

    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join('&')}`;
};

export const addRegionIdAndTrackingParamsToSupportUrl = (
    baseUrl: string,
    tracking: Tracking,
    countryCode?: string,
): string => {
    const isSupportUrl = /\bsupport\./.test(baseUrl);

    return isSupportUrl
        ? addTrackingParams(addRegionIdToSupportUrl(baseUrl, countryCode), tracking)
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
