import fetch from 'node-fetch';
import {
    BannerTestGenerator,
    BannerTest,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
} from '../../types/BannerTypes';
import { isProd } from '../../lib/env';

export const ContributionsBannerPath = 'contributions-banner.js';

const ContributionsBannerContentUrl = isProd
    ? 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/PROD/banner-tests.json'
    : 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/CODE/banner-tests.json';

const ContributionsBannerTest = (testParams: RawTestParams): BannerTest => {
    return {
        name: testParams.name,
        bannerType: 'contributions',
        testAudience: testParams.userCohort,
        locations: testParams.locations,
        canRun: (): boolean => testParams.isOn,
        minPageViews: testParams.minArticlesBeforeShowingBanner,
        variants: testParams.variants.map(
            (variant: RawVariantParams): BannerVariant => ({
                name: variant.name,
                modulePath: ContributionsBannerPath,
                moduleName: 'ContributionsBanner',
                bannerContent: {
                    messageText: variant.body,
                    heading: variant.heading,
                    highlightedText: variant.highlightedText,
                    cta: variant.cta,
                    secondaryCta: variant.secondaryCta,
                },
            }),
        ),
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        articlesViewedSettings: testParams.articlesViewedSettings,
    };
};

export const contributionsBannerAllTestsGenerator: BannerTestGenerator = () =>
    fetch(ContributionsBannerContentUrl)
        .then(response => response.json())
        .then(json => json['tests'])
        .then(tests => {
            return tests.map((test: RawTestParams): BannerTest => ContributionsBannerTest(test));
        });
