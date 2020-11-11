import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import { ExampleContributionsTemplateBanner } from './ExampleContributionsTemplateBannerTest';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { cacheAsync } from '../../lib/cache';

// TODO: Remove example test
const exampleContributionsTemplateTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([ExampleContributionsTemplateBanner]);

const defaultBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([DefaultContributionsBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    exampleContributionsTemplateTestGenerator,
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
