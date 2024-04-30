import {
    BannerProps,
    SecondaryCtaType,
    TickerCountType,
    TickerEndType,
    TickerSettings,
    Tracking,
} from '@sdc/shared/types';

export const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'UsEoyAppealBannerSupporters',
    abTestVariant: 'control',
    campaignCode: 'UsEoyAppealBanner_control',
};

export const content = {
    heading: 'Show your support for high&#8209;impact reporting.',
    messageText:
        'In the extraordinary year that was 2021, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
    paragraphs: [
        'In the extraordinary year that was 2022, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth.',
        'You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
    ],
    mobileMessageText:
        'With 2021 offering new hope, %%ARTICLE_COUNT%% articles we commit to another year of independent journalism.',
    highlightedText: 'Support us from as little as %%CURRENCY_SYMBOL%%1.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
    },
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            baseUrl: 'https://support.theguardian.com/contribute',
            text: 'Learn more',
        },
    },
};

export const tickerSettings: TickerSettings = {
    tickerData: {
        total: 50000,
        goal: 200000,
    },
    end: 250000,
    countType: TickerCountType.people,
    endType: TickerEndType.unlimited,
    countryGroupId: 'AUDCountries',
    name: 'AU',
};

export const props: BannerProps = {
    bannerChannel: 'contributions',
    isSupporter: false,
    countryCode: 'GB',
    tracking,
    content: content,
    tickerSettings,
    separateArticleCount: true,
    numArticles: 6,
};
