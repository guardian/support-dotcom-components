import { getTreatmentsRequestPayloadToGateType } from '../../libPure';
import type { GetTreatmentsRequestPayload } from '../../types';

describe('getTreatmentsRequestPayloadToGateType (special cases)', () => {
    it('We do not show the gate on some specific article urls', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'www.theguardian.com/tips', // <-[] tested]
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true,
            showDefaultGate: 'mandatory',
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });

    it('Not all pages are eligible for gate display. Invalid content type', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'www.theguardian.com/tips',
            editionId: 'UK',
            contentType: 'InvalidContentType', // <- [tested]
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true,
            showDefaultGate: 'mandatory',
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });

    it('Not all pages are eligible for gate display. Invalid section', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'www.theguardian.com/tips',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'about', // <- tested
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true,
            showDefaultGate: 'mandatory',
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });

    it('Not all pages are eligible for gate display. Invalid tagId', () => {
        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'www.theguardian.com/tips',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['info/newsletter-sign-up'], // <- [tested]
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true,
            showDefaultGate: 'mandatory',
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('None');
    });

    it('payload.shouldServeDismissible overrides everything else (part 1)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true, // <- [tested]
            showDefaultGate: 'mandatory', // <- [tested]
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('payload.shouldServeDismissible overrides everything else (part 2)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: true, // <- [tested]
            showDefaultGate: 'dismissible', // <- [tested]
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('Staff testing gate feature (part 1)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: 'mandatory', // <- [tested]
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('GuMandatory');
    });

    it('Staff testing gate feature (part 2)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
            mvtId: 350001,
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: 'dismissible', // <- [tested]
            gateDisplayCount: 0,
            hideSupportMessagingTimestamp: undefined,
            isInAuxiaControlGroup: false,
        };
        const now = 1756568322187; // current time in milliseconds since epoch
        const gateType = getTreatmentsRequestPayloadToGateType(payload, now, true);
        expect(gateType).toStrictEqual('GuDismissible');
    });
});
