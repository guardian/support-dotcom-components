import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';
import { cacheAsync } from '../../lib/cache';

const digitalSubscriptionsBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve(DigitalSubscriptionsBanner);

const guardianWeeklyBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve(GuardianWeeklyBanner);

const testGenerators: BannerTestGenerator[] = [
    defaultBannerTestGenerator,
    digitalSubscriptionsBannerGenerator,
    guardianWeeklyBannerGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(testGenerators.map(testGenerator => testGenerator()));

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests');

export { getTests, getCachedTests };
