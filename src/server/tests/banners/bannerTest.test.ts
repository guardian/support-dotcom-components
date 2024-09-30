import { readerRevenueRegionFromCountryCode } from './bannerSelection';

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
