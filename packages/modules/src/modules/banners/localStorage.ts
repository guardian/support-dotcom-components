import { BannerChannel } from '@sdc/shared/types';

const setBannerClosedTimestamp = (name: string): void =>
	localStorage.setItem(
		`gu.prefs.${name}`,
		JSON.stringify({
			value: new Date().toISOString(),
		}),
	);

export const setContributionsBannerClosedTimestamp = (): void =>
	setBannerClosedTimestamp('engagementBannerLastClosedAt');

export const setSubscriptionsBannerClosedTimestamp = (): void =>
	setBannerClosedTimestamp('subscriptionBannerLastClosedAt');

export const setChannelClosedTimestamp = (channel: BannerChannel): void => {
	if (channel === 'contributions') {
		setContributionsBannerClosedTimestamp();
	} else if (channel === 'subscriptions') {
		setSubscriptionsBannerClosedTimestamp();
	}
};
