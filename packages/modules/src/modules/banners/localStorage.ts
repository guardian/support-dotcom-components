import { BannerChannel } from '@sdc/shared/types';

const setBannerClosedTimestamp = (name: string): void =>
    localStorage.setItem(
        `gu.prefs.${name}`,
        JSON.stringify({
            value: new Date().toISOString(),
        }),
    );

const setContributionsBannerClosedTimestamp = (): void =>
    setBannerClosedTimestamp('engagementBannerLastClosedAt');

const setSubscriptionsBannerClosedTimestamp = (): void =>
    setBannerClosedTimestamp('subscriptionBannerLastClosedAt');

const setSignInBannerClosedTimestamp = (): void =>
    setBannerClosedTimestamp('signInBannerLastClosedAt');

export const setChannelClosedTimestamp = (channel: BannerChannel): void => {
    if (channel === 'contributions') {
        setContributionsBannerClosedTimestamp();
    } else if (channel === 'subscriptions') {
        setSubscriptionsBannerClosedTimestamp();
    } else if (channel === 'signIn') {
        setSignInBannerClosedTimestamp();
    }
};
