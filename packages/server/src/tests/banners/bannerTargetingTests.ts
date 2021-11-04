import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

const isFootballMatch = (targeting: BannerTargeting): boolean => {
    if (targeting.sectionId === 'football' && targeting.tagIds) {
        return !!targeting.tagIds.find(
            tag => tag === 'tone/minutebyminute' || tag === 'tone/matchreports',
        );
    }
    return false;
};

export const variantCanShow = (targeting: BannerTargeting): boolean => {
    if (targeting.sectionId) {
        return (
            !['fashion', 'tv-and-radio', 'travel'].includes(targeting.sectionId) &&
            !isFootballMatch(targeting)
        );
    }
    return true;
};

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2021-11-04_BannerTargeting_SectionExclusions',
        canInclude: () => true,
        variants: [
            {
                name: 'control',
                canShow: () => true,
            },
            {
                name: 'variant',
                canShow: variantCanShow,
            },
        ],
    },
];
