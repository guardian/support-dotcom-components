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
    return fetch(
        `https://www.theguardian.com/reader-revenue/${bannerChannel}-banner-deploy-log/${region}`,
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
const ContributionsDeployDate = new Date(Date.parse('2020-10-06 06:00:00'));
const SubscriptionsDeployDate = new Date(Date.parse('2020-10-06 06:00:00'));
export const bannerDeployCaches: BannerDeployCaches = {
    contributions: {
        'united-kingdom': () => Promise.resolve(ContributionsDeployDate),
        'united-states': () => Promise.resolve(ContributionsDeployDate),
        australia: cacheAsync(
            fetchBannerDeployTime('australia', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_australia',
        )[1],
        'rest-of-world': () => Promise.resolve(ContributionsDeployDate),
        // Contributions doesn't separate europe from row
        'european-union': () => Promise.resolve(ContributionsDeployDate),
        // TODO - fix timestamp fetching
        // 'united-kingdom': cacheAsync(
        //     fetchBannerDeployTime('united-kingdom', 'contributions'),
        //     fiveMinutes,
        //     'fetchEngagementBannerDeployTime_united-kingdom',
        // )[1],
        // 'united-states': cacheAsync(
        //     fetchBannerDeployTime('united-states', 'contributions'),
        //     fiveMinutes,
        //     'fetchEngagementBannerDeployTime_united-states',
        // )[1],
        // australia: cacheAsync(
        //     fetchBannerDeployTime('australia', 'contributions'),
        //     fiveMinutes,
        //     'fetchEngagementBannerDeployTime_australia',
        // )[1],
        // 'rest-of-world': cacheAsync(
        //     fetchBannerDeployTime('rest-of-world', 'contributions'),
        //     fiveMinutes,
        //     'fetchEngagementBannerDeployTime_rest-of-world',
        // )[1],
        // // Contributions doesn't separate europe from row
        // 'european-union': cacheAsync(
        //     fetchBannerDeployTime('rest-of-world', 'contributions'),
        //     fiveMinutes,
        //     'fetchEngagementBannerDeployTime_rest-of-world',
        // )[1],
    },
    subscriptions: {
        'united-kingdom': () => Promise.resolve(SubscriptionsDeployDate),
        'united-states': () => Promise.resolve(SubscriptionsDeployDate),
        australia: () => Promise.resolve(SubscriptionsDeployDate),
        'rest-of-world': () => Promise.resolve(SubscriptionsDeployDate),
        // Subscriptions separates europe from row
        'european-union': () => Promise.resolve(SubscriptionsDeployDate),
        // TODO - fix timestamp fetching
        // 'united-kingdom': cacheAsync(
        //     fetchBannerDeployTime('united-kingdom', 'subscriptions'),
        //     fiveMinutes,
        //     'fetchSubscriptionsBannerDeployTime_united-kingdom',
        // )[1],
        // 'united-states': cacheAsync(
        //     fetchBannerDeployTime('united-states', 'subscriptions'),
        //     fiveMinutes,
        //     'fetchSubscriptionsBannerDeployTime_united-states',
        // )[1],
        // australia: cacheAsync(
        //     fetchBannerDeployTime('australia', 'subscriptions'),
        //     fiveMinutes,
        //     'fetchSubscriptionsBannerDeployTime_australia',
        // )[1],
        // 'rest-of-world': cacheAsync(
        //     fetchBannerDeployTime('rest-of-world', 'subscriptions'),
        //     fiveMinutes,
        //     'fetchSubscriptionsBannerDeployTime_rest-of-world',
        // )[1],
        // // Subscriptions separates europe from row
        // 'european-union': cacheAsync(
        //     fetchBannerDeployTime('european-union', 'subscriptions'),
        //     fiveMinutes,
        //     'fetchSubscriptionsBannerDeployTime_european-union',
        // )[1],
    },
};
