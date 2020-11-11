// TODO: remove this test
import { BannerPageTracking, BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { TickerCountType, TickerEndType } from '../../lib/variants';

export const ExamplePath = 'example-banner.js';
export const ExampleWithVisualPath = 'example-with-visual-banner.js';

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: "We've met our goal - thank you",
        goalReachedSecondary: 'Contributions are still being accepted',
    },
    tickerData: {
        total: 120_000,
        goal: 150_000,
    },
};

export const ExampleContributionsTemplateBanner: BannerTest = {
    name: 'Templates',
    bannerChannel: 'contributions',
    testAudience: 'AllNonSupporters',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRun: (_targeting: BannerTargeting, _pageTracking: BannerPageTracking) => true,
    minPageViews: 2,
    variants: [
        {
            name: 'without-visual',
            modulePath: ExamplePath,
            moduleName: 'Example',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings: tickerSettings,
        },
        {
            name: 'with-visual',
            modulePath: ExampleWithVisualPath,
            moduleName: 'Example',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        },
        {
            name: 'with-visual-with-ticker',
            modulePath: ExampleWithVisualPath,
            moduleName: 'ExampleWithTicker',
            componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            tickerSettings: tickerSettings,
        },
    ],
};
