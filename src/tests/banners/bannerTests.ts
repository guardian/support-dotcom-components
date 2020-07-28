import { BannerTest, BannerTestGenerator } from '../../types/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import { defaultBannerTestGenerator } from './DefaultContributionsBannerTest';

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

export const getTests = (): Promise<BannerTest[]> =>
    Promise.all(testGenerators.map(testGenerator => testGenerator()));
