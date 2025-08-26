import { gtrpIsGuardianAudienceShare } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

it('gtrpIsGuardianAudienceShare', () => {
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
        shouldServeDismissible: false,
        showDefaultGate: undefined,
        gateDisplayCount: 0,
    };

    expect(gtrpIsGuardianAudienceShare(payload1)).toBe(false);
    expect(gtrpIsGuardianAudienceShare(payload2)).toBe(true);
});
