import { getTreatmentsRequestPayloadToGateType } from '../../libPure';
import type { GetTreatmentsRequestPayload } from '../../types';

describe('getTreatmentsRequestPayloadToGateType', () => {
    it('logic.md [03], low article count', () => {
        // [02] (copy from logic.md)
        //
        // prerequisites:
        // - World without Ireland
        // - Is Guardian share of the audience
        // - user has consented
        //
        // effects:
        // - No Auxia notification
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - Dismissible gates then no gate after 5 dismisses

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 0,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'US', // <- [outside Auxia roll out]
            mvtId: 450_000, // <- [Guardian]
            should_show_legacy_gate_tmp: true,
            hasConsented: true, // <- [consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });
    it('logic.md [03], first dismissible gates', () => {
        // [02] (copy from logic.md)
        //
        // prerequisites:
        // - World without Ireland
        // - Is Guardian share of the audience
        // - user has consented
        //
        // effects:
        // - No Auxia notification
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - Dismissible gates then no gate after 5 dismisses

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'US', // <- [outside Auxia roll out]
            mvtId: 450_000, // <- [Guardian]
            should_show_legacy_gate_tmp: true,
            hasConsented: true, // <- [consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 1,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('GuDismissible');
    });
    it('logic.md [03], high gate dismiss count', () => {
        // [02] (copy from logic.md)
        //
        // prerequisites:
        // - World without Ireland
        // - Is Guardian share of the audience
        // - user has consented
        //
        // effects:
        // - No Auxia notification
        // - Guardian drives the gate:
        //   - No gate for 30 days after a single contribution event (gu_hide_support_messaging; hideSupportMessagingTimestamp)
        //   - No gate display the first 3 page views
        //   - Dismissible gates then no gate after 5 dismisses

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 6,
            countryCode: 'US', // <- [outside Auxia roll out]
            mvtId: 450_000, // <- [Guardian]
            should_show_legacy_gate_tmp: true,
            hasConsented: true, // <- [consented]
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 7,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });

    it('logic.md [01], unconsented users in US still notify Auxia when low article count', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 1,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'US',
            mvtId: 450_000,
            should_show_legacy_gate_tmp: true,
            hasConsented: false,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187;
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenNone');
    });

    it('logic.md [01], unconsented users in US still notify Auxia when gate is dismissible', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'US',
            mvtId: 450_000,
            should_show_legacy_gate_tmp: true,
            hasConsented: false,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 1,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187;
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenGuDismissible');
    });

    it('logic.md [01], unconsented users in EU still notify Auxia when gate is suppressed', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 6,
            countryCode: 'DE',
            mvtId: 450_000,
            should_show_legacy_gate_tmp: true,
            hasConsented: false,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 7,
            hideSupportMessagingTimestamp: undefined,
        };
        const now = 1756568322187;
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('AuxiaAnalyticsThenNone');
    });
});
