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
    it('non-ROW countries other than the UK use the 35% share', () => {
        expect(isGuardianAudienceShare(buildPayload('US', 250001))).toBe(false);
        expect(isGuardianAudienceShare(buildPayload('US', 450001))).toBe(true);
    });

    it('International/ROW countries use the full share', () => {
        expect(isGuardianAudienceShare(buildPayload('BR', 1_000_000))).toBe(false);
    });

    it('UK uses the reduced 20% share', () => {
        expect(isGuardianAudienceShare(buildPayload('GB', 200000))).toBe(false);
        expect(isGuardianAudienceShare(buildPayload('GB', 200001))).toBe(true);
        expect(isGuardianAudienceShare(buildPayload('GB', 250001))).toBe(true);
    });

    it('politically sensitive countries remain in the Guardian share', () => {
        expect(isGuardianAudienceShare(buildPayload('AF', 1))).toBe(true);
        expect(isGuardianAudienceShare(buildPayload('BY', 1_000_000))).toBe(true);
    });
});
