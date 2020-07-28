import { selectBannerTest } from './bannerSelection';
import { getTests } from './bannerTests';
import { BannerDeployCaches, ReaderRevenueRegion } from './bannerDeployCache';

const getBannerDeployCache = (date: string, region: ReaderRevenueRegion): BannerDeployCaches =>
    ({
        subscriptions: {
            [region]: () => Promise.resolve(new Date(date)),
        },
        contributions: {
            [region]: () => Promise.resolve(new Date(date)),
        },
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
            const cache = getBannerDeployCache(secondDate, 'united-states');

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            const cache = getBannerDeployCache(firstDate, 'united-states');

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns null if there are insufficient page views', () => {
            const cache = getBannerDeployCache(firstDate, 'united-states');

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
            const cache = getBannerDeployCache(firstDate, 'united-states');

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
            const cache = getBannerDeployCache(secondDate, 'australia');

            return selectBannerTest(targeting, tracking, '', getTests, cache).then(result => {
                expect(result && result.test.name).toBe('GuardianWeeklyBanner');
            });
        });

        it('returns null if other contributions banner was dismissed and subs switch is off', () => {
            const cache = getBannerDeployCache(secondDate, 'australia');

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
            const cache = getBannerDeployCache(firstDate, 'australia');

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
            const cache = getBannerDeployCache(firstDate, 'australia');

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
});
