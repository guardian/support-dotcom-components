import { getTreatmentsRequestPayloadToGateType } from '../../libPure';
import type { GetTreatmentsRequestPayload } from '../../types';

describe('getTreatmentsRequestPayloadToGateType (enableAuxia switch)', () => {
    const now = Date.now();

    it('should use Guardian logic when enableAuxia is false', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 100000, // Within Auxia audience (1-350,000)            mvtId: 100000, // Within Auxia audience (1-350,000)
            should_show_legacy_gate_tmp: false,
            hasConsented: true, // User has consented            hasConsented: true, // User has consented
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, false);

        // When Auxia is disabled, should use Guardian dismissible gate
        expect(gateType).toBe('GuDismissible');
    });

    it('should use Auxia logic when enableAuxia is true and user qualifies', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 100000, // Within Auxia audience (1-350,000)
            should_show_legacy_gate_tmp: false,
            hasConsented: true, // User has consented
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);

        // When Auxia is enabled and user qualifies, should use Auxia
        expect(gateType).toBe('AuxiaAPI');
    });

    it('should return None when enableAuxia is false and article count is low', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 2, // Less than 3
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 100000,
            should_show_legacy_gate_tmp: false,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, false);
        expect(gateType).toBe('None');
    });

    it('should return None when enableAuxia is false and gateDisplayCount >= 5', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 100000,
            should_show_legacy_gate_tmp: false,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 5, // >= 5
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, false);
        expect(gateType).toBe('None');
    });

    it('should return None when enableAuxia is false and hideSupportMessaging is set', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 100000,
            should_show_legacy_gate_tmp: false,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: now - 1000, // Less than 30 days
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, false);
        expect(gateType).toBe('None');
    });

    it('should use Auxia for Ireland when enableAuxia is true and user has consented', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'IE', // Ireland
            mvtId: 100000,
            should_show_legacy_gate_tmp: false,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toBe('AuxiaAPI');
    });

    it('should use Guardian logic for Ireland when enableAuxia is false', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 5,
            articleIdentifier: 'www.theguardian.com/test/article',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'world',
            tagIds: ['world/news'],
            gateDismissCount: 0,
            countryCode: 'IE', // Ireland
            mvtId: 100000,
            should_show_legacy_gate_tmp: false,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };

        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, false);
        // Falls back to Guardian logic even for Ireland
        expect(gateType).toBe('GuDismissible');
    });
});
