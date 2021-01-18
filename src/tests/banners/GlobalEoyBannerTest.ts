import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { globalEoy } from '../../modules';

const DEPLOY_TIMESTAMP = Date.parse('2020-12-29');

export const GlobalEoyInaugurationACBanner: BannerTest = {
    name: 'GlobalEoyInauguration__AC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
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
            bannerContent: {
                heading: 'Test heading',
                messageText: 'Test desktop body %%ARTICLE_COUNT%% articles',
                mobileMessageText: 'Test mobile body %%ARTICLE_COUNT%% articles',
            },
        },
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: 'Test heading',
                messageText: 'Test desktop body %%ARTICLE_COUNT%% articles',
                mobileMessageText: 'Test mobile body %%ARTICLE_COUNT%% articles',
            },
        },
    ],
};

export const GlobalEoyInaugurationNoACBanner: BannerTest = {
    name: 'GlobalEoyInauguration__NoAC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
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
            bannerContent: {
                heading: 'Test heading',
                messageText: 'Test desktop body',
                mobileMessageText: 'Test mobile body',
            },
        },
        {
            name: 'control',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: 'Test heading',
                messageText: 'Test desktop body',
                mobileMessageText: 'Test mobile body',
            },
        },
    ],
};
