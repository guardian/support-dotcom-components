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
