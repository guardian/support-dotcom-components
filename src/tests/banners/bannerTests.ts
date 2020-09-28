import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import { EnvironmentMomentBanner } from './EnvironmentMomentBannerTest';
import { EnvironmentMomentBannerABTest } from './EnvironmentMomentBannerABTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';
import { contributionsBannerAllTestsGenerator } from './ContributionsBannerTests';
import { cacheAsync } from '../../lib/cache';

const environmentMomentBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([EnvironmentMomentBanner]);

const environmentMomentBannerABTestGenerator: BannerTestGenerator = () =>
    Promise.resolve([EnvironmentMomentBannerABTest]);

const digitalSubscriptionsBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([DigitalSubscriptionsBanner]);

const guardianWeeklyBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve([GuardianWeeklyBanner]);

const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

const testGenerators: BannerTestGenerator[] = [
    environmentMomentBannerABTestGenerator,
    environmentMomentBannerGenerator,
    contributionsBannerAllTestsGenerator,
    defaultBannerTestGenerator,
    digitalSubscriptionsBannerGenerator,
    guardianWeeklyBannerGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(
        testGenerators.map(testGenerator => testGenerator()),
    ).then((bannerTests: BannerTest[][]) => flattenArray(bannerTests));

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests');

export { getTests, getCachedTests };
