import { readerRevenueRegionFromCountryCode } from './bannerSelection';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';

describe('readerRevenueRegionFromCountryCode', () => {
    it('should return a region', () => {
        const unitedKingdom = readerRevenueRegionFromCountryCode('GB');
        expect(unitedKingdom).toBe('UnitedKingdom');

        const germany = readerRevenueRegionFromCountryCode('DE');
        expect(germany).toBe('EuropeanUnion');

        const australia = readerRevenueRegionFromCountryCode('AU');
        expect(australia).toBe('Australia');

        const fiji = readerRevenueRegionFromCountryCode('FJ');
        expect(fiji).toBe('RestOfWorld');

        const usa = readerRevenueRegionFromCountryCode('US');
        expect(usa).toBe('UnitedStates');
    });
});

describe('DigitalSubscriptionsBanner canRun', () => {
    it('should return the correct targeting result', () => {
        const targetingTrue = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'US',
            switches: {
                remoteSubscriptionsBanner: true,
            },
            hasOptedOutOfArticleCount: false,
        };
        const targetingFalse = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            // Should not show banner in Australia
            countryCode: 'AU',
            switches: {
                remoteSubscriptionsBanner: true,
            },
            hasOptedOutOfArticleCount: false,
        };
        const targetingFalse2 = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'GB',
            // Should not show banner if switch is off
            switches: {
                remoteSubscriptionsBanner: false,
            },
            hasOptedOutOfArticleCount: false,
        };
        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };
        const canRun1 = DigitalSubscriptionsBanner.canRun(targetingTrue, tracking);
        expect(canRun1).toBe(true);
        const canRun2 = DigitalSubscriptionsBanner.canRun(targetingFalse, tracking);
        expect(canRun2).toBe(false);
        const canRun3 = DigitalSubscriptionsBanner.canRun(targetingFalse2, tracking);
        expect(canRun3).toBe(false);
    });
});

describe('WeeklyBanner canRun', () => {
    it('should return the correct targeting result', () => {
        const targetingTrue = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'AU',
            switches: {
                remoteSubscriptionsBanner: true,
            },
            hasOptedOutOfArticleCount: false,
        };
        const targetingFalse = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'US',
            switches: {
                remoteSubscriptionsBanner: true,
            },
            hasOptedOutOfArticleCount: false,
        };
        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };
        const canRun1 = GuardianWeeklyBanner.canRun(targetingTrue, tracking);
        expect(canRun1).toBe(true);
        const canRun2 = GuardianWeeklyBanner.canRun(targetingFalse, tracking);
        expect(canRun2).toBe(false);
    });
});
