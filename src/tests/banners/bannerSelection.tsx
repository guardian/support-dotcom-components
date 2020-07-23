import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
    BannerTest,
    BannerType,
    BannerAudience,
    BannerContent,
} from '../../components/modules/banners/BannerTypes';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBanner } from './GuardianWeeklyBannerTest';
import { AusMomentThankYouBanner } from './AusMomentThankYouBannerTest';
import fetch from 'node-fetch';
import { cacheAsync } from '../../lib/cache';
import { countryCodeToCountryGroupId } from '../../lib/geolocation';
import { DefaultContributionsBanner } from './DefaultContributionsBannerTest';
import { fetchAllBannerContent } from '../../api/contributionsApi';

type ReaderRevenueRegion =
    | 'united-kingdom'
    | 'united-states'
    | 'australia'
    | 'rest-of-world'
    | 'european-union';

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
const caches = {
    contributions: {
        'united-kingdom': cacheAsync(
            fetchBannerDeployTime('united-kingdom', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_united-kingdom',
        ),
        'united-states': cacheAsync(
            fetchBannerDeployTime('united-states', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_united-states',
        ),
        australia: cacheAsync(
            fetchBannerDeployTime('australia', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_australia',
        ),
        'rest-of-world': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_rest-of-world',
        ),
        // Contributions doesn't separate europe from row
        'european-union': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'contributions'),
            fiveMinutes,
            'fetchEngagementBannerDeployTime_rest-of-world',
        ),
    },
    subscriptions: {
        'united-kingdom': cacheAsync(
            fetchBannerDeployTime('united-kingdom', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-kingdom',
        ),
        'united-states': cacheAsync(
            fetchBannerDeployTime('united-states', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-states',
        ),
        australia: cacheAsync(
            fetchBannerDeployTime('australia', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_australia',
        ),
        'rest-of-world': cacheAsync(
            fetchBannerDeployTime('rest-of-world', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_rest-of-world',
        ),
        // Subscriptions separates europe from row
        'european-union': cacheAsync(
            fetchBannerDeployTime('european-union', 'subscriptions'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_european-union',
        ),
    },
};

// Has the banner been redeployed since the user last closed it?
export const redeployedSinceLastClosed = (
    targeting: BannerTargeting,
    bannerType: BannerType,
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
        const [, getCached] = caches.subscriptions[region];
        return getCached().then(deployDate => {
            return (
                !subscriptionBannerLastClosedAt ||
                deployDate > new Date(subscriptionBannerLastClosedAt)
            );
        });
    } else if (bannerType === 'contributions') {
        const [, getCached] = caches.contributions[region];
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
        case 'NonSupporters':
            return showSupportMessaging;
        case 'Supporters':
            return !showSupportMessaging;
        default:
            return true;
    }
};

const [, fetchAllBannerContentCached] = cacheAsync(
    fetchAllBannerContent,
    60,
    'fetchAllBannerContent',
);

export const bannerContentForVariant = async (
    testSelection: BannerTestSelection | null,
): Promise<BannerContent> => {
    console.log(testSelection);
    const testName = 'control';
    const variantName = 0;

    const allBannerContent = await fetchAllBannerContentCached();
    return allBannerContent[testName][variantName];
};

export const selectBannerTest = async (
    targeting: BannerTargeting,
    pageTracking: BannerPageTracking,
    baseUrl: string,
): Promise<BannerTestSelection | null> => {
    const tests: BannerTest[] = [
        DefaultContributionsBanner,
        AusMomentThankYouBanner,
        DigitalSubscriptionsBanner,
        GuardianWeeklyBanner,
    ];

    for (const test of tests) {
        if (
            !targeting.shouldHideReaderRevenue &&
            !targeting.isPaidContent &&
            audienceMatches(targeting.showSupportMessaging, test.testAudience) &&
            targeting.alreadyVisitedCount >= test.minPageViews &&
            test.canRun(targeting, pageTracking) &&
            (await redeployedSinceLastClosed(targeting, test.bannerType))
        ) {
            const variant = test.variants[0]; // TODO - use mvt
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

// exposed for testing purposes only
export const _ = {
    resetCache: (bannerType: BannerType, region: ReaderRevenueRegion): void => {
        const capitalisedBannerType = {
            contributions: 'Contributions',
            subscriptions: 'Subscriptions',
        };

        caches[bannerType][region] = cacheAsync(
            fetchBannerDeployTime(region, bannerType),
            fiveMinutes,
            `fetch${capitalisedBannerType[bannerType]}BannerDeployTime_${region}`,
        );
    },
};
