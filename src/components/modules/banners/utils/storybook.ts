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
    messageText:
        '<strong> We chose a different approach. Will you support it?</strong> Unlike many news organisations, we made a choice to keep our journalism open for all. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart. Every contribution, however big or small, is so valuable – it is essential in protecting our editorial independence.',
    highlightedText: ' Support the Guardian today from as little as %%CURRENCY_SYMBOL%%1.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
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
