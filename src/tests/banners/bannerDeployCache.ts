import { cacheAsync } from '../../lib/cache';
import { BannerChannel } from '../../types/BannerTypes';
import fetch from 'node-fetch';

export type ReaderRevenueRegion =
    | 'united-kingdom'
    | 'united-states'
    | 'australia'
    | 'rest-of-world'
    | 'european-union';

const fetchBannerDeployTime = (
    region: ReaderRevenueRegion,
    bannerChannel: BannerChannel,
) => (): Promise<Date> => {
    const channel = bannerChannel === 'contributions' ? 'channel1' : 'channel2';
    return fetch(
        `https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner-deploy/PROD/${channel}/${region}.json`,
    )
        .then(response => response.json())
        .then(data => {
            console.log(`Got banner deploy time for ${channel}/${region}`, data.time);
            return new Date(data.time);
        });
};

const fiveMinutes = 60 * 5;
export interface BannerDeployCaches {
    contributions: {
        [key in ReaderRevenueRegion]: () => Promise<Date>;
    };
    subscriptions: {
        [key in ReaderRevenueRegion]: () => Promise<Date>;
    };
}

const cachedDeployTime = (
    region: ReaderRevenueRegion,
    bannerChannel: BannerChannel,
): (() => Promise<Date>) =>
    cacheAsync(
        fetchBannerDeployTime(region, bannerChannel),
        fiveMinutes,
        `fetch${bannerChannel}BannerDeployTime_${region}`,
        true,
    )[1];

export const bannerDeployCaches: BannerDeployCaches = {
    contributions: {
        'united-kingdom': cachedDeployTime('united-kingdom', 'contributions'),
        'united-states': cachedDeployTime('united-states', 'contributions'),
        australia: cachedDeployTime('australia', 'contributions'),
        'rest-of-world': cachedDeployTime('rest-of-world', 'contributions'),
        // Contributions doesn't separate europe from row
        'european-union': cachedDeployTime('rest-of-world', 'contributions'),
    },
    subscriptions: {
        'united-kingdom': cachedDeployTime('united-kingdom', 'subscriptions'),
        'united-states': cachedDeployTime('united-states', 'subscriptions'),
        australia: cachedDeployTime('australia', 'subscriptions'),
        'rest-of-world': cachedDeployTime('rest-of-world', 'subscriptions'),
        // Subscriptions separates europe from row
        'european-union': cachedDeployTime('european-union', 'subscriptions'),
    },
};
