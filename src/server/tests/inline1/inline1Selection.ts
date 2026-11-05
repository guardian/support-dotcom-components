import { inTargetedCountry, passesContributionsOnlyTargeting } from '../../../dotcom';
import type {
    Inline1Targeting,
    Inline1Test,
    Inline1Variant,
    UserDeviceType,
} from '../../../shared/types';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import type { MParticleProfile } from '../../lib/mParticle';
import type { TestVariant } from '../../lib/params';
import {
    audienceMatches,
    consentStatusMatches,
    correctSignedInStatus,
    deviceTypeMatches,
    matchesMParticleAudience,
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

export const selectBestTest = async (
    targeting: Inline1Targeting,
    allTests: Inline1Test[],
    userDeviceType: UserDeviceType,
    getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    contributionsOnlyCountries: string[] = [],
    now: Date = new Date(),
): Promise<Inline1TestSelection | null> => {
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
            consentStatusMatches(hasConsented, consentStatus) &&
            (await matchesMParticleAudience(
                getMParticleProfile,
                test.mParticleAudience ?? undefined,
            ))
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
    getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    contributionsOnlyCountries: string[] = [],
    previewTestVariant?: TestVariant,
): Promise<Inline1TestSelection | null> => {
    if (previewTestVariant) {
        const test = allTests.find(
            (candidate) =>
                candidate.name.toLowerCase() === previewTestVariant.testName.toLowerCase(),
        );
        const variant = test?.variants.find(
            (candidate) =>
                candidate.name.toLowerCase() === previewTestVariant.variantName.toLowerCase(),
        );

        return Promise.resolve(test && variant ? { test, variant } : null);
    }

    return selectBestTest(
        targeting,
        allTests,
        userDeviceType,
        getMParticleProfile,
        contributionsOnlyCountries,
    );
};
