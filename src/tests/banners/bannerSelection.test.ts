import { readerRevenueRegionFromCountryCode, redeployedSinceLastClosed } from './bannerSelection';

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

describe('redeployedSinceLastClosed', () => {
    it('should return a boolean', () => {
        const targeting = {
            alreadyVisitedCount: 3,
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            engagementBannerLastClosedAt: '1594059610944',
            mvtId: 3,
            countryCode: 'US',
        };
        return redeployedSinceLastClosed(targeting, 'subscriptions').then(
            (hasRedeployed: boolean) => {
                expect(hasRedeployed).toBe(false);
            },
        );
    });
});
