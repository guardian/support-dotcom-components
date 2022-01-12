import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
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
