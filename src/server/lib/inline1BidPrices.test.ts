import { getInline1BidPrice, inline1BidPrices } from './inline1BidPrices';

const countryRegions = [
    ['GB', 'UK'],
    ['US', 'US'],
    ['AU', 'AU'],
    ['CA', 'CA'],
    ['FR', 'EU'],
    ['DE', 'EU'],
    ['NZ', 'NZ'],
    ['IN', 'INT'],
    ['ZZ', 'INT'],
    ['', 'INT'],
] as const;

describe('inline1BidPrices', () => {
    it.each(['UK', 'US', 'AU', 'CA', 'EU', 'NZ', 'INT'] as const)(
        'defines high and low prices for Desktop and Mobile in %s',
        (region) => {
            expect(inline1BidPrices[region]).toEqual({
                Desktop: { high: expect.any(Number), low: expect.any(Number) },
                Mobile: { high: expect.any(Number), low: expect.any(Number) },
            });
            for (const device of ['Desktop', 'Mobile'] as const) {
                expect(inline1BidPrices[region][device].low).toBeGreaterThanOrEqual(0);
                expect(inline1BidPrices[region][device].high).toBeGreaterThan(
                    inline1BidPrices[region][device].low,
                );
            }
        },
    );
});

describe('getInline1BidPrice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.each(countryRegions)('defaults to zero when bidScore is absent in %s', (countryCode) => {
        for (const device of ['Desktop', 'iOS', 'Android'] as const) {
            expect(getInline1BidPrice(undefined, countryCode, device)).toBe(0);
        }
    });

    it.each(countryRegions)('uses configured high prices for %s', (countryCode, region) => {
        jest.replaceProperty(inline1BidPrices[region].Desktop, 'high', 2.5);
        jest.replaceProperty(inline1BidPrices[region].Mobile, 'high', 1.5);

        expect(getInline1BidPrice(1.0, countryCode, 'Desktop')).toBe(2.5);
        expect(getInline1BidPrice(1.0, countryCode, 'iOS')).toBe(1.5);
        expect(getInline1BidPrice(1.0, countryCode, 'Android')).toBe(1.5);
    });

    it.each(countryRegions)('uses configured low prices for %s', (countryCode, region) => {
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

    it.each(countryRegions)('returns configured prices for %s', (countryCode, region) => {
        for (const [device, bidDevice] of [
            ['Desktop', 'Desktop'],
            ['iOS', 'Mobile'],
            ['Android', 'Mobile'],
        ] as const) {
            expect(getInline1BidPrice(0, countryCode, device)).toBe(
                inline1BidPrices[region][bidDevice].low,
            );
            expect(getInline1BidPrice(1, countryCode, device)).toBe(
                inline1BidPrices[region][bidDevice].high,
            );
        }
    });
});
