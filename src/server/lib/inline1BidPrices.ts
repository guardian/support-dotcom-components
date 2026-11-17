import { countryCodeToCountryGroupId, countryGroups } from '../../shared/lib';
import type { SupportRegionId } from '../../shared/lib';
import type { DeviceType, UserDeviceType } from '../../shared/types';

export type Inline1BidRegion = Extract<
    SupportRegionId,
    'UK' | 'US' | 'AU' | 'CA' | 'EU' | 'NZ' | 'INT'
>;
export type Inline1BidDeviceType = Extract<DeviceType, 'Desktop' | 'Mobile'>;

type BidPrices = {
    high: number;
    low: number;
};

export const inline1BidPrices: Record<Inline1BidRegion, Record<Inline1BidDeviceType, BidPrices>> = {
    UK: {
        Desktop: { high: 1.79, low: 0.43 },
        Mobile: { high: 2.0, low: 0.51 },
    },
    US: {
        Desktop: { high: 2.0, low: 0.59 },
        Mobile: { high: 2.1, low: 0.72 },
    },
    AU: {
        Desktop: { high: 1.12, low: 0.27 },
        Mobile: { high: 1.9, low: 0.35 },
    },
    CA: {
        Desktop: { high: 1.98, low: 0.38 },
        Mobile: { high: 2.0, low: 0.36 },
    },
    EU: {
        Desktop: { high: 2.0, low: 0.25 },
        Mobile: { high: 2.0, low: 0.26 },
    },
    NZ: {
        Desktop: { high: 2.0, low: 0.25 },
        Mobile: { high: 2.0, low: 0.26 },
    },
    INT: {
        Desktop: { high: 2.0, low: 0.25 },
        Mobile: { high: 2.0, low: 0.26 },
    },
};

export const getInline1BidPrice = (
    bidScore: number | undefined,
    countryCode: string,
    deviceType: UserDeviceType,
): number => {
    if (bidScore !== 0 && bidScore !== 1) {
        return bidScore ?? 0;
    }

    const region = countryGroups[countryCodeToCountryGroupId(countryCode)].supportRegionId;

    const bidDeviceType = deviceType === 'Desktop' ? 'Desktop' : 'Mobile';
    const bidLevel = bidScore === 1 ? 'high' : 'low';
    return inline1BidPrices[region][bidDeviceType][bidLevel];
};
