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
        `https://gu-contributions-public.s3-eu-west-1.amazonaws.com/banner-deploy/${channel}/${region}.json`,
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
export const bannerDeployCaches: BannerDeployCaches = {
    contributions: {
        'united-kingdom': cacheAsync(
            fetchBannerDeployTime('united-kingdom', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_united-kingdom',
        )[1],
        'united-states': cacheAsync(
            fetchBannerDeployTime('united-states', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_united-states',
        )[1],
        australia: cacheAsync(
            fetchBannerDeployTime('australia', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_australia',
        )[1],
        'rest-of-world': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_rest-of-world',
        )[1],
        // Contributions doesn't separate europe from row
        'european-union': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_rest-of-world',
        )[1],
    },
    subscriptions: {
        'united-kingdom': cacheAsync(
            fetchBannerDeployTime('united-kingdom', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-kingdom',
        )[1],
        'united-states': cacheAsync(
            fetchBannerDeployTime('united-states', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-states',
        )[1],
        australia: cacheAsync(
            fetchBannerDeployTime('australia', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_australia',
        )[1],
        'rest-of-world': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_rest-of-world',
        )[1],
        // Subscriptions separates europe from row
        'european-union': cacheAsync(
            fetchBannerDeployTime('european-union', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_european-union',
        )[1],
    },
};
