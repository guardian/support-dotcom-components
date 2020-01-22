import { getCountryName, getLocalCurrencySymbol } from './geolocation';

describe('getLocalCurrencySymbol', () => {
    it('returns £ when no geolocation provided', () => {
        expect(getLocalCurrencySymbol()).toEqual('£');
    });

    it('returns $ when unknown geolocation provided', () => {
        expect(getLocalCurrencySymbol('XX')).toEqual('$');
    });

    it('returns the correct symbol when a known geolocation is provided', () => {
        expect(getLocalCurrencySymbol('FR')).toEqual('€');
    });
});

describe('getCountryName', () => {
    it('returns the expected country name', () => {
        expect(getCountryName('CZ')).toEqual('the Czech Republic');
    });

    it('returns undefined when no country code provided', () => {
        expect(getCountryName()).toBeUndefined();
    });

    it('returns undefined when an unknown country code provided', () => {
        expect(getCountryName('XX')).toBeUndefined();
    });
});
