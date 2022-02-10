import { bannerTargetingTests } from './bannerTargetingTests';
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

const test = bannerTargetingTests[0];

describe('Banner pageview targeting test', () => {
    it('variant 1 returns false if AC = 0', () => {
        const canShow = test.variants[1].canShow({
            ...targeting,
            articleCountToday: 0,
        });
        expect(canShow).toBe(false);
    });

    it('variant 1 returns true if AC = 1', () => {
        const canShow = test.variants[1].canShow({
            ...targeting,
            articleCountToday: 1,
        });
        expect(canShow).toBe(true);
    });

    it('variant 2 returns false if AC = 1 and contentType = article', () => {
        const canShow = test.variants[2].canShow({
            ...targeting,
            articleCountToday: 1,
            contentType: 'Article',
        });
        expect(canShow).toBe(false);
    });

    it('variant 2 returns true if AC = 1 and contentType = Network Front', () => {
        const canShow = test.variants[2].canShow({
            ...targeting,
            articleCountToday: 1,
            contentType: 'Network Front',
        });
        expect(canShow).toBe(true);
    });

    it('variant 2 returns true if AC = 2 and contentType = Article', () => {
        const canShow = test.variants[2].canShow({
            ...targeting,
            articleCountToday: 2,
            contentType: 'Article',
        });
        expect(canShow).toBe(true);
    });
});
