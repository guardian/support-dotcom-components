import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { globalEoy } from '../../modules';

const heading = 'Show your support for high-impact reporting';
const mobileCopy =
    'With 2021 offering new hope, we commit to another year of quality reporting. Support us from %%CURRENCY_SYMBOL%%1.';

export const GlobalEoyInaugurationACBanner: BannerTest = {
    name: 'GlobalEoyBannerInauguration__AC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
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
                heading,
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
                heading,
                messageText:
                    'The Trump presidency is over, and the Biden-Harris era can begin. In a year of renewed hope, the Guardian will scrutinise the new administration just as rigorously as we did the last. You’ve read %%ARTICLE_COUNT%% articles in the last year. Millions around the world rely on our efforts to counter misinformation and conspiracy, with independent journalism grounded in truth and integrity. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
    ],
};

export const GlobalEoyInaugurationNoACBanner: BannerTest = {
    name: 'GlobalEoyBannerInauguration__NoAC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
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
                heading,
                messageText:
                    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. As 2021 begins and offers new hope, we commit to another year of high-impact reporting. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
        {
            name: 'variant',
            modulePath: globalEoy.endpointPath,
            moduleName: 'GlobalEoyBanner',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading,
                messageText:
                    'The Trump presidency is over, and the Biden-Harris era can begin. In a year of renewed hope, the Guardian will scrutinise the new administration just as rigorously as we did the last. Millions around the world rely on our efforts to counter misinformation and conspiracy, with independent journalism grounded in truth and integrity. Support us from as little as %%CURRENCY_SYMBOL%%1.',
                mobileMessageText: mobileCopy,
            },
        },
    ],
};
