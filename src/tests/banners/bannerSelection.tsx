import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
    BannerType,
    BannerAudience,
    BannerTest,
} from '../../types/BannerTypes';
import { countryCodeToCountryGroupId } from '../../lib/geolocation';
import { BannerDeployCaches, ReaderRevenueRegion } from './bannerDeployCache';

export const readerRevenueRegionFromCountryCode = (countryCode: string): ReaderRevenueRegion => {
    switch (true) {
        case countryCode === 'GB':
            return 'united-kingdom';
        case countryCode === 'US':
            return 'united-states';
        case countryCode === 'AU':
            return 'australia';
        case countryCodeToCountryGroupId(countryCode) === 'EURCountries':
            return 'european-union';
        default:
            return 'rest-of-world';
    }
};

// Has the banner been redeployed since the user last closed it?
export const redeployedSinceLastClosed = (
    targeting: BannerTargeting,
    bannerType: BannerType,
    bannerDeployCaches: BannerDeployCaches,
): Promise<boolean> => {
    const { subscriptionBannerLastClosedAt, engagementBannerLastClosedAt } = targeting;

    if (
        (bannerType === 'subscriptions' && !subscriptionBannerLastClosedAt) ||
        (bannerType === 'contributions' && !engagementBannerLastClosedAt)
    ) {
        return Promise.resolve(true);
    }

    const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

    if (bannerType === 'subscriptions') {
        const getCached = bannerDeployCaches.subscriptions[region];
        return getCached().then(deployDate => {
            return (
                !subscriptionBannerLastClosedAt ||
                deployDate > new Date(subscriptionBannerLastClosedAt)
            );
        });
    } else if (bannerType === 'contributions') {
        const getCached = bannerDeployCaches.contributions[region];
        return getCached().then(deployDate => {
            return (
                !engagementBannerLastClosedAt || deployDate > new Date(engagementBannerLastClosedAt)
            );
        });
    }

    return Promise.resolve(true);
};

const audienceMatches = (showSupportMessaging: boolean, testAudience: BannerAudience): boolean => {
    switch (testAudience) {
        case 'AllNonSupporters':
            return showSupportMessaging;
        case 'AllExistingSupporters':
            return !showSupportMessaging;
        default:
            return true;
    }
};

export const selectBannerTest = async (
    targeting: BannerTargeting,
    pageTracking: BannerPageTracking,
    baseUrl: string,
    getTests: () => Promise<BannerTest[]>,
    bannerDeployCaches: BannerDeployCaches,
): Promise<BannerTestSelection | null> => {
    const tests = await getTests();

    for (const test of tests) {
        if (
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.testAudience) &&
            targeting.alreadyVisitedCount >= test.minPageViews &&
            test.canRun(targeting, pageTracking) &&
            (await redeployedSinceLastClosed(targeting, test.bannerType, bannerDeployCaches))
        ) {
            const variant = test.variants[targeting.mvtId % test.variants.length];
            const bannerTestSelection = {
                test,
                variant,
                moduleUrl: `${baseUrl}/${variant.modulePath}`,
                moduleName: variant.moduleName,
            };

            return Promise.resolve(bannerTestSelection);
        }
    }

    return Promise.resolve(null);
};
