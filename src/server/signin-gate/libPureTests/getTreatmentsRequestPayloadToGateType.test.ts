import { getTreatmentsRequestPayloadToGateType } from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

describe('getTreatmentsRequestPayloadToGateType', () => {
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
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
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('Ireland, Guardian share, consented, ', () => {
        // [02] (copy from logic.md)
        //
        // prerequisites:
        // - World without Ireland
        // - Is Guardian share of the audience
        // - user has consented
        //
        // effects:
        // - No Auxia notification
        // - Guardian drives the gate:
        // - No gate display the first 3 page views
        // - Gate: dismissible gates
        //        then no gate after 5 dismisses

        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('None');
    });

    it('non consenting users in Ireland, low dailyArticleCount=3 (start of gate showing)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('non consenting users in Ireland, low gateDisplayCount: 1 (still dismissible)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenGuDismissible');
    });

    it('non consenting users in Ireland, low gateDisplayCount: 3 (mandatory from now on)', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('AuxiaAnalyticThenGuMandatory');
    });

    it('Ireland, un-consented, Guardian share', () => {
        // [08] (copy from logic.md)
        //
        // prerequisites:
        // - Ireland
        // - Is Guardian share of the audience
        // - user has consented
        //
        // effects:
        // - No Auxia notification
        // - Guardian drives the gate:
        // - No gate display the first 3 page views
        // - Gate: dismissible gates
        //         then no gate after 5 dismisses

        const payload: GetTreatmentsRequestPayload = {
            browserId: 'sample',
            isSupporter: false,
            dailyArticleCount: 10,
            articleIdentifier: 'sample: article identifier',
            editionId: 'GB',
            contentType: 'Article',
            sectionId: 'uk-news',
            tagIds: ['type/article'],
            gateDismissCount: 4,
            countryCode: 'IE',
            mvtId: 450_000, // <- Non Auxia
            should_show_legacy_gate_tmp: true, // <- In Ireland, this value is irrelevant, since we count dailyArticleCount and gateDisplayCount
            hasConsented: true,
            shouldServeDismissible: false,
            showDefaultGate: undefined,
            gateDisplayCount: 4,
        };
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('GuDismissible');
    });

    it('invalid attribute: contentType', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: sectionId', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: tagIds', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('None');
    });

    it('invalid attribute: articleIdentifier', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('None');
    });

    it('should return a gate in the case of the Giulia experiment', () => {
        const payload: GetTreatmentsRequestPayload = {
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
        const gateType = getTreatmentsRequestPayloadToGateType(payload);
        expect(gateType).toStrictEqual('GuDismissible');
    });
});
