import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { globalEoy } from '../../modules';

const DEPLOY_TIMESTAMP = Date.parse('2020-12-29');

export const GlobalEoyNonSupportersACBanner: BannerTest = {
    name: 'GlobalEoyNonSupporters__AC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    locations: [
        'GBPCountries',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        Date.now() >= DEPLOY_TIMESTAMP,
    minPageViews: 2,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    variants: [
        {
            name: 'control',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};

export const GlobalEoyNonSupportersNoACBanner: BannerTest = {
    name: 'GlobalEoyNonSupporters__NoAC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    locations: [
        'GBPCountries',
        'AUDCountries',
        'EURCountries',
        'International',
        'NZDCountries',
        'Canada',
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) =>
        Date.now() >= DEPLOY_TIMESTAMP,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
    ],
};
