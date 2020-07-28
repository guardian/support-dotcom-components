import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';
import { cacheAsync } from '../../lib/cache';

const ausMomentBannerTestGenerator: BannerTestGenerator = () =>
    Promise.resolve(AusMomentContributionsBanner);

const digitalSubscriptionsBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve(DigitalSubscriptionsBanner);

const guardianWeeklyBannerGenerator: BannerTestGenerator = () =>
    Promise.resolve(GuardianWeeklyBanner);

const testGenerators: BannerTestGenerator[] = [
    ausMomentBannerTestGenerator,
    defaultBannerTestGenerator,
    digitalSubscriptionsBannerGenerator,
    guardianWeeklyBannerGenerator,
];

const getTests = (): Promise<BannerTest[]> =>
    Promise.all(testGenerators.map(testGenerator => testGenerator()));

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests');

export { getTests, getCachedTests };
