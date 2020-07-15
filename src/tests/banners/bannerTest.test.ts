import { readerRevenueRegionFromCountryCode } from './bannerSelection';
import { DigitalSubscriptionBanner } from './DigitalSubscriptionBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';

describe('readerRevenueRegionFromCountryCode', () => {
    it('should return a region', () => {
        const unitedKingdom = readerRevenueRegionFromCountryCode('GB');
        expect(unitedKingdom).toBe('united-kingdom');

        const germany = readerRevenueRegionFromCountryCode('DE');
        expect(germany).toBe('european-union');

        const australia = readerRevenueRegionFromCountryCode('AU');
        expect(australia).toBe('australia');

        const fiji = readerRevenueRegionFromCountryCode('FJ');
        expect(fiji).toBe('rest-of-world');

        const usa = readerRevenueRegionFromCountryCode('US');
        expect(usa).toBe('united-states');
    });
});

describe('SubscriptionsBanner canRun', () => {
    it('should return the correct targeting result', () => {
        const targetingTrue = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionsBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'US',
            remoteSubscriptionsBannerSwitchIsOn: true,
        };
        const targetingFalse = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionsBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'FJ',
            remoteSubscriptionsBannerSwitchIsOn: true,
        };
        const tracking = {
            ophanPageId: '',
            ophanComponentId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };
        const canRun1 = DigitalSubscriptionBanner.canRun(targetingTrue, tracking);
        expect(canRun1).toBe(true);
        const canRun2 = DigitalSubscriptionBanner.canRun(targetingFalse, tracking);
        expect(canRun2).toBe(false);
    });
});

describe('WeeklyBanner canRun', () => {
    it('should return a boolean', () => {
        const targetingTrue = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionsBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'AU',
            remoteSubscriptionsBannerSwitchIsOn: true,
        };
        const targetingFalse = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            subscriptionsBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'US',
            remoteSubscriptionsBannerSwitchIsOn: true,
        };
        const tracking = {
            ophanPageId: '',
            ophanComponentId: '',
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
