import type { BannerChannel } from '../../../shared/types';
import { isProd } from '../../lib/env';
import { logInfo } from '../../utils/logging';
import { fetchS3Data } from '../../utils/S3';
import type { ValueProvider } from '../../utils/valueReloader';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

/**
 * Banner deploy cache -
 * Banners can be manually re-deployed from the RRCP.
 * This file maintains a cache of these deploy times, per channel and per region.
 */

export type ReaderRevenueRegion =
    'UnitedKingdom' | 'UnitedStates' | 'Australia' | 'RestOfWorld' | 'EuropeanUnion';

const AdminConsoleBucket = 'support-admin-console';

const fetchBannerDeployTimes = (bannerChannel: BannerChannel) => (): Promise<BannerDeployTimes> => {
    const channel = bannerChannel === 'contributions' ? 'channel1' : 'channel2';
    return fetchS3Data(
        AdminConsoleBucket,
        `${isProd ? 'PROD' : 'CODE'}/banner-deploy/${channel}.json`,
    )
        .then(JSON.parse)
        .then((data: Record<ReaderRevenueRegion, { timestamp: number }>) => {
            const times: BannerDeployTimes = {
                UnitedKingdom: new Date(data.UnitedKingdom.timestamp),
                UnitedStates: new Date(data.UnitedStates.timestamp),
                Australia: new Date(data.Australia.timestamp),
                RestOfWorld: new Date(data.RestOfWorld.timestamp),
                EuropeanUnion: new Date(data.EuropeanUnion.timestamp),
            };
            logInfo(`Got banner deploy times for ${channel}, times: ${JSON.stringify(times)}`);
            return times;
        });
};

const fiveMinutes = 60 * 5;

const readerRevenueRegions: ReaderRevenueRegion[] = [
    'Australia',
    'EuropeanUnion',
    'RestOfWorld',
    'UnitedKingdom',
    'UnitedStates',
];

export interface BannerDeployRegion {
    timestamp: number;
    email: string;
}

export interface VariantBannerDeploySchedule {
    daysOfWeek: number[];
    lastManualRedeployTimestamp?: number;
    manualRedeploysByRegion?: Partial<Record<ReaderRevenueRegion, BannerDeployRegion>>;
}

const isValidRegionalRedeploy = (value: unknown): value is BannerDeployRegion =>
    typeof value === 'object' &&
    value !== null &&
    'timestamp' in value &&
    typeof value.timestamp === 'number' &&
    Number.isSafeInteger(value.timestamp) &&
    value.timestamp >= 0 &&
    'email' in value &&
    typeof value.email === 'string';

export const defaultVariantBannerDeploySchedule: VariantBannerDeploySchedule = {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
};

const isValidVariantSchedule = (value: unknown): value is VariantBannerDeploySchedule => {
    if (typeof value !== 'object' || value === null || !('daysOfWeek' in value)) {
        return false;
    }

    const daysOfWeek = value.daysOfWeek;
    const lastManualRedeployTimestamp =
        'lastManualRedeployTimestamp' in value ? value.lastManualRedeployTimestamp : undefined;
    const manualRedeploysByRegion =
        'manualRedeploysByRegion' in value ? value.manualRedeploysByRegion : undefined;
    const hasValidRegionalRedeploys =
        manualRedeploysByRegion === undefined ||
        (typeof manualRedeploysByRegion === 'object' &&
            manualRedeploysByRegion !== null &&
            !Array.isArray(manualRedeploysByRegion) &&
            Object.entries(manualRedeploysByRegion).every(
                ([region, deploy]) =>
                    readerRevenueRegions.includes(region as ReaderRevenueRegion) &&
                    isValidRegionalRedeploy(deploy),
            ));
    return (
        Array.isArray(daysOfWeek) &&
        daysOfWeek.every((day) => Number.isInteger(day) && day >= 0 && day <= 6) &&
        new Set(daysOfWeek).size === daysOfWeek.length &&
        (lastManualRedeployTimestamp === undefined ||
            (typeof lastManualRedeployTimestamp === 'number' &&
                Number.isSafeInteger(lastManualRedeployTimestamp) &&
                lastManualRedeployTimestamp >= 0)) &&
        hasValidRegionalRedeploys
    );
};

const parseVariantBannerDeploySchedule = (json: string): VariantBannerDeploySchedule => {
    const parsed: unknown = JSON.parse(json);
    const value =
        typeof parsed === 'object' && parsed !== null && 'value' in parsed
            ? parsed.value
            : undefined;

    if (!isValidVariantSchedule(value)) {
        throw new Error('Invalid Variant banner deploy schedule');
    }

    return value;
};

const fetchVariantBannerDeploySchedule = (): Promise<VariantBannerDeploySchedule> => {
    const stage = isProd ? 'PROD' : 'CODE';
    const key = `${stage}/banner-deploy/variant-schedule.json`;
    return fetchS3Data(AdminConsoleBucket, key)
        .then(parseVariantBannerDeploySchedule)
        .then((schedule) => {
            logInfo(
                `Got Variant banner deploy schedule for ${key}: ${JSON.stringify(schedule.daysOfWeek)}`,
            );
            return schedule;
        });
};

interface BannerDeployTimes {
    UnitedKingdom: Date;
    UnitedStates: Date;
    Australia: Date;
    RestOfWorld: Date;
    EuropeanUnion: Date;
}

interface BannerDeployTimesProviders {
    contributions: ValueProvider<BannerDeployTimes>;
    subscriptions: ValueProvider<BannerDeployTimes>;
    variantSchedule?: ValueProvider<VariantBannerDeploySchedule>;
}

export class BannerDeployTimesProvider {
    providers: BannerDeployTimesProviders;
    variantSchedule: ValueProvider<VariantBannerDeploySchedule>;

    constructor(providers: BannerDeployTimesProviders) {
        this.providers = providers;
        this.variantSchedule = providers.variantSchedule ?? {
            get: () => defaultVariantBannerDeploySchedule,
        };
    }

    getDeployTimes(channel: 'contributions' | 'subscriptions'): BannerDeployTimes {
        return this.providers[channel].get();
    }

    getVariantSchedule(): VariantBannerDeploySchedule {
        return this.variantSchedule.get();
    }
}

export const buildBannerDeployTimesReloader = async (): Promise<BannerDeployTimesProvider> => {
    const [contributions, subscriptions] = await Promise.all([
        buildReloader(fetchBannerDeployTimes('contributions'), fiveMinutes),
        buildReloader(fetchBannerDeployTimes('subscriptions'), fiveMinutes),
    ]);
    return new BannerDeployTimesProvider({
        contributions,
        subscriptions,
        variantSchedule: new ValueReloader(
            defaultVariantBannerDeploySchedule,
            fetchVariantBannerDeploySchedule,
            fiveMinutes,
        ),
    });
};
