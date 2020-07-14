import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
} from '../../components/modules/banners/contributions/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';
import fetch from 'node-fetch';
import { cacheAsync } from '../../lib/cache';

type ReaderRevenueRegion = 'united-kingdom' | 'united-states' | 'australia' | 'rest-of-world';

const readerRevenueRegionFromCountryCode = (countryCode: string): ReaderRevenueRegion => {
    switch (countryCode.toLowerCase()) {
        case 'gb':
            return 'united-kingdom';
        case 'us':
            return 'united-states';
        case 'au':
            return 'australia';
        default:
            return 'rest-of-world';
    }
};

const fetchBannerDeployTime = (region: ReaderRevenueRegion) => (): Promise<Date> => {
    return fetch(
        `https://www.theguardian.com/reader-revenue/contributions-banner-deploy-log/${region}`,
    )
        .then(response => response.json())
        .then(data => {
            return new Date(data.time);
        });
};

const fiveMinutes = 60 * 5;
const caches = {
    'united-kingdom': cacheAsync(
        fetchBannerDeployTime('united-kingdom'),
        fiveMinutes,
        'fetchBannerDeployTime_united-kingdom',
    ),
    'united-states': cacheAsync(
        fetchBannerDeployTime('united-states'),
        fiveMinutes,
        'fetchBannerDeployTime_united-states',
    ),
    australia: cacheAsync(
        fetchBannerDeployTime('australia'),
        fiveMinutes,
        'fetchBannerDeployTime_australia',
    ),
    'rest-of-world': cacheAsync(
        fetchBannerDeployTime('rest-of-world'),
        fiveMinutes,
        'fetchBannerDeployTime_rest-of-world',
    ),
};

// Has the banner been redeployed since the user last closed it?
const redeployedSinceLastClosed = (targeting: BannerTargeting): Promise<boolean> => {
    if (targeting.engagementBannerLastClosedAt) {
        const closedAt = targeting.engagementBannerLastClosedAt;
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

        const [, getCached] = caches[region];

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
): Promise<BannerTestSelection | null> => {
    return redeployedSinceLastClosed(targeting).then(hasRedeployed => {
        if (hasRedeployed) {
            const tests = [AusMomentContributionsBanner];
            const testToRun = tests.find(
                test =>
                    targeting.alreadyVisitedCount >= test.minPageViews &&
                    !targeting.shouldHideReaderRevenue &&
                    !targeting.isPaidContent &&
                    test.canRun(targeting, pageTracking),
            );

            if (testToRun) {
                const variant = testToRun.variants[0]; // TODO - use mvt
                return {
                    test: testToRun,
                    variant,
                    moduleUrl: `${baseUrl}/${variant.modulePath}`,
                    moduleName: variant.moduleName,
                };
            }
        }

        return null;
    });
};
