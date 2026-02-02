// --------------------------------------------------------
// Pure Functions
// --------------------------------------------------------

import type {
    AuxiaAPIGetTreatmentsRequestPayload,
    AuxiaAPILogTreatmentInteractionRequestPayload,
    GateType,
    GetTreatmentsRequestPayload,
    ProxyGetTreatmentsAnswerData,
    UserTreatment,
    UserTreatmentsEnvelop,
} from './types';

export const buildGetTreatmentsRequestPayload = (
    projectId: string,
    browserId: string,
    isSupporter: boolean,
    dailyArticleCount: number,
    articleIdentifier: string,
    editionId: string,
    countryCode: string,
    hasConsented: boolean,
    shouldServeDismissible: boolean,
): AuxiaAPIGetTreatmentsRequestPayload => {
    // For the moment we are hard coding the data provided in contextualAttributes and surfaces.
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        contextualAttributes: [
            {
                key: 'is_supporter',
                boolValue: isSupporter,
            },
            {
                key: 'daily_article_count',
                integerValue: dailyArticleCount,
            },
            {
                key: 'article_identifier',
                stringValue: articleIdentifier,
            },
            {
                key: 'edition',
                stringValue: editionId,
            },
            {
                key: 'country_key',
                stringValue: countryCode,
            },
            {
                key: 'has_consented',
                boolValue: hasConsented,
            },
            {
                key: 'should_not_serve_mandatory',
                boolValue: shouldServeDismissible,
            },
        ],
        surfaces: [
            {
                surface: 'ARTICLE_PAGE',
                maximumTreatmentCount: 1,
            },
        ],
        languageCode: 'en-GB',
    };
};

export const guDismissibleUserTreatment = (): UserTreatment => {
    // The contract we have with the client is that a gate is dismissible if the second_cta_name
    // is not empty. Otherwise the gate is Mandatory

    const title = 'This is not a paywall';
    const subtitle = 'Enter your email to keep reading - for free. It takes just 30 seconds';
    const body =
        'We’re committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to keep our journalism free for all.';
    const secondCtaName = 'I’ll do it later';
    const treatmentContent = {
        title,
        subtitle,
        body,
        first_cta_name: 'Create an account',
        first_cta_link: 'https://profile.theguardian.com/register?',
        second_cta_name: secondCtaName,
        second_cta_link: 'https://profile.theguardian.com/signin?',
    };
    const treatmentContentEncoded = JSON.stringify(treatmentContent);
    return {
        treatmentId: 'default-treatment-id',
        treatmentTrackingId: 'default-treatment-tracking-id',
        rank: '1',
        contentLanguageCode: 'en-GB',
        treatmentContent: treatmentContentEncoded,
        treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
        surface: 'ARTICLE_PAGE',
    };
};

export const guMandatoryUserTreatment = (): UserTreatment => {
    // The contract we have with the client is that a gate is dismissible if the second_cta_name
    // is not empty. Otherwise the gate is Mandatory

    const title = 'Sorry for the interruption';
    const subtitle = "Once you are signed in, we'll bring you back here shortly";
    const body =
        'We’re committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to keep our journalism free for all.';
    const treatmentContent = {
        title,
        subtitle,
        body,
        first_cta_name: 'Create an account',
        first_cta_link: 'https://profile.theguardian.com/register?',
        second_cta_name: '', // empty string here makes the gate mandatory
        second_cta_link: '',
    };
    const treatmentContentEncoded = JSON.stringify(treatmentContent);
    return {
        treatmentId: 'default-treatment-id',
        treatmentTrackingId: 'default-treatment-tracking-id',
        rank: '1',
        contentLanguageCode: 'en-GB',
        treatmentContent: treatmentContentEncoded,
        treatmentType: 'NONDISMISSIBLE_SIGN_IN_GATE',
        surface: 'ARTICLE_PAGE',
    };
};

export const isValidContentType = (contentType: string): boolean => {
    const validTypes = ['Article'];
    return validTypes.includes(contentType);
};

export const isValidSection = (sectionId: string): boolean => {
    const invalidSections = [
        'about',
        'info',
        'membership',
        'help',
        'guardian-live-australia',
        'gnm-archive',
        'thefilter',
    ];
    return !invalidSections.includes(sectionId);
};

export const isValidTagIds = (tagIds: string[]): boolean => {
    const invalidTagIds = ['info/newsletter-sign-up'];
    // Check that no tagId is in the invalidTagIds list.
    return !tagIds.some((tagId: string): boolean => invalidTagIds.includes(tagId));
};

export const userTreatmentsEnvelopToProxyGetTreatmentsAnswerData = (
    envelop: UserTreatmentsEnvelop,
): ProxyGetTreatmentsAnswerData | undefined => {
    // Note the small difference between ProxyGetTreatmentsAnswerData and UserTreatmentsEnvelop
    // In the case of ProxyGetTreatmentsAnswerData, we have an optional userTreatment field,
    // instead of an array of userTreatments.
    //
    // UserTreatmentsEnvelop is generated by either Auxia or us here in SDC, and is
    // modelled after Auxia's own schema.
    //
    // ProxyGetTreatmentsAnswerData is the answer from the Proxy
    //
    // This is to reflect the what the client expect semantically.

    return {
        responseId: envelop.responseId,
        userTreatment: envelop.userTreatments[0],
    };
};

export const buildLogTreatmentInteractionRequestPayload = (
    projectId: string,
    browserId: string,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): AuxiaAPILogTreatmentInteractionRequestPayload => {
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        treatmentTrackingId,
        treatmentId,
        surface,
        interactionType,
        interactionTimeMicros,
        actionName,
    };
};

export const articleIdentifierIsAllowed = (articleIdentifier: string): boolean => {
    // This function was introduced to handle the specific request of not showing a gate for
    // this url: https://www.theguardian.com/tips
    // articleIdentifier are given to the end point under the following format:
    // - 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
    // - 'www.theguardian.com/tips'

    // For the moment we are only going to check for that one string, we will refactor
    // if more come in in the future

    const denyPrefixes = [
        'www.theguardian.com/tips',
        'www.theguardian.com/help/ng-interactive/2017/mar/17/contact-the-guardian-securely',
    ];

    return !denyPrefixes.some((denyIdentifer) => articleIdentifier.startsWith(denyIdentifer));
};

export const mvtIdIsAuxiaAudienceShare = (mvtId: number): boolean => {
    /*
        In May 2025, we decided that we would decommission the old / previous definition
        of the Auxia share of the audience, which was done using a client side defined AB test,
        by which the "first" 35% of the audience is sent to Auxia, and the rest (65%) split between
        "SignInGateMainVariant" and "SignInGateMainControl"
        (
            https://github.com/guardian/dotcom-rendering/blob/d6e44406cffb362c99d5734f6e82f6e664682da8/dotcom-rendering/src/experiments/tests/auxia-sign-in-gate.ts
        )

        ... and move to those shares being controlled by SDC and in particular SDC's default gate
        taking over the old gate hard coded into DCR.

        To maintain invariance of how the cohorts are defined, SDC, must be able to convert a
        mvtId into a share of audience. Passing the mvtId to the GetTreatment call was done in these two PRs:

        https://github.com/guardian/dotcom-rendering/pull/13938
        https://github.com/guardian/dotcom-rendering/pull/13941

        In particular we must be able to take a mvtId and simply return
        a boolean indicating whether or not it is in the first 35% of the audience. This is what this function
        does.

        This is the function that needs to be modified when we want to increase the share of the
        audience given to the Auxia experiment in the future.
    */

    // The MVT calculator is very useful: https://ab-tests.netlify.app

    // The Auxia experiment is 35% audience with 0% offset.

    // The value numbers we are interested in are between 1 and 350_000 [1]
    // (essentially the first 35% of the total of 1_000_000 possible values for mvtId)

    // [1] Interestingly, 0 is not considered a valid mvtId number.

    return mvtId > 0 && mvtId <= 350_000;
};

export const isAuxiaAudienceShare = (payload: GetTreatmentsRequestPayload): boolean => {
    return mvtIdIsAuxiaAudienceShare(payload.mvtId);
};

export const isGuardianAudienceShare = (payload: GetTreatmentsRequestPayload): boolean => {
    return !isAuxiaAudienceShare(payload);
};

export const pageMetaDataIsEligibleForGateDisplay = (
    contentType: string,
    sectionId: string,
    tagIds: string[],
): boolean => {
    return isValidContentType(contentType) && isValidSection(sectionId) && isValidTagIds(tagIds);
};

export const payloadMetadataIsEligibleForGateDisplay = (
    payload: GetTreatmentsRequestPayload,
): boolean => {
    return pageMetaDataIsEligibleForGateDisplay(
        payload.contentType,
        payload.sectionId,
        payload.tagIds,
    );
};

export const isOverridingConditionShowDismissibleGate = (
    payload: GetTreatmentsRequestPayload,
): boolean => {
    return payload.shouldServeDismissible;
};

export const isStaffTestConditionShowDefaultGate = (
    payload: GetTreatmentsRequestPayload,
): boolean => {
    return payload.showDefaultGate !== undefined;
};

export const staffTestConditionToDefaultGate = (payload: GetTreatmentsRequestPayload): GateType => {
    if (payload.showDefaultGate === undefined) {
        return 'None';
    }
    if (payload.showDefaultGate == 'mandatory') {
        return 'GuMandatory';
    }
    // values 'true' or 'dismissible'
    return 'GuDismissible';
};

export const userHasConsented = (payload: GetTreatmentsRequestPayload): boolean => {
    return payload.hasConsented;
};

const inAuxiaControlGroup = (payload: GetTreatmentsRequestPayload): boolean =>
    payload.isInAuxiaControlGroup;

export const hideSupportMessagingHasOverride = (
    payload: GetTreatmentsRequestPayload,
    now: number,
): boolean => {
    // Purpose:
    // Return true if we have a hideSupportMessagingTimestamp and it's less than 30 days old

    // Parameters:
    //   - payload
    //   - now: current time in milliseconds since epoch
    //          (nb: We pass now instead of getting it within the body
    //           to make the function pure and testable)

    // Date: 1 September 2025
    //
    // The payload.hideSupportMessagingTimestamp, could be in the future,
    // this happens if the user has performed a recurring contribution.
    // We have guarded against that situation client side
    // https://github.com/guardian/dotcom-rendering/pull/14462
    // but also guard against it here.

    if (payload.hideSupportMessagingTimestamp === undefined) {
        return false;
    }
    if (!Number.isInteger(payload.hideSupportMessagingTimestamp)) {
        return false;
    }
    if (payload.hideSupportMessagingTimestamp > now) {
        return false;
    }
    const limit = 86400 * 30 * 1000; // milliseconds over 30 days
    return now - payload.hideSupportMessagingTimestamp < limit;
};

export const getTreatmentsRequestPayloadToGateType = (
    payload: GetTreatmentsRequestPayload,
    now: number,
    enableAuxia: boolean,
): GateType => {
    // now: current time in milliseconds since epoch
    // enableAuxia: channel switch to enable/disable Auxia integration

    // This function is a pure function (without any side effects) which gets the body
    // of a '/auxia/get-treatments' request and returns the correct GateType
    // It was introduced to separate the choice of the gate from it's actual build,
    // which in the case of Auxia, requires an API call, but more importantly to
    // encapsulate and more logically test the logic of gate selection.

    // --------------------------------------------------------------
    // We do not show the gate on some specific article urls

    if (!articleIdentifierIsAllowed(payload.articleIdentifier)) {
        return 'None';
    }

    // --------------------------------------------------------------
    // Not all pages are eligible for gate display.
    //
    // We are doing an identical check client side to
    // reduce traffic to SDC, so we should never actually return
    // from here.

    if (!payloadMetadataIsEligibleForGateDisplay(payload)) {
        return 'None';
    }

    // --------------------------------------------------------------
    // If payload.shouldServeDismissible (boolean) is true
    // which at the moment is controlled by utm_source=newsshowcase,
    // (exposed as DRC:decideShouldServeDismissible), then we serve
    // the dismissible gate

    if (isOverridingConditionShowDismissibleGate(payload)) {
        return 'GuDismissible';
    }

    // --------------------------------------------------------------
    // Staff testing gate feature

    if (isStaffTestConditionShowDefaultGate(payload)) {
        return staffTestConditionToDefaultGate(payload);
    }

    const isMandatoryRollout = payload.countryCode === 'IE' || payload.countryCode === 'NZ';
    const isDismissibleRollout = payload.countryCode === 'AU';

    // --------------------------------------------------------------
    // We now move to the normal behavior of the gate

    // Note that we should strive to meet the following conditions
    // 1. Use the logic.md file as the source of truth. In particular, and
    //    among other things, it's the first file to be modified when a
    //    request for change comes from the business.
    // 2. The logic.md file should try and have a structure that partition
    //    the space into mutually exclusive zones
    // 3. The below part of this function should try and reproduce the partitioning
    //    of the space. Therefore one and only one condition of the below conditions
    //    should correspond to a given payload.

    if (isMandatoryRollout && enableAuxia) {
        if (userHasConsented(payload) && !inAuxiaControlGroup(payload)) {
            // [04] (copy from logic.md)
            //
            // prerequisites:
            // - Ireland/NZ
            // - user has consented
            // - user not in auxia control group
            //
            // effects:
            // - Auxia drives the gate
            return 'AuxiaAPI';
        } else {
            // [05] (copy from logic.md)
            //
            // prerequisites:
            // - Ireland/NZ
            // - user has NOT consented or is in auxia control group
            //
            // effects:
            // - Notify Auxia for analytics
            // - Guardian drives the gate:
            //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
            //   - No gate display the first 3 page views
            //   - 3x dismissal, then mandatory
            if (hideSupportMessagingHasOverride(payload, now)) {
                return 'AuxiaAnalyticsThenNone';
            }
            if (payload.dailyArticleCount < 3) {
                return 'AuxiaAnalyticsThenNone';
            }
            if (payload.gateDismissCount < 3) {
                return 'AuxiaAnalyticsThenGuDismissible';
            } else {
                return 'AuxiaAnalyticsThenGuMandatory';
            }
        }
    }

    // World excluding Ireland/NZ
    if (
        enableAuxia &&
        userHasConsented(payload) &&
        (isDismissibleRollout || isAuxiaAudienceShare(payload)) &&
        !inAuxiaControlGroup(payload)
    ) {
        // We have consent for Auxia anduser is either:
        // - in a country where Auxia is rolled out to all eligible users (Australia)
        // or
        // - in the Auxia share of the audience
        return 'AuxiaAPI';
    } else {
        // [01, 03] (copy from logic.md)
        // Do not use Auxia
        if (hideSupportMessagingHasOverride(payload, now)) {
            return 'None';
        }
        if (payload.dailyArticleCount < 3) {
            return 'None';
        }
        if (payload.gateDisplayCount < 5) {
            return 'GuDismissible';
        } else {
            return 'None';
        }
    }
};
