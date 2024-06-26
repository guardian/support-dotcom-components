import { BannerChannel } from '@sdc/shared/types';

type BannerLastClosedAt =
    | 'engagementBannerLastClosedAt'
    | 'subscriptionBannerLastClosedAt'
    | 'signInBannerLastClosedAt'
    | 'abandonedBasketLastClosedAt';

const setBannerClosedTimestamp = (name: BannerLastClosedAt): void =>
    localStorage.setItem(
        `gu.prefs.${name}`,
        JSON.stringify({
            value: new Date().toISOString(),
        }),
    );

const bannerChannelToLastClosedMap = {
    contributions: 'engagementBannerLastClosedAt',
    subscriptions: 'subscriptionBannerLastClosedAt',
    signIn: 'signInBannerLastClosedAt',
    abandonedBasket: 'abandonedBasketLastClosedAt',
} as const satisfies Record<BannerChannel, BannerLastClosedAt>;

export const setChannelClosedTimestamp = (channel: BannerChannel): void => {
    setBannerClosedTimestamp(bannerChannelToLastClosedMap[channel]);
};
