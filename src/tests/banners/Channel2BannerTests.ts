import fetch from 'node-fetch';
import {
    BannerTemplate,
    BannerTestGenerator,
    BannerTest,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
} from '../../types/BannerTypes';
import { ContributionsBannerPath } from './ContributionsBannerTests';
import { isProd } from '../../lib/env';

export const DigitalSubscriptionsBannerPath = 'digital-subscriptions-banner.js';
export const GuardianWeeklyBannerPath = 'guardian-weekly-banner.js';

export const BannerPaths: { [key in BannerTemplate]: string } = {
    [BannerTemplate.ContributionsBanner]: ContributionsBannerPath,
    [BannerTemplate.DigitalSubscriptionsBanner]: DigitalSubscriptionsBannerPath,
    [BannerTemplate.GuardianWeeklyBanner]: GuardianWeeklyBannerPath,
};

const Channel2BannerContentUrl = isProd
    ? 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/PROD/banner-tests2.json'
    : 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/CODE/banner-tests2.json';

const Channel2BannerVariant = (variant: RawVariantParams): BannerVariant => {
    return {
        name: variant.name,
        modulePath: BannerPaths[variant.template],
        moduleName: variant.template,
        bannerContent: {
            messageText: variant.body,
            heading: variant.heading,
            cta: variant.cta,
            secondaryCta: variant.secondaryCta,
        },
    };
};

const Channel2BannerTest = (testParams: RawTestParams): BannerTest => {
    return {
        name: testParams.name,
        bannerType: 'subscriptions',
        testAudience: testParams.userCohort,
        locations: testParams.locations,
        canRun: (): boolean => testParams.isOn,
        minPageViews: testParams.minArticlesBeforeShowingBanner,
        variants: testParams.variants.map(Channel2BannerVariant),
        componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
        articlesViewedSettings: testParams.articlesViewedSettings,
    };
};

export const channel2BannersAllTestsGenerator: BannerTestGenerator = () =>
    fetch(Channel2BannerContentUrl)
        .then(response => response.json())
        .then(json => json['tests'])
        .then(tests => {
            return tests.map((test: RawTestParams): BannerTest => Channel2BannerTest(test));
        });
