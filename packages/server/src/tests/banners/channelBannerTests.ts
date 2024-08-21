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
import { getTests } from '../store';
import { OphanComponentType } from '@guardian/libs';

export const BannerTemplateComponentTypes: {
    [key in BannerChannel]: OphanComponentType;
} = {
    contributions: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    subscriptions: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    signIn: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    abandonedBasket: 'ACQUISITIONS_ENGAGEMENT_BANNER',
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
