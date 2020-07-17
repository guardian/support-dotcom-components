import { EpicTracking } from '../components/modules/epics/ContributionsEpicTypes';
import { BannerTracking } from '../components/modules/banners/contributions/BannerTypes';
import { Test, Variant } from '../lib/variants';
import { BannerTest, BannerVariant } from '../components/modules/banners/contributions/BannerTypes';

type LinkParams = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
};

// TODO: Unify Epic and Banner tracking?
export const addTrackingParams = (
    baseUrl: string,
    params: EpicTracking | BannerTracking,
): string => {
    const acquisitionData = encodeURIComponent(
        JSON.stringify({
            source: params.platformId,
            componentId: params.campaignCode,
            componentType: params.ophanComponentId,
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

    return `${baseUrl}?${queryString.join('&')}`;
};

const campaignPrefix = 'gdnwb_copts_memco';

export const buildCampaignCode = (test: Test, variant: Variant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;
