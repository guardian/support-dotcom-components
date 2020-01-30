import { getCountryName, getLocalCurrencySymbol } from './geolocation';

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
