import { staffTestConditionToDefaultGate } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

it('staffTestConditionToDefaultGate', () => {
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
    };
    expect(staffTestConditionToDefaultGate(payload1)).toBe('None');

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
    };
    expect(staffTestConditionToDefaultGate(payload2)).toBe('GuDismissible');

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
    };
    expect(staffTestConditionToDefaultGate(payload3)).toBe('GuDismissible');

    const payload4: GetTreatmentsRequestPayload = {
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
        showDefaultGate: 'mandatory',
        gateDisplayCount: 0,
    };
    expect(staffTestConditionToDefaultGate(payload4)).toBe('GuMandatory');
});
