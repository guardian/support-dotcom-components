import { selectTargetingTest, TargetingTest } from './targetingTesting';
import { BannerTargeting } from '@sdc/shared/types';

const bannerTargetingTests: TargetingTest<BannerTargeting>[] = [
    {
        name: 'BannerTargetingTest',
        status: 'Live',
        canInclude: (targeting: BannerTargeting) => targeting.countryCode === 'GB',
        variants: [
            {
                name: 'Control',
                canShow: () => true,
            },
            {
                name: 'Variant',
                canShow: (targeting: BannerTargeting) => targeting.alreadyVisitedCount >= 5,
            },
        ],
    },
];

const targeting: BannerTargeting = {
    alreadyVisitedCount: 2,
    shouldHideReaderRevenue: false,
    isPaidContent: false,
    showSupportMessaging: true,
    mvtId: 1,
    countryCode: 'GB',
    weeklyArticleHistory: [],
    hasOptedOutOfArticleCount: false,
    contentType: 'Article',
};

describe('selectTargetingTest', () => {
    it('should exclude user from a targeting test', () => {
        const decision = selectTargetingTest(
            1,
            { ...targeting, countryCode: 'US' },
            bannerTargetingTests,
        );
        expect(decision).toBe(null);
    });

    it('should include user in a targeting test and return Control', () => {
        const decision = selectTargetingTest(2, targeting, bannerTargetingTests);
        expect(decision).toEqual({
            canShow: true,
            test: {
                testName: 'BannerTargetingTest',
                variantName: 'Control',
            },
        });
    });

    it('should include user in a targeting test and return Variant, with canShow of false', () => {
        const decision = selectTargetingTest(1, targeting, bannerTargetingTests);
        expect(decision).toEqual({
            canShow: false,
            test: {
                testName: 'BannerTargetingTest',
                variantName: 'Variant',
            },
        });
    });

    it('should include user in a targeting test and return Variant, with canShow of true', () => {
        const decision = selectTargetingTest(
            1,
            { ...targeting, alreadyVisitedCount: 5 },
            bannerTargetingTests,
        );
        expect(decision).toEqual({
            canShow: true,
            test: {
                testName: 'BannerTargetingTest',
                variantName: 'Variant',
            },
        });
    });
});
