const setBannerClosedTimestamp = (name: string): void =>
    localStorage.setItem(
        `gu.prefs.${name}`,
        JSON.stringify({
            value: new Date().toISOString(),
        }),
    );

export const setContributionsBannerClosedTimestamp = () =>
    setBannerClosedTimestamp('engagementBannerLastClosedAt');
