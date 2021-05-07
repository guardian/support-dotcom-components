import { TickerCountType, TickerEndType } from '../../../../lib/variants';
import { BannerProps, BannerContent, BannerTracking } from '../../../../types/BannerTypes';

export const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'UsEoyAppealBannerSupporters',
    abTestVariant: 'control',
    campaignCode: 'UsEoyAppealBanner_control',
};

export const content: BannerContent = {
    heading: 'Show your support for high&#8209;impact reporting',
    messageText:
        'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
    mobileMessageText:
        'With 2021 offering new hope, %%ARTICLE_COUNT%% articles we commit to another year of independent journalism.',
    highlightedText: 'Support us from as little as %%CURRENCY_SYMBOL%%1.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
    },
    secondaryCta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Learn more',
    },
};

export const tickerSettings = {
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
};

export const props: BannerProps = {
    bannerChannel: 'contributions',
    isSupporter: false,
    countryCode: 'GB',
    tracking,
    content,
    tickerSettings,
};
