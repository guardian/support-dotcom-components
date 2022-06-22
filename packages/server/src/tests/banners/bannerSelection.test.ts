import { contributionsBanner, digiSubs, signInPromptBanner } from '@sdc/shared/config';
import { BannerTargeting, BannerTest, BannerTemplate } from '@sdc/shared/types';
import { BannerDeployCaches } from './bannerDeployCache';
import { selectBannerTest } from './bannerSelection';

const getBannerDeployCache = (date: string): BannerDeployCaches =>
    ({
        subscriptions: () =>
            Promise.resolve({
                UnitedKingdom: new Date(date),
                UnitedStates: new Date(date),
                Australia: new Date(date),
                RestOfWorld: new Date(date),
                EuropeanUnion: new Date(date),
            }),
        contributions: () =>
            Promise.resolve({
                UnitedKingdom: new Date(date),
                UnitedStates: new Date(date),
                Australia: new Date(date),
                RestOfWorld: new Date(date),
                EuropeanUnion: new Date(date),
            }),
    } as BannerDeployCaches);

const isMobile = false;

describe('selectBannerTest', () => {
    const firstDate = 'Mon Jun 06 2020 19:20:10 GMT+0100';
    const secondDate = 'Mon Jul 06 2020 19:20:10 GMT+0100';

    const enableHardcodedBannerTests = true;

    describe('Contributions banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const cache = getBannerDeployCache(secondDate);

        const targeting: BannerTargeting = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'AU',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            status: 'Live',
            bannerChannel: 'contributions',
            isHardcoded: false,
            userCohort: 'Everyone',
            minPageViews: 2,
            variants: [
                {
                    name: 'variant',
                    modulePathBuilder: contributionsBanner.endpointPathBuilder,
                    moduleName: 'ContributionsBanner',
                    bannerContent: {
                        messageText: 'body',
                        highlightedText: 'highlighted text',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            articlesViewedSettings: {
                minViews: 5,
                periodInWeeks: 52,
            },
        };

        it('returns test if enough article views', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([test]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
            });
        });

        it('returns null if hardcoded tests disabled', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([{ ...test, isHardcoded: true }]),
                cache,
                false,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe(null);
            });
        });

        it('returns null if not enough article views', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([test]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result).toBe(null);
            });
        });

        it('returns test if no articlesViewedSettings', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                isMobile,
                '',
                () =>
                    Promise.resolve([
                        {
                            ...test,
                            articlesViewedSettings: undefined,
                        },
                    ]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
            });
        });

        it('returns null if opted out', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    hasOptedOutOfArticleCount: true,
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([test]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result).toBe(null);
            });
        });
    });

    describe('Channel 2 banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const cache = getBannerDeployCache(secondDate);

        const targeting: BannerTargeting = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'GB',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            status: 'Live',
            bannerChannel: 'subscriptions',
            isHardcoded: false,
            userCohort: 'Everyone',
            minPageViews: 2,
            variants: [
                {
                    name: 'variant',
                    modulePathBuilder: digiSubs.endpointPathBuilder,
                    moduleName: 'DigitalSubscriptionsBanner',
                    bannerContent: {
                        messageText: 'body',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
                },
            ],
            articlesViewedSettings: {
                minViews: 5,
                periodInWeeks: 52,
            },
        };

        it('returns test if enough article views', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([test]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
            });
        });

        it('returns null if not enough article views', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve([test]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result).toBe(null);
            });
        });

        it('returns test if no articlesViewedSettings', () => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                isMobile,
                '',
                () =>
                    Promise.resolve([
                        {
                            ...test,
                            articlesViewedSettings: undefined,
                        },
                    ]),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
            });
        });
    });

    describe('Sign in prompt banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const cache = getBannerDeployCache(secondDate);

        const baseTargeting: BannerTargeting = {
            alreadyVisitedCount: 0,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 1,
            countryCode: 'AU',
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const baseTest: Omit<BannerTest, 'name'> = {
            bannerChannel: 'contributions',
            isHardcoded: true,
            userCohort: 'Everyone',
            status: 'Live',
            minPageViews: 0,
            variants: [
                {
                    name: 'control',
                    modulePathBuilder: signInPromptBanner.endpointPathBuilder,
                    moduleName: BannerTemplate.SignInPromptBanner,
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
        };

        const tests: BannerTest[] = [
            {
                ...baseTest,
                name: 'banner-new-contribution',
                purchaseInfo: { product: ['Contribution'], userType: ['new', 'guest'] },
            },
            {
                ...baseTest,
                name: 'banner-existing-subscriber',
                purchaseInfo: { product: ['DigitalPack'], userType: ['current'] },
            },
        ];

        const runSelection = (targeting: BannerTargeting) => {
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                tracking,
                isMobile,
                '',
                () => Promise.resolve(tests),
                cache,
                enableHardcodedBannerTests,
                undefined,
                now,
            );
        };

        it('It should return a test matching a contribution from a new user', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
            });

            expect(result?.test.name).toEqual('banner-new-contribution');
        });

        it('It should return a test matching a subscription from an existing user', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'DigitalPack', userType: 'current' },
            });

            expect(result?.test.name).toEqual('banner-existing-subscriber');
        });

        it('It should ignore purchase information if user is signed in', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
                isSignedIn: true,
            });

            expect(result).toBeNull();
        });
    });
});
