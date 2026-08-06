import { isAuxiaAudienceShare } from '../libPure';
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

describe('isAuxiaAudienceShare', () => {
    it('non-UK countries use the 35% share', () => {
        expect(isAuxiaAudienceShare(buildPayload('US', 250001))).toBe(true);
        expect(isAuxiaAudienceShare(buildPayload('US', 350000))).toBe(true);
        expect(isAuxiaAudienceShare(buildPayload('US', 350001))).toBe(false);
        expect(isAuxiaAudienceShare(buildPayload('US', 450001))).toBe(false);
    });

    it('UK uses the reduced 20% share', () => {
        expect(isAuxiaAudienceShare(buildPayload('GB', 1))).toBe(true);
        expect(isAuxiaAudienceShare(buildPayload('GB', 200000))).toBe(true);
        expect(isAuxiaAudienceShare(buildPayload('GB', 200001))).toBe(false);
        expect(isAuxiaAudienceShare(buildPayload('GB', 250001))).toBe(false);
    });
});
