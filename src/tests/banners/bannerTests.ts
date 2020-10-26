import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import {
    EnvironmentMomentBannerSupporters,
    EnvironmentMomentBannerNonSupporters,
} from './EnvironmentMomentBannerTest';
import { EnvironmentMomentBannerABNonSupporters } from './EnvironmentMomentBannerABNonSupportersTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { cacheAsync } from '../../lib/cache';

const environmentMomentBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([
        EnvironmentMomentBannerABNonSupporters,
        EnvironmentMomentBannerNonSupporters,
        EnvironmentMomentBannerSupporters,
    ]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    environmentMomentBannerGenerator,
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
