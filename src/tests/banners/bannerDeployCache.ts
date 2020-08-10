import { cacheAsync } from '../../lib/cache';
import { BannerType } from '../../types/BannerTypes';
import fetch from 'node-fetch';

export type ReaderRevenueRegion =
    | 'united-kingdom'
    | 'united-states'
    | 'australia'
    | 'rest-of-world'
    | 'european-union';

const fetchBannerDeployTime = (region: ReaderRevenueRegion, bannerType: BannerType) => (): Promise<
    Date
> => {
    return fetch(
        `https://www.theguardian.com/reader-revenue/${bannerType}-banner-deploy-log/${region}`,
    )
        .then(response => response.json())
        .then(data => {
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
