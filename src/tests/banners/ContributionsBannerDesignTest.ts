import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { contributionsBannerVariantA } from '../../modules';

const nonBreakingHyphen = '&#8209;';

export const ContributionsBannerDesignTest: BannerTest = {
    name: 'ContributionsBannerDesignTest',
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
            modulePath: contributionsBannerVariantA.endpointPath,
            moduleName: 'ContributionsBannerVariantA',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            bannerContent: {
                heading: `Show your support for high${nonBreakingHyphen}impact reporting`,
                messageText:
                    'In the extraordinary year that was 2020, our independent journalism was powered by more than a million supporters. Thanks to you, we provided vital news and analysis for everyone, led by science and truth. As 2021 unfolds, offering new hope, we commit to another year of high-impact reporting.',
                mobileMessageText:
                    'With 2021 offering new hope, we commit to another year of independent journalism.',
                highlightedText: 'Support us from as little as %%CURRENCY_SYMBOL%%1.',
                cta: {
                    baseUrl: 'https://support.theguardian.com',
                    text: 'Support the Guardian',
                },
            },
        },
    ],
};
