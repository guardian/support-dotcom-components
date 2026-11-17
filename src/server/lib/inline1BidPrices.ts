import { countryCodeToCountryGroupId, countryGroups } from '../../shared/lib';
import type { SupportRegionId } from '../../shared/lib';
import type { DeviceType, UserDeviceType } from '../../shared/types';

export type Inline1BidRegion = Extract<SupportRegionId, 'UK' | 'US' | 'AU'>;
export type Inline1BidDeviceType = Extract<DeviceType, 'Desktop' | 'Mobile'>;

type BidPrices = {
    high: number;
    low: number;
};

export const inline1BidPrices: Record<Inline1BidRegion, Record<Inline1BidDeviceType, BidPrices>> = {
    UK: {
        Desktop: { high: 2.50, low: 0.81 },
        Mobile: { high: 2.96, low: 0.99 },
    },
    US: {
        Desktop: { high: 2.52, low: 1.03 },
        Mobile: { high: 3.63, low: 1.42 },
    },
    AU: {
        Desktop: { high: 2.00, low: 0.52 },
        Mobile: { high: 2.32, low: 0.77 },
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
    if (region !== 'UK' && region !== 'US' && region !== 'AU') {
        return bidScore;
    }

    const bidDeviceType = deviceType === 'Desktop' ? 'Desktop' : 'Mobile';
    const bidLevel = bidScore === 1 ? 'high' : 'low';
    return inline1BidPrices[region][bidDeviceType][bidLevel];
};
