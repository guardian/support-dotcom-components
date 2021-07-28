import {
    BannerChannel,
    BannerTemplate,
    BannerTestGenerator,
    BannerTest,
    RawTestParams,
    RawVariantParams,
    BannerVariant,
} from '@sdc/shared/types';
import { OphanComponentType, OphanProduct } from '@sdc/shared/types';
import { isProd } from '../../lib/env';
import { contributionsBanner, digiSubs, guardianWeekly, ausMomentBanner } from '@sdc/shared/config';
import { fetchS3Data } from '../../utils/S3';
import { TickerCountType, TickerEndType } from '@sdc/shared/types';

const BannerChannelFiles: { [key in BannerChannel]: string } = {
    contributions: 'banner-tests.json',
    subscriptions: 'banner-tests2.json',
};

export const BannerPaths: { [key in BannerTemplate]: (version?: string) => string } = {
    [BannerTemplate.ContributionsBanner]: contributionsBanner.endpointPathBuilder,
    [BannerTemplate.DigitalSubscriptionsBanner]: digiSubs.endpointPathBuilder,
    [BannerTemplate.GuardianWeeklyBanner]: guardianWeekly.endpointPathBuilder,
    [BannerTemplate.AusMomentBanner]: ausMomentBanner.endpointPathBuilder,
};

export const BannerTemplateComponentTypes: { [key in BannerTemplate]: OphanComponentType } = {
    [BannerTemplate.ContributionsBanner]: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    [BannerTemplate.DigitalSubscriptionsBanner]: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    [BannerTemplate.GuardianWeeklyBanner]: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    [BannerTemplate.AusMomentBanner]: 'ACQUISITIONS_ENGAGEMENT_BANNER',
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

    const tickerSettings =
        variant.template === BannerTemplate.AusMomentBanner
            ? {
                  countType: TickerCountType.people,
                  endType: TickerEndType.unlimited,
                  currencySymbol: '$',
                  copy: {
                      countLabel: 'supporters in Australia',
                      goalReachedPrimary: "We've hit our goal!",
                      goalReachedSecondary: 'but you can still support us',
                  },
              }
            : undefined;

    return {
        name: variant.name,
        modulePathBuilder: BannerPaths[variant.template],
        moduleName: variant.template,
        bannerContent: bannerContent(),
        mobileBannerContent: variant.mobileBannerContent,
        componentType: BannerTemplateComponentTypes[variant.template],
        products: BannerTemplateProducts[variant.template],
        tickerSettings,
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
                            variants: testParams.variants.map(BannerVariantFromParams),
                            controlProportionSettings: testParams.controlProportionSettings,
                        };
                    },
                );
            });
};

export const channel1BannersAllTestsGenerator = createTestsGeneratorForChannel('contributions');
export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel('subscriptions');
