import {
    BannerProps,
    TickerCountType,
    TickerEndType,
    SecondaryCtaType,
    Tracking,
    TickerSettings,
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

export const contentContributions = {
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

export const contentCharityAppeal = {
    heading: 'Lend us a hand in 2022',
    messageText:
        'Congratulations on being one of our top readers. We are proud to say we’re a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. Your support allows us to keep our reporting open for all, as we know not everyone is in a position to pay for news. But if you are, we need you. Make an investment in quality journalism today, so millions more can benefit. ',
    mobileMessageText:
        'Congratulations on being one of our top readers. We are proud to say we’re a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. Your support allows us to keep our reporting open for all, as we know not everyone is in a position to pay for news. But if you are, we need you. Make an investment in quality journalism today, so millions more can benefit. ',
    highlightedText: 'Support us today from as little as %%CURRENCY_SYMBOL%%1. Thank you.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
    },
};

export const tickerSettings: TickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: "It's not too late to give!",
        goalReachedSecondary: '',
    },
    tickerData: {
        total: 120_000,
        goal: 150_000,
    },
    name: 'US_2022',
};

export const props: BannerProps = {
    bannerChannel: 'contributions',
    isSupporter: false,
    countryCode: 'GB',
    tracking,
    content: contentContributions,
    tickerSettings,
    separateArticleCount: true,
    numArticles: 6,
};
