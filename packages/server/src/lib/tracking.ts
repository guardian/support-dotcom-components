import { BannerTest, BannerVariant, EpicTest, EpicVariant } from '@sdc/shared/dist/types';

const campaignPrefix = 'gdnwb_copts_memco';

export const buildEpicCampaignCode = (test: EpicTest, variant: EpicVariant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (testName: string, variantName: string): string =>
    `AMP__${testName}__${variantName}`;
