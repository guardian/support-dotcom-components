import { inTargetedCountry, passesContributionsOnlyTargeting } from '../../../dotcom';
import type {
    Inline1Targeting,
    Inline1Test,
    Inline1Variant,
    UserDeviceType,
} from '../../../shared/types';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import {
    audienceMatches,
    consentStatusMatches,
    correctSignedInStatus,
    deviceTypeMatches,
    pageContextMatches,
} from '../../lib/targeting';
import { selectVariantUsingMVT } from '../../selection/ab';

export interface Inline1TestSelection {
    test: Inline1Test;
    variant: Inline1Variant;
}

export const isCountryTargetedForInline1 = (
    test: Inline1Test,
    targeting: Inline1Targeting,
): boolean => {
    const targetedCountryGroups = test.regionTargeting
        ? test.regionTargeting.targetedCountryGroups
        : [];
    const targetedCountryCodes = test.regionTargeting
        ? test.regionTargeting.targetedCountryCodes
        : [];
    return inTargetedCountry(targeting.countryCode, targetedCountryGroups, targetedCountryCodes);
};

export const selectBestTest = (
    targeting: Inline1Targeting,
    allTests: Inline1Test[],
    userDeviceType: UserDeviceType,
    contributionsOnlyCountries: string[] = [],
    now: Date = new Date(),
): Inline1TestSelection | null => {
    const { showSupportMessaging, isSignedIn, hasConsented, hasNewsletterSignup } = targeting;

    for (const test of allTests) {
        const { status, userCohort, signedInStatus, contextTargeting, consentStatus } = test;

        // build pageContext
        const pageContext = {
            tagIds: targeting.tagIds,
            sectionId: targeting.sectionId,
        };

        if (
            status === 'Live' &&
            audienceMatches(showSupportMessaging, userCohort) &&
            isCountryTargetedForInline1(test, targeting) &&
            passesContributionsOnlyTargeting(
                test.regionTargeting,
                targeting.countryCode,
                contributionsOnlyCountries,
            ) &&
            historyWithinArticlesViewedSettings(
                test.articlesViewedSettings,
                targeting.weeklyArticleHistory,
                now,
            ) &&
            deviceTypeMatches(test, userDeviceType) &&
            correctSignedInStatus(isSignedIn, signedInStatus) &&
            pageContextMatches(pageContext, contextTargeting) &&
            consentStatusMatches(hasConsented, consentStatus)
        ) {
            const selectedVariant: Inline1Variant = selectVariantUsingMVT(test, targeting.mvtId);
            if (
                hasNewsletterSignup &&
                selectedVariant.message.type === 'Inline1NewsletterMessage'
            ) {
                continue;
            }

            return {
                test,
                variant: selectedVariant,
            };
        }
    }

    return null;
};

export const selectInline1Test = (
    targeting: Inline1Targeting,
    allTests: Inline1Test[],
    userDeviceType: UserDeviceType,
    contributionsOnlyCountries: string[] = [],
): Inline1TestSelection | null => {
    return selectBestTest(targeting, allTests, userDeviceType, contributionsOnlyCountries);
};
