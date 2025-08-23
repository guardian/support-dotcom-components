import {
    articleIdentifierIsAllowed,
    decideGateTypeNoneOrDismissible,
    decideGuGateTypeNonConsentedIreland,
    gtrpIsOverridingConditionShowDismissibleGate,
    gtrpIsStaffTestConditionShowDefaultGate,
    gtrpPageIsEligibleForGateDisplay,
    isValidContentType,
    isValidSection,
    isValidTagIds,
    mvtIdIsAuxiaAudienceShare,
    staffTestConditionToDefaultGate,
} from './libPure';
import type { GateType, GetTreatmentsRequestPayload } from './types';

// --------------------------------------------------------
// Pure Functions
// --------------------------------------------------------

export const getTreatmentsRequestPayloadToGateType = (
    payload: GetTreatmentsRequestPayload,
): GateType => {
    // This function is a pure function (without any side effects) which gets the body
    // of a '/auxia/get-treatments' request and returns the correct '
    // It was introduced to separate the choice of the gate from it's actual build,
    // which in the case of Auxia, requires an API call, but more importantly to
    // encapsulate and more logically test the logic of gate selection.

    if (!gtrpPageIsEligibleForGateDisplay(payload)) {
        // August 23rd: this check should return true because we are performing
        // a similar check client side to reduce traffic to SDC
        return 'None';
    }

    // --------------------------------------------------------------
    // If body.shouldServeDismissible (boolean) is true
    // which at the moment is controlled by utm_source=newsshowcase,
    // (exposed as DRC:decideShouldServeDismissible), and

    if (gtrpIsOverridingConditionShowDismissibleGate(payload)) {
        return 'GuDismissible';
    }

    // --------------------------------------------------------------
    // The attribute showDefaultGate overrides any other behavior

    if (gtrpIsStaffTestConditionShowDefaultGate(payload)) {
        return staffTestConditionToDefaultGate(payload);
    }

    // We check page metada to comply with Guardian policies.
    // If the policies are not met, then we do not display a gate
    // Note that at the time these lines are written (Aug 13th 2025),
    // these checks are also performed client side, but those client side checks
    // might be decommissioned in the future.

    if (
        !isValidContentType(payload.contentType) ||
        !isValidSection(payload.sectionId) ||
        !isValidTagIds(payload.tagIds) ||
        !articleIdentifierIsAllowed(payload.articleIdentifier)
    ) {
        return 'None';
    }

    // --------------------------------------------------------------
    // Then, we need to check whether we are in Ireland ot not. If we are in Ireland
    // as a consequence of the great Ireland opening of May 2025 (tm), we send the entire
    // traffic (consented or not consented) to Auxia. (For privacy vigilantes reading this,
    // Auxia is not going to process non consented traffic for targetting.)

    if (payload.countryCode === 'IE') {
        if (mvtIdIsAuxiaAudienceShare(payload.mvtId)) {
            return 'Auxia';
        } else {
            return decideGuGateTypeNonConsentedIreland(
                payload.dailyArticleCount,
                payload.gateDisplayCount,
            );
        }
    }

    // --------------------------------------------------------------
    // Then, we check whether the call is from the Auxia audience or the non Auxia audience.
    // If it is from the non Auxia audience, then we follow the value of
    // should_show_legacy_gate_tmp to decide whether to return a default gate or not.

    // If it is from the Auxia audience, then  move to the next section

    // Note that "Auxia audience" and "non Auxia audience" are concepts from the way the audience
    // was split between 35% expose to the Auxia gate and 65% being shown the default GU gate
    // That split used to be done client side, but it's now been moved to SDC and is driven by
    // `mvtIdIsAuxiaAudienceShare`.

    if (!mvtIdIsAuxiaAudienceShare(payload.mvtId)) {
        if (payload.should_show_legacy_gate_tmp) {
            return decideGateTypeNoneOrDismissible(payload.gateDismissCount);
        } else {
            return 'None';
        }
    }

    // --------------------------------------------------------------
    // Auxia share of the audience (outside Ireland)

    return 'Auxia';
};
