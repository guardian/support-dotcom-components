// --------------------------------------------------------
// Types
// --------------------------------------------------------

export interface AuxiaAPIContextualAttributeString {
    key: string;
    stringValue: string;
}

export interface AuxiaAPIContextualAttributeBoolean {
    key: string;
    boolValue: boolean;
}

export interface AuxiaAPIContextualAttributeInteger {
    key: string;
    integerValue: number;
}

export type AuxiaAPIGenericContexualAttribute =
    | AuxiaAPIContextualAttributeString
    | AuxiaAPIContextualAttributeBoolean
    | AuxiaAPIContextualAttributeInteger;

export interface AuxiaAPISurface {
    surface: string;
    maximumTreatmentCount: number;
}

export interface ProxyGetTreatmentsAnswerData {
    responseId: string;
    userTreatment?: UserTreatment;
}

export interface AuxiaAPILogTreatmentInteractionRequestPayload {
    projectId: string;
    userId: string;
    treatmentTrackingId: string;
    treatmentId: string;
    surface: string;
    interactionType: string;
    interactionTimeMicros: number;
    actionName: string;
}

export interface UserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

export interface AuxiaAPIGetTreatmentsRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaAPIGenericContexualAttribute[];
    surfaces: AuxiaAPISurface[];
    languageCode: string;
}

export interface UserTreatmentsEnvelop {
    responseId: string;
    userTreatments: UserTreatment[];
}

export type ShowGateValues = 'true' | 'mandatory' | 'dismissible' | undefined;

export interface GetTreatmentsRequestPayload {
    browserId: string | undefined; // optional field, will not be sent by the client is user has not consented to personal data use.
    isSupporter: boolean;
    dailyArticleCount: number; // [1]
    articleIdentifier: string;
    editionId: string;
    contentType: string;
    sectionId: string;
    tagIds: string[];
    gateDismissCount: number;
    countryCode: string;
    mvtId: number;
    should_show_legacy_gate_tmp: boolean; // [2]
    hasConsented: boolean;
    shouldServeDismissible: boolean; // [3]
    showDefaultGate: ShowGateValues; // [4]
    gateDisplayCount: number; // [5]
}

// [1] articleIdentifier examples:
//  - 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
//  - 'www.theguardian.com/tips'

// [2] temporary attribute to help imminent rerouting of non Auxia audience share
// to SDC, but without requiring a
// full duplication of the client side logic into SDC.
// See https://github.com/guardian/dotcom-rendering/pull/13944
// for details.

// [3]
// date: 03rd July 2025
// If shouldServeDismissible, we should show a dismissible (not mandatory) gate.

// [4]

// date: 25rd July 2025
// author: Pascal

// In order to facilitate internal testing, this attribute, when defined, forces
// the display of a sign-in gate. The values 'true' and 'dismissible' displays the
// dismissible variant of the gu default gate, and the value 'mandatory' displays
// the mandatory variant of the gu default gate.

// Note that this attributes override the value of should_show_legacy_gate_tmp.

// [5] (comment group: 04f093f0)

// date: 11 Aug 2025
// author: Pascal

// gateDisplayCount was introduced to enrich the behavior of the default gate.
// That number represents the number of times the gate has been displayed, excluding the
// current rendering. Therefore the first time the number is 0.

// At the time these lines are written we want the experience for non consented users
// in Ireland, to be that the gates, as they display are (first line) corresponding
// to values of gateDisplayCount (second line)
//  -------------------------------------------------------------------------
// | dismissible | dismissible | dismissible | mandatory (remains mandatory) |
// |     0       |      1      |      2      |      3           etc          |
//  -------------------------------------------------------------------------

// For non consenting users outside ireland, the behavior doesn't change, we serve
// dismissible gates

export type GateType =
    | 'None' // [1]
    | 'GuDismissible' // [2]
    | 'GuMandatory' // [3]
    | 'Auxia' // [4]
    | 'AuxiaAnalyticThenNone' // [5]
    | 'AuxiaAnalyticThenGuDismissible' // [6]
    | 'AuxiaAnalyticThenGuMandatory'; // [7]

// [1] Signals no gate to display
// [2] Signals the Gu Dismissible gate
// [3] Signals the Gu Mandatory gate
// [4] Query the Auxia API and return the result to the client
// [5] Here, we query Auxia for analytics, but then show no gate
// [6] Here, we query Auxia for analytics but do not return the result and instead return the Gu Dismissible gate
// [7] Same as [5] but we return the Gu Mandatory gate
