import { OphanAction, OphanComponentEvent } from '../types/ophan';
import { addRegionIdToSupportUrl } from './geolocation';
import { EpicTest, EpicVariant, Tracking } from '../types';
import { BannerTest, BannerVariant } from '../types/abTests/banner';

// TRACKING VIA support.theguardian.com
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
    const abTests = [
        {
            name: params.abTestName,
            variant: params.abTestVariant,
            testType: 'MESSAGE_TEST',
        },
    ];
    if (params.amountsAbTestName) {
        abTests.push({
            name: params.amountsAbTestName,
            variant: params.amountsAbTestVariant,
            testType: 'AMOUNTS_TEST',
        });
    }
    if (params.targetingAbTest) {
        abTests.push({
            name: params.targetingAbTest.testName,
            variant: params.targetingAbTest.variantName,
            testType: 'TARGETING_TEST',
        });
    }

    const acquisitionData = encodeURIComponent(
        JSON.stringify({
            source: params.platformId,
            componentId: params.campaignCode,
            componentType: params.componentType,
            campaignCode: params.campaignCode,
            abTests,
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
        numArticles: numArticles || 0,
    };

    const queryString = Object.entries(trackingLinkParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes('?');

    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join('&')}`;
};

export const isSupportUrl = (baseUrl: string): boolean => /\bsupport\./.test(baseUrl);

export const addRegionIdAndTrackingParamsToSupportUrl = (
    baseUrl: string,
    tracking: Tracking,
    numArticles?: number,
    countryCode?: string,
): string => {
    return isSupportUrl(baseUrl)
        ? addTrackingParams(addRegionIdToSupportUrl(baseUrl, countryCode), tracking, numArticles)
        : baseUrl;
};

const hrefRegex = /href=\"(.*?)\"/g;
export const addTrackingParamsToBodyLinks = (
    text: string,
    tracking: Tracking,
    numArticles?: number,
    countryCode?: string,
): string => {
    const trackingWithLabel = addLabelToTracking(tracking, 'body-link');

    const replaceHref = (wholeMatch: string, url: string) =>
        `href="${addRegionIdAndTrackingParamsToSupportUrl(
            url,
            trackingWithLabel,
            numArticles,
            countryCode,
        )}"`;

    return text.replace(hrefRegex, replaceHref);
};

// TRACKING VIA profile.theguardian.com
type ProfileLinkParams = {
    componentEventParams: string;
    returnUrl: string;
};

export const addProfileTrackingParams = (baseUrl: string, params: Tracking): string => {
    const constructQuery = (query: Partial<Tracking>): string =>
        Object.keys(query)
            .map((param: string) => {
                const value = query[param];
                const queryValue = Array.isArray(value)
                    ? value.map(v => encodeURIComponent(v)).join(',')
                    : encodeURIComponent(value);
                return `${param}=${queryValue}`;
            })
            .join('&');

    const componentEventParamsData = {
        componentType: params.componentType,
        componentId: params.campaignCode,
        abTestName: params.abTestName,
        abTestVariant: params.abTestVariant,
        viewId: params.ophanPageId,
    };

    const trackingLinkParams: ProfileLinkParams = {
        // Note: profile subdomain take uri encoded query params NOT json
        componentEventParams: encodeURIComponent(constructQuery(componentEventParamsData)),
        returnUrl: params.referrerUrl,
    };

    const queryString = Object.entries(trackingLinkParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes('?');

    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join('&')}`;
};

export const isProfileUrl = (baseUrl: string): boolean => /\bprofile\./.test(baseUrl);
export const addTrackingParamsToProfileUrl = (baseUrl: string, tracking: Tracking): string => {
    return isProfileUrl(baseUrl) ? addProfileTrackingParams(baseUrl, tracking) : baseUrl;
};

// SHARED TRACKING
const campaignPrefix = 'gdnwb_copts_memco';

export const buildCampaignCode = (test: EpicTest, variant: EpicVariant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (testName: string, variantName: string): string =>
    `AMP__${testName}__${variantName}`;

// RJR message for reviewers: I'm nervous about adding amounts test to events - may be worth mobbing on - to decide if it's necessary and, if yes, the best way to do it?
const createEventFromTracking = (action: OphanAction) => {
    return (tracking: Tracking, componentId: string): OphanComponentEvent => {
        const {
            abTestName,
            abTestVariant,
            amountsAbTestName,
            amountsAbTestVariant,
            componentType,
            products = [],
            labels = [],
            campaignCode,
        } = tracking;
        const abTest =
            abTestName && abTestVariant
                ? {
                      name: abTestName,
                      variant: abTestVariant,
                  }
                : null;

        const amountsAbTest =
            amountsAbTestName && amountsAbTestVariant
                ? {
                      name: amountsAbTestName,
                      variant: amountsAbTestVariant,
                  }
                : null;

        const targetingAbTest = tracking.targetingAbTest
            ? {
                  name: tracking.targetingAbTest.testName,
                  variant: tracking.targetingAbTest.variantName,
              }
            : null;

        return {
            component: {
                componentType,
                products,
                campaignCode,
                id: componentId,
                labels,
            },
            ...(abTest ? { abTest } : {}),
            ...(amountsAbTest ? { amountsAbTest } : {}),
            ...(targetingAbTest ? { targetingAbTest } : {}),
            action,
        };
    };
};

export const addLabelToTracking = (tracking: Tracking, label: string): Tracking => {
    if (tracking.labels) {
        return {
            ...tracking,
            labels: [...tracking.labels, label],
        };
    } else {
        return {
            ...tracking,
            labels: [label],
        };
    }
};

export const createClickEventFromTracking = createEventFromTracking('CLICK');

export const createViewEventFromTracking = createEventFromTracking('VIEW');

export const createInsertEventFromTracking = createEventFromTracking('INSERT');
