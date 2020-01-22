import { EpicMetadata } from '../components/DefaultEpic';

export const getTrackingUrl = (baseUrl: string, params: EpicMetadata): string => {
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

    return `${baseUrl}?REFPVID=${params.ophanPageId}&INTCMP=${params.campaignCode}&acquisitionData=${acquisitionData}`;
};
