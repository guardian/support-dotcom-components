import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
} from '../../components/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';
import { SubscriptionsBanner } from './SubscriptionsBannerTest';
import { WeeklyBanner } from './WeeklyBannerTest';
import fetch from 'node-fetch';
import { cacheAsync } from '../../lib/cache';
import { countryCodeToCountryGroupId, CountryGroupId } from '../../lib/geolocation';

type ReaderRevenueRegion =
    | 'united-kingdom'
    | 'united-states'
    | 'australia'
    | 'rest-of-world'
    | 'european-union';

export const readerRevenueRegionFromCountryCode = (countryCode: string): ReaderRevenueRegion => {
    const countryGroupId: CountryGroupId = countryCodeToCountryGroupId(countryCode);
    switch (countryGroupId) {
        case 'GBPCountries':
            return 'united-kingdom';
        case 'UnitedStates':
            return 'united-states';
        case 'AUDCountries':
            return 'australia';
        case 'EURCountries':
            return 'european-union';
        default:
            return 'rest-of-world';
    }
};

const fetchContributionsBannerDeployTime = (region: ReaderRevenueRegion) => (): Promise<Date> => {
    return fetch(
        `https://www.theguardian.com/reader-revenue/contributions-banner-deploy-log/${region}`,
    )
        .then(response => response.json())
        .then(data => {
            return new Date(data.time);
        });
};

/**
 * Subscriptions is temporarily using the "/united-kingdom" route
 * for users in the "european-union" region.
 */
const fetchSubscriptionsBannerDeployTime = (region: ReaderRevenueRegion) => (): Promise<Date> => {
    return fetch(
        `https://www.theguardian.com/reader-revenue/subscriptions-banner-deploy-log/${
            region === 'european-union' ? 'united-kingdom' : region
        }`,
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
            fetchContributionsBannerDeployTime('united-kingdom'),
            fiveMinutes,
            'fetchContributionsBannerDeployTime_united-kingdom',
        ),
        'united-states': cacheAsync(
            fetchContributionsBannerDeployTime('united-states'),
            fiveMinutes,
            'fetchContributionsBannerDeployTime_united-states',
        ),
        australia: cacheAsync(
            fetchContributionsBannerDeployTime('australia'),
            fiveMinutes,
            'fetchContributionsBannerDeployTime_australia',
        ),
        'rest-of-world': cacheAsync(
            fetchContributionsBannerDeployTime('rest-of-world'),
            fiveMinutes,
            'fetchContributionsBannerDeployTime_rest-of-world',
        ),
        // Contributions doesn't separate europe from row
        'european-union': cacheAsync(
            fetchContributionsBannerDeployTime('rest-of-world'),
            fiveMinutes,
            'fetchContributionsBannerDeployTime_rest-of-world',
        ),
    },
    subscriptions: {
        'united-kingdom': cacheAsync(
            fetchSubscriptionsBannerDeployTime('united-kingdom'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-kingdom',
        ),
        'united-states': cacheAsync(
            fetchSubscriptionsBannerDeployTime('united-states'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_united-states',
        ),
        australia: cacheAsync(
            fetchSubscriptionsBannerDeployTime('australia'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_australia',
        ),
        'rest-of-world': cacheAsync(
            fetchSubscriptionsBannerDeployTime('rest-of-world'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_rest-of-world',
        ),
        // Subscriptions separates europe from row
        'european-union': cacheAsync(
            fetchSubscriptionsBannerDeployTime('european-union'),
            fiveMinutes,
            'fetchSubscriptionsBannerDeployTime_european-union',
        ),
    },
};

// Has the banner been redeployed since the user last closed it?
export const redeployedSinceLastClosed = (
    targeting: BannerTargeting,
    bannerType: 'contributions' | 'subscriptions',
): Promise<boolean> => {
    if (targeting.engagementBannerLastClosedAt) {
        const closedAt = targeting.engagementBannerLastClosedAt;
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

        const [, getCached] = caches[bannerType][region];

        return getCached().then(deployDate => deployDate > new Date(closedAt));
    } else {
        return Promise.resolve(true);
    }
};

// TODO - implement test selection properly
export const selectBannerTest = (
    targeting: BannerTargeting,
    pageTracking: BannerPageTracking,
    baseUrl: string,
): BannerTestSelection | null => {
    const tests = [AusMomentContributionsBanner, SubscriptionsBanner, WeeklyBanner];
    tests.find(test => {
        redeployedSinceLastClosed(targeting, test.bannerType).then(hasRedeployed => {
            if (
                hasRedeployed &&
                targeting.alreadyVisitedCount >= test.minPageViews &&
                !targeting.shouldHideReaderRevenue &&
                !targeting.isPaidContent &&
                test.canRun(targeting, pageTracking)
            ) {
                const variant = test.variants[0]; // TODO - use mvt
                return {
                    test,
                    variant,
                    moduleUrl: variant
                        ? `${baseUrl}/${variant.modulePath}`
                        : `${baseUrl}/${test.path}`,
                    moduleName: variant ? variant.moduleName : test.name,
                };
            }
            return null;
        });
    });
    return null;
};
