import {
    articleIdentifierIsAllowed,
    buildGetTreatmentsRequestPayload,
    buildGuUserTreatmentsEnvelop,
    buildLogTreatmentInteractionRequestPayload,
    getTreatmentsRequestPayloadToGateType,
    guDismissibleUserTreatment,
    guMandatoryUserTreatment,
    isValidContentType,
    isValidSection,
    isValidTagIdCollection,
    mvtIdIsAuxiaAudienceShare,
    userTreatmentsEnvelopToProxyGetTreatmentsAnswerData,
} from '../libPure';
import type { GetTreatmentsRequestPayload } from '../types';

describe('buildGetTreatmentsRequestPayload', () => {
    it('should return return the right payload', () => {
        const projectId = 'projectId';
        const browserId = 'browserId';
        const isSupporter = true;
        const dailyArticleCount = 21;
        const articleIdentifier = 'articleIdentifier';
        const editionId = 'UK';
        const countryCode = 'GB';
        const hasConsented = true;
        const shouldServeDismissible = false;

        const expectedAnswer = {
            projectId,
            userId: browserId,
            contextualAttributes: [
                {
                    key: 'is_supporter',
                    boolValue: isSupporter,
                },
                {
                    key: 'daily_article_count',
                    integerValue: dailyArticleCount,
                },
                {
                    key: 'article_identifier',
                    stringValue: articleIdentifier,
                },
                {
                    key: 'edition',
                    stringValue: editionId,
                },
                {
                    key: 'country_key',
                    stringValue: countryCode,
                },
                {
                    key: 'has_consented',
                    boolValue: hasConsented,
                },
                {
                    key: 'should_not_serve_mandatory',
                    boolValue: shouldServeDismissible,
                },
            ],
            surfaces: [
                {
                    surface: 'ARTICLE_PAGE',
                    maximumTreatmentCount: 1,
                },
            ],
            languageCode: 'en-GB',
        };

        const returnedAnswer = buildGetTreatmentsRequestPayload(
            projectId,
            browserId,
            isSupporter,
            dailyArticleCount,
            articleIdentifier,
            editionId,
            countryCode,
            hasConsented,
            shouldServeDismissible,
        );
        expect(returnedAnswer).toStrictEqual(expectedAnswer);
    });
});

describe('guDefaultGateGetTreatmentsResponseData', () => {
    const dismissibleGuGateTreatment = guDismissibleUserTreatment();
    const mandatoryGuGateTreatment = guMandatoryUserTreatment();

    it('should not return gate data if the number of gate dismissal is more than 5 (low gate display count)', () => {
        const gateDismissCount = 6;
        const gateDisplayCount = 0; // dismissible gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'FR'),
        ).toStrictEqual(expectAnswer);
    });

    it('should not return gate data if the number of gate dismissal is more than 5 (high gate display count)', () => {
        const gateDismissCount = 6;
        const gateDisplayCount = 10; // mandatory gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'FR'),
        ).toStrictEqual(expectAnswer);
    });

    it('[in Ireland] should return a dismissible gate if gateDisplayCount is in {0, 1, 2}', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 0; // dismissible gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [dismissibleGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
    });

    it('[in Ireland] should return a dismissible gate if gateDisplayCount is in {0, 1, 2}', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 2; // dismissible gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [dismissibleGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
    });

    it('[in Ireland] should return a mandatory gate if gateDisplayCount is >= 3', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 3; // mandatory gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [mandatoryGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
    });

    it('[Ireland] should return a mandatory gate if gateDisplayCount is >= 3', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 6; // mandatory gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [mandatoryGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
    });

    it('[outside Ireland] should return a dismissible gate for any gateDisplayCount', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 0; // mandatory gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [dismissibleGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'FR'),
        ).toStrictEqual(expectAnswer);
    });

    it('[outside Ireland] should return a dismissible gate for any gateDisplayCount', () => {
        const gateDismissCount = 2; // low number allowing for a gate
        const gateDisplayCount = 6; // mandatory gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [dismissibleGuGateTreatment],
        };
        expect(
            buildGuUserTreatmentsEnvelop(gateDismissCount, gateDisplayCount, 'FR'),
        ).toStrictEqual(expectAnswer);
    });
});

describe('isValidContentType', () => {
    it('accepts Article', () => {
        expect(isValidContentType('Article')).toBe(true);
    });

    it('does not accepts NonArticle', () => {
        expect(isValidContentType('NonArticle')).toBe(false);
    });
});

describe('isValidSection', () => {
    it('accepts news', () => {
        expect(isValidSection('news')).toBe(true);
    });

    it('does not accept `about`', () => {
        // `about` is taken from the list of hard coded invalid sections
        expect(isValidSection('about')).toBe(false);
    });
});

describe('isValidTagIdCollection', () => {
    it('accepts `random`', () => {
        expect(isValidTagIdCollection(['random/random', 'random/otherRandom'])).toBe(true);
    });

    it('does not accept `info/newsletter-sign-up`', () => {
        // `info/newsletter-sign-up` is taken from the list of hard coded invalid sections
        expect(isValidTagIdCollection(['info/newsletter-sign-up', 'random/otherRandom'])).toBe(
            false,
        );
    });
});

describe('buildAuxiaProxyGetTreatmentsResponseData', () => {
    it('build things correctly, in the case of a provided treatment', () => {
        const auxiaData = {
            responseId: 'responseId',
            userTreatments: [
                {
                    treatmentId: 'treatmentId',
                    treatmentTrackingId: 'treatmentTrackingId',
                    rank: 'rank',
                    contentLanguageCode: 'contentLanguageCode',
                    treatmentContent: 'treatmentContent',
                    treatmentType: 'treatmentType',
                    surface: 'surface',
                },
            ],
        };
        const expectedAnswer = {
            responseId: 'responseId',
            userTreatment: {
                treatmentId: 'treatmentId',
                treatmentTrackingId: 'treatmentTrackingId',
                rank: 'rank',
                contentLanguageCode: 'contentLanguageCode',
                treatmentContent: 'treatmentContent',
                treatmentType: 'treatmentType',
                surface: 'surface',
            },
        };
        expect(userTreatmentsEnvelopToProxyGetTreatmentsAnswerData(auxiaData)).toStrictEqual(
            expectedAnswer,
        );
    });

    it('build things correctly, in the case of no treatment', () => {
        const auxiaData = {
            responseId: 'responseId',
            userTreatments: [],
        };
        const expectedAnswer = {
            responseId: 'responseId',
            userTreatment: undefined,
        };
        expect(userTreatmentsEnvelopToProxyGetTreatmentsAnswerData(auxiaData)).toStrictEqual(
            expectedAnswer,
        );
    });
});

describe('buildLogTreatmentInteractionRequestPayload', () => {
    it('', () => {
        const expectedAnswer = {
            projectId: 'projectId',
            userId: 'browserId',
            treatmentTrackingId: 'treatmentTrackingId',
            treatmentId: 'treatmentId',
            surface: 'surface',
            interactionType: 'interactionType',
            interactionTimeMicros: 123456789,
            actionName: 'actionName',
        };
        expect(
            buildLogTreatmentInteractionRequestPayload(
                'projectId',
                'browserId',
                'treatmentTrackingId',
                'treatmentId',
                'surface',
                'interactionType',
                123456789,
                'actionName',
            ),
        ).toStrictEqual(expectedAnswer);
    });
});

describe('articleIdentifierIsAllowed', () => {
    expect(
        articleIdentifierIsAllowed(
            'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
        ),
    ).toBe(true);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips')).toBe(false);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips#test')).toBe(false);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips/test')).toBe(false);
});

describe('mvtIdIsInTheNaturalAuxiaShareOfAudience', () => {
    expect(mvtIdIsAuxiaAudienceShare(0)).toBe(false);
    expect(mvtIdIsAuxiaAudienceShare(1)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(210945)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(210946)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(350000)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(350001)).toBe(false);
});

describe('decideGateTypeFromGetTreatmentsRequestPayload', () => {
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
