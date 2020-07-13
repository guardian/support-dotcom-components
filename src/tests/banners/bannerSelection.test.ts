import { selectBannerTest, _ } from './bannerSelection';
import { BannerTargeting, BannerPageTracking } from '../../components/BannerTypes';
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
        let targeting: BannerTargeting;
        let tracking: BannerPageTracking;

        beforeEach(() => {
            targeting = {
                alreadyVisitedCount: 3,
                shouldHideReaderRevenue: false,
                isPaidContent: false,
                showSupportMessaging: true,
                mvtId: 3,
                countryCode: 'AU',
                engagementBannerLastClosedAt: firstDate,
            };
            tracking = {
                ophanPageId: '',
                ophanComponentId: '',
                platformId: '',
                referrerUrl: '',
                clientName: '',
            };
        });

        it('returns banner if it has never been dismissed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            targeting.engagementBannerLastClosedAt = undefined;

            _.resetCache('contributions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('AusMomentContributionsBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('contributions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('AusMomentContributionsBanner');
            });
        });

        it('returns null if article is paid content', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            _.resetCache('contributions', 'australia');

            targeting.isPaidContent = true;

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result).toBe(null);
            });
        });
    });

    describe('Subs Banner', () => {
        let targeting: BannerTargeting;
        let tracking: BannerPageTracking;

        beforeEach(() => {
            targeting = {
                alreadyVisitedCount: 3,
                shouldHideReaderRevenue: false,
                isPaidContent: false,
                showSupportMessaging: true,
                mvtId: 3,
                countryCode: 'US',
                engagementBannerLastClosedAt: secondDate,
            };
            tracking = {
                ophanPageId: '',
                ophanComponentId: '',
                platformId: '',
                referrerUrl: '',
                clientName: '',
            };
        });

        it('returns banner if it has never been dismissed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            targeting.subscriptionsBannerLastClosedAt = undefined;

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('SubscriptionsBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('SubscriptionsBanner');
            });
        });

        it('returns null if there are insufficient page views', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            targeting.alreadyVisitedCount = 1;

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result).toBe(null);
            });
        });

        it('returns null if user is logged in and has a subscription', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'united-states');

            targeting.showSupportMessaging = false;

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result).toBe(null);
            });
        });
    });

    describe('Weekly Banner', () => {
        let targeting: BannerTargeting;
        let tracking: BannerPageTracking;

        beforeEach(() => {
            targeting = {
                alreadyVisitedCount: 3,
                shouldHideReaderRevenue: false,
                isPaidContent: false,
                showSupportMessaging: true,
                mvtId: 3,
                countryCode: 'AU',
                engagementBannerLastClosedAt: secondDate,
            };
            tracking = {
                ophanPageId: '',
                ophanComponentId: '',
                platformId: '',
                referrerUrl: '',
                clientName: '',
            };
        });

        it('returns banner if it has never been dismissed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(secondDate)),
            ]);

            targeting.subscriptionsBannerLastClosedAt = undefined;

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('WeeklyBanner');
            });
        });

        it('returns banner if has been redeployed', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result && result.test.name).toBe('WeeklyBanner');
            });
        });

        it('returns null if shouldHideReaderRevenue', () => {
            // // @ts-ignore
            (cacheAsync as jest.Mock).mockReturnValue([
                null,
                (): Promise<Date> => Promise.resolve(new Date(firstDate)),
            ]);

            _.resetCache('subscriptions', 'australia');

            targeting.shouldHideReaderRevenue = true;

            return selectBannerTest(targeting, tracking, '').then(result => {
                expect(result).toBe(null);
            });
        });
    });
});
