import { getTreatmentsRequestPayloadToGateType } from '../../libPure';
import type { GetTreatmentsRequestPayload } from '../../types';

describe('getTreatmentsRequestPayloadToGateType (ireland)', () => {
    it('logic.md [07]', () => {
        // [07] (copy from logic.md)
        //
        // prerequisites:
        // - Ireland
        // - user has consented
        //
        // effects:
        // - Auxia drives the gate

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'IE', // <- [Ireland]
            mvtId: 250_000, // <- [Auxia]
            should_show_legacy_gate_tmp: true,
            hasConsented: true, // <- [consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
        expect(gateType).toStrictEqual('AuxiaAPI');
    });

    it('logic.md [05], low page views', () => {
        // [05] (copy from logic.md)
        //
        // prerequisites:
        // - Ireland
        // - user has NOT consented
        //
        // effects:
        // - Notify Auxia for analytics
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - 3x dismissal, then mandatory

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 2,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 7,
            countryCode: 'IE', // <- [Ireland]
            mvtId: 250_000, // <- [Auxia]
            should_show_legacy_gate_tmp: true,
            hasConsented: false, // <- [not consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 8,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenNone');
    });

    it('logic.md [05], first gate displays', () => {
        // [05] (copy from logic.md)
        //
        // prerequisites:
        // - Ireland
        // - user has NOT consented
        //
        // effects:
        // - Notify Auxia for analytics
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - 3x dismissal, then mandatory

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 1,
            countryCode: 'IE', // <- [Ireland]
            mvtId: 250_000, // <- [Auxia]
            should_show_legacy_gate_tmp: true,
            hasConsented: false, // <- [not consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 1,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenGuDismissible');
    });

    it('logic.md [05], latter gate displays', () => {
        // [05] (copy from logic.md)
        //
        // prerequisites:
        // - Ireland
        // - user has NOT consented
        //
        // effects:
        // - Notify Auxia for analytics
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - 3x dismissal, then mandatory

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 5,
            countryCode: 'IE', // <- [Ireland]
            mvtId: 250_000, // <- [Auxia]
            should_show_legacy_gate_tmp: true,
            hasConsented: false, // <- [not consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 5,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenGuMandatory');
    });

    // TODO: write the tests for
    // [06] (copy from logic.md)
    //
    // prerequisites:
    // - Ireland
    // - Is Guardian share of the audience
    // - user has NOT consented
    //
    // effects:
    // - Notify Auxia for analytics
    // - Guardian drives the gate:
    //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
    //   - No gate display the first 3 page views
    //   - 3x dismissal, then mandatory
});
