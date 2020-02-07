import { EpicTracking } from '../components/ContributionsEpicTypes';

type LinkParams = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
};

export const getTrackingUrl = (baseUrl: string, params: EpicTracking): string => {
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
