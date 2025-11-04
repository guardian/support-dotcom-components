import { getTreatmentsRequestPayloadToGateType, hideSupportMessagingHasOverride } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

it('hideSupportMessagingHasOverride, undefined', () => {
    // [03] (copy from logic.md)
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

    const payload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 0,
        articleIdentifier: 'sample: article identifier',
        editionId: 'GB',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: undefined, // <- tested: no information provided
    };

    const now = 1756568890120; // 2025-08-30 16:48:10 +0100
    expect(hideSupportMessagingHasOverride(payload, now)).toBe(false);
});

it('hideSupportMessagingHasOverride, defined, more than 30 days ago', () => {
    // [03] (copy from logic.md)
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

    const payload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 0,
        articleIdentifier: 'sample: article identifier',
        editionId: 'GB',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: 1674172805000, // <- tested: 2023-01-20T00:00:05Z
    };

    const now = 1756568890120; // 2025-08-30 16:48:10 +0100 (more than 30 days)
    expect(hideSupportMessagingHasOverride(payload, now)).toBe(false);
});

it('hideSupportMessagingHasOverride, defined, less than 30 days ago', () => {
    // [03] (copy from logic.md)
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

    const payload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 0,
        articleIdentifier: 'sample: article identifier',
        editionId: 'GB',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: 1755644400000, // <- tested: 2025-08-20 00:00:00 +0100
    };

    const now = 1756568890120; // 2025-08-30 16:48:10 +0100 (less than 30 days)
    expect(hideSupportMessagingHasOverride(payload, now)).toBe(true);
});

it('hideSupportMessagingHasOverride, defined, value in the future', () => {
    const payload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 0,
        articleIdentifier: 'sample: article identifier',
        editionId: 'GB',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: 1756722953000, // <- tested: 2025-09-01 11:35:53 +0100 (future value relatively to now)
    };

    const now = 1756568890120; // 2025-08-30 16:48:10 +0100 (less than 30 days)
    expect(hideSupportMessagingHasOverride(payload, now)).toBe(false);
});

// We also test getTreatmentsRequestPayloadToGateType

it('getTreatmentsRequestPayloadToGateType, without override', () => {
    // [03] (copy from logic.md)
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
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 1,
        hideSupportMessagingTimestamp: undefined, // <- no override
    };
    const now = 1756568322187; // current time in milliseconds since epoch
    const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
    expect(gateType).toStrictEqual('GuDismissible');
});

it('getTreatmentsRequestPayloadToGateType, with override', () => {
    // [03] (copy from logic.md)
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
        countryCode: 'FR', // <- [outside ireland]
        mvtId: 450_000, // <- [Guardian]
        should_show_legacy_gate_tmp: true,
        hasConsented: true, // <- [consented]
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 1,
        hideSupportMessagingTimestamp: 1755644400000, // <- tested: 2025-08-20 00:00:00 +0100
    };
    const now = 1756568890120; // 2025-08-30 16:48:10 +0100 (less than 30 days)
    const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
    expect(gateType).toStrictEqual('None');
});

it('getTreatmentsRequestPayloadToGateType, with override, ireland with Auxia Analytics', () => {
    // [04] (copy from logic.md)
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
        hideSupportMessagingTimestamp: 1755644400000, // <- tested: 2025-08-20 00:00:00 +0100
    };
    const now = 1756568890120; // 2025-08-30 16:48:10 +0100 (less than 30 days)
    const gateType = getTreatmentsRequestPayloadToGateType(payload, now);
    expect(gateType).toStrictEqual('AuxiaAnalyticsThenNone'); // Instead of AuxiaAnalyticsThenGuDismissible
});
