import fetch from 'node-fetch';
import {
    BannerTemplate,
    BannerTestGenerator,
    BannerTest,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
} from '../../types/BannerTypes';
import { OphanComponentType, OphanProduct } from '../../types/OphanTypes';
import { ContributionsBannerPath } from './ContributionsBannerTests';
import { isProd } from '../../lib/env';

export const DigitalSubscriptionsBannerPath = 'digital-subscriptions-banner.js';
export const GuardianWeeklyBannerPath = 'guardian-weekly-banner.js';

const BannerContentBaseUrl = isProd
    ? 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/PROD/'
    : 'https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner/CODE/';

type BannerChannelFile = 'banner-tests.json' | 'banner-tests2.json';

export const BannerPaths: { [key in BannerTemplate]: string } = {
    [BannerTemplate.ContributionsBanner]: ContributionsBannerPath,
    [BannerTemplate.DigitalSubscriptionsBanner]: DigitalSubscriptionsBannerPath,
    [BannerTemplate.GuardianWeeklyBanner]: GuardianWeeklyBannerPath,
};

export const BannerTemplateComponentTypes: { [key in BannerTemplate]: OphanComponentType } = {
    [BannerTemplate.ContributionsBanner]: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    [BannerTemplate.DigitalSubscriptionsBanner]: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    [BannerTemplate.GuardianWeeklyBanner]: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
};

export const BannerTemplateProducts: { [key in BannerTemplate]?: OphanProduct[] } = {
    [BannerTemplate.DigitalSubscriptionsBanner]: ['DIGITAL_SUBSCRIPTION'],
    [BannerTemplate.GuardianWeeklyBanner]: ['PRINT_SUBSCRIPTION'],
};

const BannerVariantFromParams = (variant: RawVariantParams): BannerVariant => {
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
        componentType: BannerTemplateComponentTypes[variant.template],
        products: BannerTemplateProducts[variant.template],
    };
};

const BannerTestFromParams = (testParams: RawTestParams): BannerTest => {
    return {
        name: testParams.name,
        bannerType: 'subscriptions',
        testAudience: testParams.userCohort,
        locations: testParams.locations,
        canRun: (): boolean => testParams.isOn,
        minPageViews: testParams.minArticlesBeforeShowingBanner,
        articlesViewedSettings: testParams.articlesViewedSettings,
        variants: testParams.variants.map(BannerVariantFromParams),
    };
};

const createTestsGeneratorForChannel = (channel: BannerChannelFile): BannerTestGenerator => {
    const bannerContentUrl = `${BannerContentBaseUrl}${channel}`;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () =>
        fetch(bannerContentUrl)
            .then(response => response.json())
            .then(json => json['tests'])
            .then(tests => {
                return tests.map(BannerTestFromParams);
            });
};

export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel(
    'banner-tests2.json',
);
