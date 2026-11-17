import { getInline1BidPrice, inline1BidPrices } from './inline1BidPrices';

describe('inline1BidPrices', () => {
    it.each(['UK', 'US', 'AU'] as const)(
        'defines high and low prices for Desktop and Mobile in %s',
        (region) => {
            expect(inline1BidPrices[region]).toEqual({
                Desktop: { high: expect.any(Number), low: expect.any(Number) },
                Mobile: { high: expect.any(Number), low: expect.any(Number) },
            });
        },
    );
});

describe('getInline1BidPrice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('defaults to zero when bidScore is absent', () => {
        expect(getInline1BidPrice(undefined, 'GB', 'Desktop')).toBe(0);
    });

    it.each([
        ['GB', 'UK'],
        ['US', 'US'],
        ['AU', 'AU'],
    ] as const)('uses configured high prices for %s', (countryCode, region) => {
        jest.replaceProperty(inline1BidPrices[region].Desktop, 'high', 2.5);
        jest.replaceProperty(inline1BidPrices[region].Mobile, 'high', 1.5);

        expect(getInline1BidPrice(1.0, countryCode, 'Desktop')).toBe(2.5);
        expect(getInline1BidPrice(1.0, countryCode, 'iOS')).toBe(1.5);
        expect(getInline1BidPrice(1.0, countryCode, 'Android')).toBe(1.5);
    });

    it.each([
        ['GB', 'UK'],
        ['US', 'US'],
        ['AU', 'AU'],
    ] as const)('uses configured low prices for %s', (countryCode, region) => {
        jest.replaceProperty(inline1BidPrices[region].Desktop, 'low', 0.81);
        jest.replaceProperty(inline1BidPrices[region].Mobile, 'low', 0.99);

        expect(getInline1BidPrice(0, countryCode, 'Desktop')).toBe(0.81);
        expect(getInline1BidPrice(0, countryCode, 'iOS')).toBe(0.99);
        expect(getInline1BidPrice(0, countryCode, 'Android')).toBe(0.99);
    });

    it.each([0.5, 2])('preserves a bidScore of %s', (bidScore) => {
        jest.replaceProperty(inline1BidPrices.UK.Desktop, 'high', 2.5);

        expect(getInline1BidPrice(bidScore, 'GB', 'Desktop')).toBe(bidScore);
    });

    it.each(['FR', 'ZZ', ''])('preserves the bid for unconfigured country %s', (countryCode) => {
        expect(getInline1BidPrice(0, countryCode, 'Desktop')).toBe(0);
        expect(getInline1BidPrice(1.0, countryCode, 'Desktop')).toBe(1.0);
    });
});

