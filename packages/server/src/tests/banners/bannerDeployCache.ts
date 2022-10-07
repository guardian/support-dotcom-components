import { BannerChannel } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import { isProd } from '../../lib/env';
import { logInfo } from '../../utils/logging';
import { fetchS3Data } from '../../utils/S3';

/**
 * Banner deploy cache -
 * Banners can be manually re-deployed from the RRCP.
 * This file maintains a cache of these deploy times, per channel and per region.
 */

export type ReaderRevenueRegion =
    | 'UnitedKingdom'
    | 'UnitedStates'
    | 'Australia'
    | 'RestOfWorld'
    | 'EuropeanUnion';

const AdminConsoleBucket = 'support-admin-console';

const fetchBannerDeployTimes = (bannerChannel: BannerChannel) => (): Promise<BannerDeployTimes> => {
    const channel = bannerChannel === 'contributions' ? 'channel1' : 'channel2';
    return (
        fetchS3Data(AdminConsoleBucket, `${isProd ? 'PROD' : 'CODE'}/banner-deploy/${channel}.json`)
            .then(JSON.parse)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
                const times: BannerDeployTimes = {
                    UnitedKingdom: new Date(data.UnitedKingdom.timestamp),
                    UnitedStates: new Date(data.UnitedStates.timestamp),
                    Australia: new Date(data.Australia.timestamp),
                    RestOfWorld: new Date(data.RestOfWorld.timestamp),
                    EuropeanUnion: new Date(data.EuropeanUnion.timestamp),
                };
                logInfo(`Got banner deploy times for ${channel}, times: ${JSON.stringify(times)}`);
                return times;
            })
    );
};

const fiveMinutes = 60 * 5;
interface BannerDeployTimes {
    UnitedKingdom: Date;
    UnitedStates: Date;
    Australia: Date;
    RestOfWorld: Date;
    EuropeanUnion: Date;
}
export interface BannerDeployCaches {
    contributions: () => Promise<BannerDeployTimes>;
    subscriptions: () => Promise<BannerDeployTimes>;
}

const cachedDeployTime = (bannerChannel: BannerChannel): (() => Promise<BannerDeployTimes>) =>
    cacheAsync(fetchBannerDeployTimes(bannerChannel), { ttlSec: fiveMinutes, warm: true });

export const bannerDeployCaches: BannerDeployCaches = {
    contributions: cachedDeployTime('contributions'),
    subscriptions: cachedDeployTime('subscriptions'),
};