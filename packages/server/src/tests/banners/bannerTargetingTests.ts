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
        name: '2021-11-26_BannerTargeting_DeploySchedule',
        canInclude: (targeting: BannerTargeting) => targeting.countryCode !== 'US',
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant',
                canShow: () => true,
                deploySchedule: {
                    contributions: [
                        {
                            dayOfWeek: 0,
                            hour: 9,
                        },
                    ],
                    subscriptions: [
                        {
                            dayOfWeek: 5,
                            hour: 8,
                        },
                    ],
                },
            },
        ],
    },
];
