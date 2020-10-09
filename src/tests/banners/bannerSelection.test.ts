import { selectBannerTest } from './bannerSelection';
import { BannerDeployCaches } from './bannerDeployCache';
import { BannerTargeting, BannerTest } from '../../types/BannerTypes';
import { ContributionsBannerPath, DigitalSubscriptionsBannerPath } from './ChannelBannerTests';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';

const getTests = (): Promise<BannerTest[]> =>
    Promise.resolve([DigitalSubscriptionsBanner, GuardianWeeklyBanner]);

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

describe('selectBannerTest', () => {
    const firstDate = 'Mon Jun 06 2020 19:20:10 GMT+0100';
    const secondDate = 'Mon Jul 06 2020 19:20:10 GMT+0100';

    describe('Subs Banner', () => {
        const targeting = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'US',
            engagementBannerLastClosedAt: secondDate,
            switches: {
                remoteSubscriptionsBanner: true,
            },
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        it('returns banner if it has never been dismissed', () => {
            const cache = getBannerDeployCache(secondDate);

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            const cache = getBannerDeployCache(firstDate);

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns null if there are insufficient page views', () => {
            const cache = getBannerDeployCache(firstDate);

            return selectBannerTest(
                Object.assign(targeting, {
                    alreadyVisitedCount: 1,
                }),
                tracking,
                '',
                getTests,
                cache,
            ).then(result => {
                expect(result).toBe(null);
            });
        });

        it('returns null if user is logged in and has a subscription', () => {
            const cache = getBannerDeployCache(firstDate);

            return selectBannerTest(
                Object.assign(targeting, {
                    showSupportMessaging: false,
                }),
                tracking,
                '',
                getTests,
                cache,
            ).then(result => {
                expect(result).toBe(null);
            });
        });
    });

    describe('Weekly Banner', () => {
        const targeting = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'AU',
            engagementBannerLastClosedAt: secondDate,
            switches: {
                remoteSubscriptionsBanner: true,
            },
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };
        it('returns banner if it has never been dismissed', () => {
            const cache = getBannerDeployCache(secondDate);

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('GuardianWeeklyBanner');
            });
        });

        it('returns null if other contributions banner was dismissed and subs switch is off', () => {
            const cache = getBannerDeployCache(secondDate);

            return selectBannerTest(
                Object.assign(targeting, {
                    switches: {
                        remoteSubscriptionsBanner: false,
                    },
                }),
                tracking,
                '',
                getTests,
                cache,
            ).then(result => {
                expect(result && result.test.name).toBe(null);
            });
        });

        it('returns banner if has been redeployed', () => {
            const cache = getBannerDeployCache(firstDate);

            return selectBannerTest(
                Object.assign(targeting, {
                    switches: {
                        remoteSubscriptionsBanner: true,
                    },
                }),
                tracking,
                '',
                getTests,
                cache,
            ).then(result => {
                expect(result && result.test.name).toBe('GuardianWeeklyBanner');
            });
        });

        it('returns null if shouldHideReaderRevenue', () => {
            const cache = getBannerDeployCache(firstDate);

            return selectBannerTest(
                Object.assign(targeting, {
                    shouldHideReaderRevenue: true,
                }),
                tracking,
                '',
                getTests,
                cache,
            ).then(result => {
                expect(result).toBe(null);
            });
        });
    });

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
            switches: {
                remoteSubscriptionsBanner: true,
            },
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            bannerChannel: 'contributions',
            testAudience: 'Everyone',
            canRun: () => true,
            minPageViews: 2,
            variants: [
                {
                    name: 'variant',
                    modulePath: ContributionsBannerPath,
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
                '',
                () => Promise.resolve([test]),
                cache,
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
                '',
                () => Promise.resolve([test]),
                cache,
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
                '',
                () =>
                    Promise.resolve([
                        {
                            ...test,
                            articlesViewedSettings: undefined,
                        },
                    ]),
                cache,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
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
            switches: {
                remoteSubscriptionsBanner: true,
            },
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            bannerChannel: 'subscriptions',
            testAudience: 'Everyone',
            canRun: (): boolean => true,
            minPageViews: 2,
            variants: [
                {
                    name: 'variant',
                    modulePath: DigitalSubscriptionsBannerPath,
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
                '',
                () => Promise.resolve([test]),
                cache,
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
                '',
                () => Promise.resolve([test]),
                cache,
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
                '',
                () =>
                    Promise.resolve([
                        {
                            ...test,
                            articlesViewedSettings: undefined,
                        },
                    ]),
                cache,
                undefined,
                now,
            ).then(result => {
                expect(result && result.test.name).toBe('test');
            });
        });
    });
});
