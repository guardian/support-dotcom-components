import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import {
    UsEoyAppealNonSupportersBanner,
    UsEoyAppealSupportersBanner,
} from './UsEoyAppealBannerTest';
import {
    GlobalEoyNonSupportersACBanner,
    GlobalEoyNonSupportersNoACBanner,
} from './GlobalEoyBannerTest';
import { cacheAsync } from '../../lib/cache';

const defaultBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([DefaultContributionsBanner]);

const usEoyAppealTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([UsEoyAppealSupportersBanner, UsEoyAppealNonSupportersBanner]);

const globalEoyTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([GlobalEoyNonSupportersACBanner, GlobalEoyNonSupportersNoACBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    usEoyAppealTestGenerator,
    globalEoyTestGenerator,
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
    defaultBannerTestGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(
        testGenerators.map(testGenerator => testGenerator()),
    ).then((bannerTests: BannerTest[][]) => flattenArray(bannerTests));

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests', true);

export { getTests, getCachedTests };
