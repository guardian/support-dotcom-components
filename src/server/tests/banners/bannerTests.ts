import type { BannerTest, BannerTestGenerator } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { abandonedBasketTests } from './abandonedBasketTests';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './channelBannerTests';
import { signInPromptTests } from './signInPromptTests';

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    abandonedBasketTests,
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
    signInPromptTests,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(testGenerators.map((testGenerator) => testGenerator())).then(
        (bannerTests: BannerTest[][]) => flattenArray(bannerTests),
    );

const buildBannerTestsReloader = (): Promise<ValueReloader<BannerTest[]>> =>
    buildReloader(getTests, 60);

export { buildBannerTestsReloader };
