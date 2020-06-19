import {
    BannerPageTracking,
    BannerTargeting,
    BannerTestSelection,
} from '../../components/BannerTypes';
import { AusMomentContributionsBanner } from './AusMomentContributionsBannerTest';

// TODO - implement test selection properly
export const selectBannerTest = (
    targeting: BannerTargeting,
    pageTracking: BannerPageTracking,
    baseUrl: string,
): BannerTestSelection | null => {
    const tests = [AusMomentContributionsBanner];
    const testToRun = tests.find(test => test.canRun(targeting, pageTracking));

    if (testToRun) {
        const variant = testToRun.variants[0]; // TODO - use mvt
        return {
            test: testToRun,
            variant,
            moduleUrl: `${baseUrl}/${variant.modulePath}`,
        };
    } else {
        return null;
    }
};
