import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { globalEoy } from '../../modules';

const mobileCopy =
    'With 2021 offering new hope, we commit to another year of quality reporting. Support us from %%CURRENCY_SYMBOL%%1.';

export const GlobalEoyInaugurationACBanner: BannerTest = {
    name: 'GlobalEoyInauguration__AC',
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
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
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
                messageText:
                    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 begins and offers new hope, we commit to another year of high-impact reporting. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: 'Test heading',
                messageText:
                    'The Trump era is over, and a Biden-Harris administration can begin. With 2021 offering new hope, the Guardian’s independence allows us to scrutinise the new presidency just as rigorously as we did the last. You’ve read %%ARTICLE_COUNT%% articles in the last year. Millions around the world rely on our efforts to counter misinformation and conspiracy, with journalism grounded in truth and integrity. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
    ],
};

export const GlobalEoyInaugurationNoACBanner: BannerTest = {
    name: 'GlobalEoyInauguration__NoAC',
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
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'control',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: 'Test heading',
                messageText:
                    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. As 2021 begins and offers new hope, we commit to another year of high-impact reporting. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
        {
            name: 'control',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: 'Test heading',
                messageText:
                    'The Trump era is over, and a Biden-Harris administration can begin. With 2021 offering new hope, the Guardian’s independence allows us to scrutinise the new presidency just as rigorously as we did the last. Millions around the world rely on our efforts to counter misinformation and conspiracy, with journalism grounded in truth and integrity. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
    ],
};
