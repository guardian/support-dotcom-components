import {
    BannerPageTracking,
    BannerTargeting,
    BannerTest,
    BannerVariant,
} from '../../types/BannerTypes';
import {
    contributionsBanner,
    contributionsBannerVariantA,
    contributionsBannerVariantB,
} from '../../modules';

const nonBreakingHyphen = '&#8209;';

const heading = `Show your support for high${nonBreakingHyphen}impact reporting`;
const mobileMessageText =
    'With 2021 offering new hope, we commit to another year of independent journalism.';
const highlightedText = 'Support us from as little as %%CURRENCY_SYMBOL%%1.';
const cta = {
    baseUrl: 'https://support.theguardian.com',
    text: 'Support the Guardian',
};
const messageTextAC =
    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. You’ve read %%ARTICLE_COUNT%% articles in the last year. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.';
const messageTextNoAC =
    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.';

const buildVariant = (
    name: string,
    messageText: string,
    modulePath: string,
    moduleName: string,
): BannerVariant => ({
    name,
    modulePath,
    moduleName,
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    bannerContent: {
        heading,
        messageText,
        mobileMessageText,
        highlightedText,
        cta,
    },
});

export const ContributionsBannerDesignTestAC: BannerTest = {
    name: 'ContributionsBannerDesignTestAC',
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
        buildVariant(
            'control',
            messageTextAC,
            contributionsBanner.endpointPath,
            'ContributionsBanner',
        ),
        buildVariant(
            'variantA',
            messageTextAC,
            contributionsBannerVariantA.endpointPath,
            'ContributionsBannerVariantA',
        ),
        buildVariant(
            'variantB',
            messageTextAC,
            contributionsBannerVariantB.endpointPath,
            'ContributionsBannerVariantB',
        ),
    ],
};

export const ContributionsBannerDesignTestNoAC: BannerTest = {
    name: 'ContributionsBannerDesignTestNoAC',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        buildVariant(
            'control',
            messageTextNoAC,
            contributionsBanner.endpointPath,
            'ContributionsBanner',
        ),
        buildVariant(
            'variantA',
            messageTextNoAC,
            contributionsBannerVariantA.endpointPath,
            'ContributionsBannerVariantA',
        ),
        buildVariant(
            'variantB',
            messageTextNoAC,
            contributionsBannerVariantB.endpointPath,
            'ContributionsBannerVariantB',
        ),
    ],
};
