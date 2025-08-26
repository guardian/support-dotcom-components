import { getTreatmentsRequestPayloadToGateType } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

describe('getTreatmentsRequestPayloadToGateType', () => {
    it('test shouldServeDismissible and showDefaultGate:mandatory interacting together', () => {
        const body: GetTreatmentsRequestPayload = {
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('test shouldServeDismissible and showDefaultGate:dismissible interacting together', () => {
        const body: GetTreatmentsRequestPayload = {
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('showDefaultGate:mandatory overrides any other behavior', () => {
        const body: GetTreatmentsRequestPayload = {
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuMandatory');
    });

    it('showDefaultGate:dismissible overrides any other behavior', () => {
        const body: GetTreatmentsRequestPayload = {
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('non consenting users in Ireland, low dailyArticleCount', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 0,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'IE',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenNone');
    });

    it('non consenting users in Ireland, low dailyArticleCount=3 (start of gate showing)', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'sample: article identifier',
            editionId: 'IE',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('non consenting users in Ireland, low gateDisplayCount: 1 (still dismissible)', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 10,
            articleIdentifier: 'sample: article identifier',
            editionId: 'IE',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'IE',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true,
            hasConsented: false,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 1,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenGuDismissible');
    });

    it('non consenting users in Ireland, low gateDisplayCount: 3 (mandatory from now on)', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 10,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'IE',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true, // <- In Ireland, this value is irrelevant, since we count dailyArticleCount and gateDisplayCount
            hasConsented: false,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 3,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenGuMandatory');
    });

    it('non consenting users in Ireland, low gateDisplayCount: 4 (mandatory from now on)', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 10,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'IE',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true, // <- In Ireland, this value is irrelevant, since we count dailyArticleCount and gateDisplayCount
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 4,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenGuMandatory');
    });

    it('invalid attribute: contentType', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'sample: article identifier',
            editionId: 'UK',
            contentType: 'Showcase', // <- [tested]
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 200_000, // <- [needs to be in the Auxia Audience share]
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: sectionId', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'sample: article identifier',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'about', // <- [tested] `about` is an invalid section
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 200_000, // <- [needs to be in the Auxia Audience share]
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: tagIds', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'sample: article identifier',
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['info/newsletter-sign-up', 'another-tag'], // <- [tested] `info/newsletter-sign-up` is forbidden
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 200_000, // <- [needs to be in the Auxia Audience share]
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: articleIdentifier', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3,
            articleIdentifier: 'www.theguardian.com/tips', // <- [tested] We have a specific interdiction on that
            editionId: 'UK',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 0,
            countryCode: 'GB',
            mvtId: 200_000, // <- [tested: needs to be in the Auxia Audience share]
            should_show_legacy_gate_tmp: true,
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('None');
    });

    it('should return a gate in the case of the Giulia experiment', () => {
        const body: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 3, // <- [tested]
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
            showDefaultGate: undefined,
            gateDisplayCount: 0,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(body);
        expect(gateType).toStrictEqual('GuDismissible');
    });
});
