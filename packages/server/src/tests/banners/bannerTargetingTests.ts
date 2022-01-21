import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';
import { inCountryGroups } from '@sdc/shared/dist/lib';
import { isGuardianWeeklyHighPropensity } from './guardianWeeklyPropensityData';

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2022-01-21_GuardianWeeklyPropensityTestR1',
        canInclude: (targeting: BannerTargeting) =>
            inCountryGroups(targeting.countryCode, ['EURCountries']),
        variants: [
            {
                name: 'control',
                // All browsers see the banner
                canShow: () => true,
            },
            {
                name: 'variant',
                // Only high-propensity browserIds see the banner. This also excludes browsers who have not consented
                canShow: (targeting: BannerTargeting) =>
                    !!targeting.browserId && isGuardianWeeklyHighPropensity(targeting.browserId),
            },
        ],
    },
    {
        name: '2021-12-22_BannerTargeting_SubsOncePerWeek',
        canInclude: () => true,
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant',
                canShow: () => true,
                // Subs Saturday, Contribs Monday
                deploySchedule: {
                    contributions: [
                        {
                            dayOfWeek: 1,
                            hour: 9,
                        },
                    ],
                    subscriptions: [
                        {
                            dayOfWeek: 6,
                            hour: 8,
                        },
                    ],
                },
            },
        ],
    },
];
