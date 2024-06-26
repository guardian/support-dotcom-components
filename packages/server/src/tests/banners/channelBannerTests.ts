import { designableBanner, signInPromptBanner } from '@sdc/shared/config';
import {
    BannerChannel,
    BannerTest,
    BannerTestGenerator,
    BannerVariant,
    BannerTestFromTool,
    BannerVariantFromTool,
    uiIsDesign,
    ConfigurableDesign,
    BannerDesignFromTool,
    bannerTestFromToolSchema,
} from '@sdc/shared/types';
import { BannerTemplate } from '@sdc/shared/types';
import { getTests } from '../store';
import { OphanComponentType } from '@guardian/libs';

export const BannerPaths: {
    [key in BannerTemplate]: (version?: string) => string;
} = {
    [BannerTemplate.SignInPromptBanner]: signInPromptBanner.endpointPathBuilder,
};

export const BannerTemplateComponentTypes: {
    [key in BannerChannel]: OphanComponentType;
} = {
    contributions: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    subscriptions: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    signIn: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    abandonedBasket: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

const modulePathBuilder =
    (variant: BannerVariantFromTool) =>
    (version?: string): string => {
        if (uiIsDesign(variant.template)) {
            return designableBanner.endpointPathBuilder(version);
        } else {
            return BannerPaths[variant.template](version);
        }
    };

export const getDesignForVariant = (
    variant: BannerVariant,
    designs: BannerDesignFromTool[],
): ConfigurableDesign | undefined => {
    const bannerUi = variant.template;

    if (uiIsDesign(bannerUi)) {
        return designs.find((design) => design.name === bannerUi.designName);
    }
};

const buildBannerVariant =
    (forChannel: BannerChannel) =>
    (variant: BannerVariantFromTool): BannerVariant => ({
        ...variant,
        modulePathBuilder: modulePathBuilder(variant),
        componentType: BannerTemplateComponentTypes[forChannel],
    });

const createTestsGeneratorForChannel = (bannerChannel: BannerChannel): BannerTestGenerator => {
    const channel = bannerChannel === 'contributions' ? 'Banner1' : 'Banner2';
    return (): Promise<BannerTest[]> =>
        getTests<BannerTestFromTool>(channel, bannerTestFromToolSchema).then((tests) => {
            return tests.map((testParams: BannerTestFromTool): BannerTest => {
                return {
                    ...testParams,
                    bannerChannel,
                    isHardcoded: false,
                    variants: testParams.variants.map(buildBannerVariant(bannerChannel)),
                };
            });
        });
};

export const channel1BannersAllTestsGenerator = createTestsGeneratorForChannel('contributions');
export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel('subscriptions');
