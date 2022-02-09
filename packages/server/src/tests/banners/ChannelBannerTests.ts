import {
    contributionsBanner,
    contributionsBannerWithSignIn,
    digiSubs,
    environmentMomentBanner,
    guardianWeekly,
    investigationsMomentBanner,
    globalNewYearBanner,
} from '@sdc/shared/config';
import {
    BannerChannel,
    BannerTest,
    BannerTestGenerator,
    BannerVariant,
    OphanComponentType,
    OphanProduct,
    RawTestParams,
    RawVariantParams,
} from '@sdc/shared/types';
import { BannerTemplate } from '@sdc/shared/types';
import { isProd } from '../../lib/env';
import { fetchS3Data } from '../../utils/S3';

const BannerChannelFiles: { [key in BannerChannel]: string } = {
    contributions: 'banner-tests.json',
    subscriptions: 'banner-tests2.json',
};

export const BannerPaths: {
    [key in BannerTemplate]: (version?: string) => string;
} = {
    [BannerTemplate.ContributionsBanner]: contributionsBanner.endpointPathBuilder,
    [BannerTemplate.ContributionsBannerWithSignIn]:
        contributionsBannerWithSignIn.endpointPathBuilder,
    [BannerTemplate.InvestigationsMomentBanner]: investigationsMomentBanner.endpointPathBuilder,
    [BannerTemplate.EnvironmentMomentBanner]: environmentMomentBanner.endpointPathBuilder,
    [BannerTemplate.GlobalNewYearBanner]: globalNewYearBanner.endpointPathBuilder,
    [BannerTemplate.DigitalSubscriptionsBanner]: digiSubs.endpointPathBuilder,
    [BannerTemplate.GuardianWeeklyBanner]: guardianWeekly.endpointPathBuilder,
};

export const BannerTemplateComponentTypes: {
    [key in BannerChannel]: OphanComponentType;
} = {
    contributions: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    subscriptions: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
};

export const BannerTemplateProducts: {
    [key in BannerTemplate]?: OphanProduct[];
} = {
    [BannerTemplate.DigitalSubscriptionsBanner]: ['DIGITAL_SUBSCRIPTION'],
    [BannerTemplate.GuardianWeeklyBanner]: ['PRINT_SUBSCRIPTION'],
};

const BannerVariantFromParams = (forChannel: BannerChannel) => {
    return (variant: RawVariantParams): BannerVariant => {
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
            modulePathBuilder: BannerPaths[variant.template],
            moduleName: variant.template,
            bannerContent: bannerContent(),
            mobileBannerContent: variant.mobileBannerContent,
            componentType: BannerTemplateComponentTypes[forChannel],
            products: BannerTemplateProducts[variant.template],
            separateArticleCount: variant.separateArticleCount,
        };
    };
};

const createTestsGeneratorForChannel = (bannerChannel: BannerChannel): BannerTestGenerator => {
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
                            userCohort: testParams.userCohort,
                            locations: testParams.locations,
                            canRun: (): boolean => testParams.isOn,
                            minPageViews: testParams.minArticlesBeforeShowingBanner,
                            articlesViewedSettings: testParams.articlesViewedSettings,
                            variants: testParams.variants.map(
                                BannerVariantFromParams(bannerChannel),
                            ),
                            controlProportionSettings: testParams.controlProportionSettings,
                        };
                    },
                );
            });
};

export const channel1BannersAllTestsGenerator = createTestsGeneratorForChannel('contributions');
export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel('subscriptions');
