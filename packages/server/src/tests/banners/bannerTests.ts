import { BannerTest, BannerTestGenerator } from '@sdc/shared/types';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './channelBannerTests';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import { signInPromptTests } from './signInPromptTests';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

const defaultBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([DefaultContributionsBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
    defaultBannerTestGenerator,
    signInPromptTests,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(testGenerators.map((testGenerator) => testGenerator())).then(
        (bannerTests: BannerTest[][]) => flattenArray(bannerTests),
    );

const buildBannerTestsReloader = (): Promise<ValueReloader<BannerTest[]>> =>
    buildReloader(getTests, 60);

export { buildBannerTestsReloader };
