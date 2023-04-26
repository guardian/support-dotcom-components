import {
    contributionsBanner,
    contributionsBannerWithSignIn,
    charityAppealBanner,
    digiSubs,
    printSubs,
    choiceCardsBannerBlue,
    choiceCardsBannerYellow,
    environmentMomentBanner,
    guardianWeekly,
    investigationsMomentBanner,
    globalNewYearBanner,
    signInPromptBanner,
    ukraineMomentBanner,
    // ausMomentBanner,
} from '@sdc/shared/config';
import {
    BannerChannel,
    BannerTest,
    BannerTestGenerator,
    BannerVariant,
    OphanComponentType,
    OphanProduct,
    BannerTestFromTool,
    BannerVariantFromTool,
} from '@sdc/shared/types';
import { BannerTemplate } from '@sdc/shared/types';
import { getTests } from '../testsStore';

export const BannerPaths: {
    [key in BannerTemplate]: (version?: string) => string;
} = {
    [BannerTemplate.AusMomentBanner]: contributionsBanner.endpointPathBuilder,
    [BannerTemplate.ContributionsBanner]: contributionsBanner.endpointPathBuilder,
    [BannerTemplate.ContributionsBannerWithSignIn]:
        contributionsBannerWithSignIn.endpointPathBuilder,
    [BannerTemplate.CharityAppealBanner]: charityAppealBanner.endpointPathBuilder,
    [BannerTemplate.InvestigationsMomentBanner]: investigationsMomentBanner.endpointPathBuilder,
    [BannerTemplate.EnvironmentMomentBanner]: environmentMomentBanner.endpointPathBuilder,
    [BannerTemplate.GlobalNewYearBanner]: globalNewYearBanner.endpointPathBuilder,
    [BannerTemplate.DigitalSubscriptionsBanner]: digiSubs.endpointPathBuilder,
    [BannerTemplate.PrintSubscriptionsBanner]: printSubs.endpointPathBuilder,
    [BannerTemplate.ChoiceCardsBannerBlue]: choiceCardsBannerBlue.endpointPathBuilder,
    [BannerTemplate.ChoiceCardsBannerYellow]: choiceCardsBannerYellow.endpointPathBuilder,
    [BannerTemplate.GuardianWeeklyBanner]: guardianWeekly.endpointPathBuilder,
    [BannerTemplate.SignInPromptBanner]: signInPromptBanner.endpointPathBuilder,
    [BannerTemplate.UkraineMomentBanner]: ukraineMomentBanner.endpointPathBuilder,
};

export const BannerTemplateComponentTypes: {
    [key in BannerChannel]: OphanComponentType;
} = {
    contributions: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    subscriptions: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    signIn: 'ACQUISITIONS_ENGAGEMENT_BANNER',
};

export const BannerTemplateProducts: {
    [key in BannerTemplate]?: OphanProduct[];
} = {
    [BannerTemplate.DigitalSubscriptionsBanner]: ['DIGITAL_SUBSCRIPTION'],
    [BannerTemplate.GuardianWeeklyBanner]: ['PRINT_SUBSCRIPTION'],
};

const buildBannerVariant = (forChannel: BannerChannel) => (
    variant: BannerVariantFromTool,
): BannerVariant => ({
    ...variant,
    modulePathBuilder: BannerPaths[variant.template],
    componentType: BannerTemplateComponentTypes[forChannel],
    products: BannerTemplateProducts[variant.template],
});

const createTestsGeneratorForChannel = (bannerChannel: BannerChannel): BannerTestGenerator => {
    const channel = bannerChannel === 'contributions' ? 'Banner1' : 'Banner2';
    return (): Promise<BannerTest[]> =>
        getTests<BannerTestFromTool>(channel).then(tests => {
            return tests.map(
                (testParams: BannerTestFromTool): BannerTest => {
                    return {
                        ...testParams,
                        bannerChannel,
                        isHardcoded: false,
                        variants: testParams.variants.map(buildBannerVariant(bannerChannel)),
                    };
                },
            );
        });
};

export const channel1BannersAllTestsGenerator = createTestsGeneratorForChannel('contributions');
export const channel2BannersAllTestsGenerator = createTestsGeneratorForChannel('subscriptions');
