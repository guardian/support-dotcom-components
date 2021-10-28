import { variantCanShow } from './bannerTargetingTests';
import { BannerTargeting } from '@sdc/shared/types';

const targeting: BannerTargeting = {
    alreadyVisitedCount: 3,
    shouldHideReaderRevenue: false,
    isPaidContent: false,
    showSupportMessaging: true,
    mvtId: 3,
    countryCode: 'GB',
    hasOptedOutOfArticleCount: false,
};

describe('Section exclusions', () => {
    it('returns true if no section', () => {
        const canShow = variantCanShow(targeting);
        expect(canShow).toBe(true);
    });

    it('returns true if politics', () => {
        const canShow = variantCanShow({
            ...targeting,
            section: 'politics',
        });
        expect(canShow).toBe(true);
    });

    it('returns false if fashion', () => {
        const canShow = variantCanShow({
            ...targeting,
            section: 'fashion',
        });
        expect(canShow).toBe(false);
    });

    it('returns false if football match report', () => {
        const canShow = variantCanShow({
            ...targeting,
            section: 'football',
            tags: ['tone/matchreports'],
        });
        expect(canShow).toBe(false);
    });

    it('returns true if football but not match report', () => {
        const canShow = variantCanShow({
            ...targeting,
            section: 'football',
            tags: ['tone/features'],
        });
        expect(canShow).toBe(true);
    });
});
