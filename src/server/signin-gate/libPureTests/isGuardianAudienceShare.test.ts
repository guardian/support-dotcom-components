import { isGuardianAudienceShare } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

const buildPayload = (countryCode: string, mvtId: number): GetTreatmentsRequestPayload => ({
    browserId: 'sample',
    isSupporter: false,
    dailyArticleCount: 3,
    articleIdentifier: 'sample: article identifier',
    editionId: 'UK',
    contentType: 'Article',
    sectionId: 'uk-news',
    tagIds: ['type/article'],
    gateDismissCount: 0,
    countryCode,
    mvtId,
    should_show_legacy_gate_tmp: true,
    hasConsented: true,
    shouldServeDismissible: false,
    showDefaultGate: undefined,
    gateDisplayCount: 0,
    hideSupportMessagingTimestamp: undefined,
});

describe('isGuardianAudienceShare', () => {
    it('non-UK countries use the 35% share', () => {
        expect(isGuardianAudienceShare(buildPayload('US', 250001))).toBe(false);
        expect(isGuardianAudienceShare(buildPayload('US', 450001))).toBe(true);
    });

    it('UK uses the reduced 20% share', () => {
        expect(isGuardianAudienceShare(buildPayload('GB', 200000))).toBe(false);
        expect(isGuardianAudienceShare(buildPayload('GB', 200001))).toBe(true);
        expect(isGuardianAudienceShare(buildPayload('GB', 250001))).toBe(true);
    });
});
