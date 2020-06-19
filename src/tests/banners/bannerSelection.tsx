import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
} from '../../components/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';
import fetch from 'node-fetch';

type ReaderRevenueRegion = 'united-kingdom' | 'united-states' | 'australia' | 'rest-of-world';

const readerRevenueRegionFromCountryCode = (countryCode: string): ReaderRevenueRegion => {
    switch (countryCode) {
        case 'GB':
            return 'united-kingdom';
        case 'US':
            return 'united-states';
        case 'AU':
            return 'australia';
        default:
            return 'rest-of-world';
    }
};

// TODO - cache
const fetchBannerDeployTime = (region: ReaderRevenueRegion): Promise<Date> => {
    return fetch(`https://www.theguardian.com/reader-revenue/contributions-banner-deploy-log/${region}`)
        .then(response => response.json())
        .then(data => {
            return new Date(data.time);
        })
};

// Has the banner been redeployed since the user last closed it?
const redeployedSinceLastClosed = (targeting: BannerTargeting): Promise<boolean> => {
    if (targeting.engagementBannerLastClosedAt) {
        const closedAt = targeting.engagementBannerLastClosedAt;
        const region = readerRevenueRegionFromCountryCode(targeting.countryCode);

        return fetchBannerDeployTime(region).then(deployDate => deployDate > new Date(closedAt))
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
            const testToRun = tests.find(test => test.canRun(targeting, pageTracking));

            if (testToRun) {
                const variant = testToRun.variants[0]; // TODO - use mvt
                return {
                    test: testToRun,
                    variant,
                    moduleUrl: `${baseUrl}/${variant.modulePath}`,
                };
            }
        }

        return null;
    });
};
