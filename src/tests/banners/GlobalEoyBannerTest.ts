import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { globalEoy } from '../../modules';

const heading = 'Show your support for high-impact reporting';
const mobileCopy =
    'With 2021 offering new hope, we commit to another year of quality reporting. Support us from %%CURRENCY_SYMBOL%%1.';

export const GlobalEoyACBanner: BannerTest = {
    name: 'GlobalEoyBanner__AC',
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
    ],
};

export const GlobalEoyNoACBanner: BannerTest = {
    name: 'GlobalEoyBanner__NoAC',
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
    ],
};
