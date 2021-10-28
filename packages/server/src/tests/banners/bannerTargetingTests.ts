import { TargetingTest } from '../../lib/targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

const isFootballMatch = (targeting: BannerTargeting): boolean => {
    if (targeting.section === 'football' && targeting.tags) {
        return !!targeting.tags.find(
            tag => tag === 'tone/minutebyminute' || tag === 'tone/matchreports',
        );
    }
    return false;
};

export const variantCanShow = (targeting: BannerTargeting): boolean => {
    if (targeting.section) {
        return (
            !['fashion', 'tv-and-radio', 'travel'].includes(targeting.section) &&
            !isFootballMatch(targeting)
        );
    }
    return true;
};

export const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: '2021-10-29_BannerTargeting_SectionExclusions',
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
