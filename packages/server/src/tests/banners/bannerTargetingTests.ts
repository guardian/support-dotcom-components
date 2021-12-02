import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

type SectionAndTagExclusions = {
    [sectionId: string]: string[];
};

const exclusions: SectionAndTagExclusions = {
    football: ['tone/minutebyminute', 'tone/matchreports'],
    fashion: [],
    'tv-and-radio': [],
    travel: [],
};

// TODO - remove or use this logic. We're still waiting for full results from this test to become available
export const variantCanShow = (targeting: BannerTargeting): boolean => {
    const { sectionId, tagIds } = targeting;

    if (sectionId && !!exclusions[sectionId]) {
        const excludedTagIds = exclusions[sectionId];
        if (!excludedTagIds.length) {
            return false;
        }

        const foundTagId = (tagIds || []).some(tag => excludedTagIds.includes(tag));
        return !foundTagId;
    }
    return true;
};

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2021-12-02_BannerTargeting_SubsOncePerWeek',
        canInclude: (targeting: BannerTargeting) => targeting.countryCode !== 'US',
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant',
                canShow: () => true,
                // Only deploy the subs banner on a Monday
                deploySchedule: {
                    contributions: [
                        {
                            dayOfWeek: 0,
                            hour: 9,
                        },
                    ],
                    subscriptions: [
                        {
                            dayOfWeek: 1,
                            hour: 8,
                        },
                    ],
                },
            },
        ],
    },
];
