type SubscriptionsProductType = 'DigitalSubscription' | 'GuardianWeekly';

type OphanComponentType =
    | 'ACQUISITIONS_ENGAGEMENT_BANNER'
    | 'ACQUISITIONS_THANK_YOU_EPIC'
    | 'ACQUISITIONS_SUBSCRIPTIONS_BANNER';

type AcquisitionLinkParams = {
    base: string;
    componentType: OphanComponentType;
    componentId: string;
    campaignCode: string;
    abTest?: {
        name: string;
        variant: string;
    };
};
type AcquisitionData = {
    componentType?: OphanComponentType;
    componentId?: string;
    campaignCode: string;
    abTest?: {
        name: string;
        variant: string;
    };
};

type Query = {
    REFPVID: string;
    INTCMP: string;
    acquisitionData: string;
};

const COMPONENT_TYPE = 'ACQUISITIONS_SUBSCRIPTIONS_BANNER';
const OPHAN_EVENT_ID = 'acquisitions-subscription-banner';
const CAMPAIGN_CODE = 'gdnwb_copts_banner_subscribe_SubscriptionBanner_digital';
const GUARDIAN_WEEKLY_CAMPAIGN_CODE = 'gdnwb_copts_banner_subscribe_SubscriptionBanner_gWeekly';

const constructURLQuery = (query: Query): string => {
    return `REFPVID=${encodeURIComponent(query.REFPVID)}&INTCMP=${encodeURIComponent(
        query.INTCMP,
    )}&acquisitionData=${encodeURIComponent(query.acquisitionData)}`;
};

const addReferrerData = (acquisitionData: {}, ophanPageId: string, referrerUrl: string): {} => ({
    ...acquisitionData,
    referrerPageviewId: ophanPageId,
    referrerUrl: referrerUrl,
});

const addTrackingCodesToUrl = (
    { base, componentType, componentId, campaignCode, abTest }: AcquisitionLinkParams,
    ophanPageId: string,
    referrerUrl: string,
): string => {
    const acquisitionData = addReferrerData(
        {
            source: 'GUARDIAN_WEB',
            componentId,
            componentType,
            campaignCode,
            abTest,
        },
        ophanPageId,
        referrerUrl,
    );

    const stringifiedAcquisitionData = JSON.stringify(acquisitionData);

    const params = {
        REFPVID: ophanPageId || 'not_found',
        INTCMP: campaignCode,
        acquisitionData: stringifiedAcquisitionData,
    };

    return `${base}${base.includes('?') ? '&' : '?'}${constructURLQuery(params)}`;
};

const guardianWeeklyBaseUrl = 'https://support.theguardian.com/subscribe/weekly';
const digitalSubscriptionsBaseUrl = 'https://support.theguardian.com/subscribe/digital';

export const getSubscriptionUrl = (
    productType: SubscriptionsProductType,
    ophanPageId: string,
    referrerUrl: string,
): string => {
    const weeklySubsUrl = addTrackingCodesToUrl(
        {
            base: guardianWeeklyBaseUrl,
            componentType: COMPONENT_TYPE,
            componentId: OPHAN_EVENT_ID,
            campaignCode: GUARDIAN_WEEKLY_CAMPAIGN_CODE,
        },
        ophanPageId,
        referrerUrl,
    );
    const digiSubsUrl = addTrackingCodesToUrl(
        {
            base: digitalSubscriptionsBaseUrl,
            componentType: COMPONENT_TYPE,
            componentId: OPHAN_EVENT_ID,
            campaignCode: CAMPAIGN_CODE,
        },
        ophanPageId,
        referrerUrl,
    );
    return productType === 'GuardianWeekly' ? weeklySubsUrl : digiSubsUrl;
};

export const getSignInUrl = (productType: SubscriptionsProductType): string => {
    return productType === 'GuardianWeekly'
        ? 'https://theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs'
        : 'https://theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';
};
