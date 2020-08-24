import fetch from 'node-fetch';
import {
    BannerTestGenerator,
    BannerTest,
    BannerTargeting,
    BannerPageTracking,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
    // BannerContent,
} from '../../types/BannerTypes';

export const ContributionsBannerPath = 'contributions-banner.js';

const ContributionsBannerContentUrl =
    'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/CODE/banner-tests.json';

const ContributionsBannerTest = (testParams: RawTestParams): BannerTest => {
    return {
        name: testParams.name,
        bannerType: 'contributions',
        testAudience: testParams.userCohort,
        canRun: (targeting: BannerTargeting, pageTracking: BannerPageTracking): boolean =>
            testParams.isOn && pageTracking.clientName === 'dcr', // Do not serve to frontend for now
        minPageViews: testParams.minArticlesBeforeShowingBanner,
        variants: testParams.variants.map(
            (variant: RawVariantParams): BannerVariant => {
                return {
                    name: variant.name,
                    modulePath: ContributionsBannerPath,
                    moduleName: 'ContributionsBanner',
                    bannerContent: {
                        messageText: variant.body,
                        highlightedText: variant.highlightedText,
                        cta: variant.cta,
                        secondaryCta: variant.secondaryCta,
                    },
                };
            },
        ),
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    };
};

// const bannerTests = (bannerContent: BannerContent): BannerTest => {
//     return ContributionsBannerTest(bannerContent);
// };

export const contributionsBannerAllTestsGenerator: BannerTestGenerator = () =>
    fetch(ContributionsBannerContentUrl)
        .then(response => response.json())
        .then(json => json['tests'])
        .then(tests => {
            return tests.map((test: RawTestParams): BannerTest => ContributionsBannerTest(test));
        });
