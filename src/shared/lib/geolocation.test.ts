import { addRegionIdToSupportUrl, getCountryName, getLocalCurrencySymbol } from './geolocation';

describe('getLocalCurrencySymbol', () => {
    const currencySymbolTests = [
        { input: undefined, output: '£' },
        { input: 'XX', output: '$' },
        { input: 'FR', output: '€' },
        { input: 'NZ', output: 'NZ$' },
    ];

    currencySymbolTests.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(getLocalCurrencySymbol(input)).toEqual(output);
        });
    });
});

describe('getCountryName', () => {
    const countryNameTests = [
        { input: 'GB', output: 'the UK' },
        { input: 'CZ', output: 'the Czech Republic' },
        { input: undefined, output: undefined },
        { input: 'XX', output: undefined },
    ];

    countryNameTests.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(getCountryName(input)).toEqual(output);
        });
    });
});

describe('addRegionIdToSupportUrl', () => {
    const originalUrl = 'https://support.theguardian.com/contribute';
    const checkoutUrl = 'https://support.theguardian.com/checkout';

    it('should modify the URL to include UK if country code is GB', () => {
        const countryCode = 'GB';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/uk/contribute');
    });

    it('should modify the URL to include EU if country code is PT', () => {
        const countryCode = 'PT';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/eu/contribute');
    });

    it('should modify the URL to include INT if country code is unknown', () => {
        const countryCode = 'asdasd';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/int/contribute');
    });

    it('should modify the URL to include UK if country code is GB and URL is checkout', () => {
        const countryCode = 'GB';
        const modifiedUrl = addRegionIdToSupportUrl(checkoutUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/uk/checkout');
    });

    it('should modify the URL to include EU if country code is PT and URL is checkout', () => {
        const countryCode = 'PT';
        const modifiedUrl = addRegionIdToSupportUrl(checkoutUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/eu/checkout');
    });

    it('should modify the URL to include INT if country code is unknown and URL is checkout', () => {
        const countryCode = 'asdasd';
        const modifiedUrl = addRegionIdToSupportUrl(checkoutUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/int/checkout');
    });

    it('should not modify the URL if country code is missing', () => {
        const countryCode = undefined;
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/contribute');
    });

    it('should not modify the URL if it does not follow the expected pattern', () => {
        const countryCode = 'GB';
        const nonconformingUrl = 'https://www.theguardian.com/uk';
        const modifiedUrl = addRegionIdToSupportUrl(nonconformingUrl, countryCode);
        expect(modifiedUrl).toEqual(nonconformingUrl);
    });
});
