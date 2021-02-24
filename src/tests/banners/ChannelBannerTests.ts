import {
    BannerChannel,
    BannerTemplate,
    BannerTestGenerator,
    BannerTest,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
} from '../../types/BannerTypes';
import { OphanComponentType, OphanProduct } from '../../types/OphanTypes';
import { isProd } from '../../lib/env';
import { contributionsBanner, digiSubs, guardianWeekly } from '../../modules';
import { fetchS3Data } from '../../utils/S3';

const BannerChannelFiles: { [key in BannerChannel]: string } = {
    contributions: 'banner-tests.json',
    subscriptions: 'banner-tests2.json',
};

export const BannerPaths: { [key in BannerTemplate]: string } = {
    [BannerTemplate.ContributionsBanner]: contributionsBanner.endpointPath,
    [BannerTemplate.DigitalSubscriptionsBanner]: digiSubs.endpointPath,
    [BannerTemplate.GuardianWeeklyBanner]: guardianWeekly.endpointPath,
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
    const bannerContent = () => {
        if (variant.bannerContent) {
            return variant.bannerContent;
        } else {
            // legacy model
            return {
                messageText: variant.body,
                heading: variant.heading,
                highlightedText: variant.highlightedText,
                cta: variant.cta,
                secondaryCta: variant.secondaryCta,
            };
        }
    };

    return {
        name: variant.name,
        modulePath: BannerPaths[variant.template],
        moduleName: variant.template,
        bannerContent: bannerContent(),
        mobileBannerContent: variant.mobileBannerContent,
        componentType: BannerTemplateComponentTypes[variant.template],
        products: BannerTemplateProducts[variant.template],
    };
};

export const createTestsGeneratorForChannel = (
    bannerChannel: BannerChannel,
): BannerTestGenerator => {
    const channelFile = BannerChannelFiles[bannerChannel];
    const key = `banner/${isProd ? 'PROD' : 'CODE'}/${channelFile}`;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () =>
        fetchS3Data('gu-contributions-public', key)
            .then(JSON.parse)
            .then(json => json['tests'])
            .then(tests => {
                return tests.map(
                    (testParams: RawTestParams): BannerTest => {
                        return {
                            name: testParams.name,
                            bannerChannel,
                            testAudience: testParams.userCohort,
                            locations: testParams.locations,
                            canRun: (): boolean => testParams.isOn,
                            minPageViews: testParams.minArticlesBeforeShowingBanner,
                            articlesViewedSettings: testParams.articlesViewedSettings,
                            variants: testParams.variants.map(BannerVariantFromParams),
                        };
                    },
                );
            });
};

export const channel1BannersAllTestsGenerator = createTestsGeneratorForChannel('contributions');
export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel('subscriptions');
