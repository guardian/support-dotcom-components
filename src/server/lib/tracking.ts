import type {
    BannerTest,
    BannerVariant,
    EpicTest,
    EpicVariant,
    GutterTest,
    GutterVariant,
} from '../../shared/types';

const campaignPrefix = 'gdnwb_copts_memco';

export const buildEpicCampaignCode = (test: EpicTest, variant: EpicVariant): string =>
    `${campaignPrefix}_${test.campaignId || test.name}_${variant.name}`;

export const buildBannerCampaignCode = (test: BannerTest, variant: BannerVariant): string =>
    `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (testName: string, variantName: string): string =>
    `AMP__${testName}__${variantName}`;

export const buildGutterCampaignCode = (testName: GutterTest, variantName: GutterVariant): string =>
    `gutter__${testName.name}__${variantName.name}`;

export const addQueryParams = (baseUrl: string, queryParams: string) => {
    const alreadyHasQueryString = baseUrl.includes('?');
    return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryParams}`;
};
