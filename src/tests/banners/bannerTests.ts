import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { GlobalEoyACBanner, GlobalEoyNoACBanner } from './GlobalEoyBannerTest';
import { cacheAsync } from '../../lib/cache';

const defaultBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([DefaultContributionsBanner]);

const globalEoyTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([GlobalEoyACBanner, GlobalEoyNoACBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
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
