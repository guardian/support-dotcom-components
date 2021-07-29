import type { BannerTest, BannerTestGenerator } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import {
	channel1BannersAllTestsGenerator,
	channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';

const defaultBannerTestGenerator: BannerTestGenerator = () =>
	Promise.resolve([DefaultContributionsBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
	channel1BannersAllTestsGenerator,
	channel2BannersAllTestsGenerator,
	defaultBannerTestGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
	Promise.all(testGenerators.map((testGenerator) => testGenerator())).then(
		(bannerTests: BannerTest[][]) => flattenArray(bannerTests),
	);

const [, getCachedTests] = cacheAsync<BannerTest[]>(
	getTests,
	60,
	'bannerTests',
	true,
);

export { getTests, getCachedTests };
