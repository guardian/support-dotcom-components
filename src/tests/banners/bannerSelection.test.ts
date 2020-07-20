import { selectBannerTest, _ } from './bannerSelection';
import { cacheAsync as _cacheAsync } from '../../lib/cache';

const cacheAsync = _cacheAsync;

jest.mock('../../lib/cache', () => ({
    cacheAsync: jest.fn(),
}));

describe('selectBannerTest', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const firstDate = 'Mon Jun 06 2020 19:20:10 GMT+0100';
    const secondDate = 'Mon Jul 06 2020 19:20:10 GMT+0100';

    describe('Australia Moment', () => {
        const targeting = {
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

        it('returns banner if it has never been dismissed', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('contributions', 'australia');

            return selectBannerTest(
                Object.assign(targeting, {
                    engagementBannerLastClosedAt: undefined,
                }),
                tracking,
                '',
            ).then(result => {
                expect(result && result.test.name).toBe('AusMomentThankYouBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('contributions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('AusMomentThankYouBanner');
            });
        });

        it('returns null if article is paid content', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('contributions', 'australia');

            return selectBannerTest(
                Object.assign(targeting, {
                    isPaidContent: true,
                }),
                tracking,
                '',
            ).then(result => {
                expect(result).toBe(null);
            });
        });
    });

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
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('DigitalSubscriptionsBanner');
            });
        });

        it('returns null if there are insufficient page views', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(
                Object.assign(targeting, {
                    alreadyVisitedCount: 1,
                }),
                tracking,
                '',
            ).then(result => {
                expect(result).toBe(null);
            });
        });

        it('returns null if user is logged in and has a subscription', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(
                Object.assign(targeting, {
                    showSupportMessaging: false,
                }),
                tracking,
                '',
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
            ophanComponentId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };
        it('returns banner if it has never been dismissed', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('GuardianWeeklyBanner');
            });
        });

        it('returns null if other contributions banner was dismissed and subs switch is off', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(
                Object.assign(targeting, {
                    switches: {
                        remoteSubscriptionsBanner: false,
                    },
                }),
                tracking,
                '',
            ).then(result => {
                expect(result && result.test.name).toBe(null);
            });
        });

        it('returns banner if has been redeployed', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(
                Object.assign(targeting, {
                    switches: {
                        remoteSubscriptionsBanner: true,
                    },
                }),
                tracking,
                '',
            ).then(result => {
                expect(result && result.test.name).toBe('GuardianWeeklyBanner');
            });
        });

        it('returns null if shouldHideReaderRevenue', () => {
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(
                Object.assign(targeting, {
                    shouldHideReaderRevenue: true,
                }),
                tracking,
                '',
            ).then(result => {
                expect(result).toBe(null);
            });
        });
    });
});
