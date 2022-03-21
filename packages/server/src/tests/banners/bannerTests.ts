import { BannerTest, BannerTestGenerator } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import { propensityModelBannerTest } from './propensityModelTest/propensityModelTest';

const defaultBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([DefaultContributionsBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    channel1BannersAllTestsGenerator,
    propensityModelBannerTest, // hardcoded test
    channel2BannersAllTestsGenerator,
    defaultBannerTestGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(
        testGenerators.map(testGenerator => testGenerator()),
    ).then((bannerTests: BannerTest[][]) => flattenArray(bannerTests));

const getCachedTests = cacheAsync<BannerTest[]>(getTests, { ttlSec: 60, warm: true });

export { getTests, getCachedTests };
