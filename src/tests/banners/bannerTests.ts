import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import {
    EnvironmentMomentBannerSupporters,
    EnvironmentMomentBannerNonSupporters,
} from './EnvironmentMomentBannerTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';
import {
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
} from './ChannelBannerTests';
import { cacheAsync } from '../../lib/cache';

const environmentMomentBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([EnvironmentMomentBannerNonSupporters, EnvironmentMomentBannerSupporters]);

const digitalSubscriptionsBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([DigitalSubscriptionsBanner]);

const guardianWeeklyBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([GuardianWeeklyBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    // environmentMomentBannerGenerator,
    channel1BannersAllTestsGenerator,
    channel2BannersAllTestsGenerator,
    defaultBannerTestGenerator,
    digitalSubscriptionsBannerGenerator,
    guardianWeeklyBannerGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(
        testGenerators.map(testGenerator => testGenerator()),
    ).then((bannerTests: BannerTest[][]) => flattenArray(bannerTests));

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests', true);

export { getTests, getCachedTests };
