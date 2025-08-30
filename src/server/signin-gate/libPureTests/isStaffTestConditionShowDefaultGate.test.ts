import { isStaffTestConditionShowDefaultGate } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

it('isStaffTestConditionShowDefaultGate', () => {
    const payload1: GetTreatmentsRequestPayload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 3,
        articleIdentifier: 'sample: article identifier',
        editionId: 'UK',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'GB',
        mvtId: 250001,
        should_show_legacy_gate_tmp: true,
        hasConsented: true,
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: undefined,
    };
    expect(isStaffTestConditionShowDefaultGate(payload1)).toBe(false);

    const payload2: GetTreatmentsRequestPayload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 3,
        articleIdentifier: 'sample: article identifier',
        editionId: 'UK',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'GB',
        mvtId: 450001,
        should_show_legacy_gate_tmp: true,
        hasConsented: true,
        shouldServeDismissible: true,
        showDefaultGate: 'true',
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: undefined,
    };
    expect(isStaffTestConditionShowDefaultGate(payload2)).toBe(true);

    const payload3: GetTreatmentsRequestPayload = {
        browserId: 'sample',
        isSupporter: false,
        dailyArticleCount: 3,
        articleIdentifier: 'sample: article identifier',
        editionId: 'UK',
        contentType: 'Article',
        sectionId: 'uk-news',
        tagIds: ['type/article'],
        gateDismissCount: 0,
        countryCode: 'GB',
        mvtId: 450001,
        should_show_legacy_gate_tmp: true,
        hasConsented: true,
        shouldServeDismissible: true,
        showDefaultGate: 'dismissible',
        gateDisplayCount: 0,
        hideSupportMessagingTimestamp: undefined,
    };
    expect(isStaffTestConditionShowDefaultGate(payload3)).toBe(true);
});
