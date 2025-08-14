import type { AuxiaRouterConfig } from '../api/auxiaProxyRouter';
import { getTreatments } from '../api/auxiaProxyRouter';
import type { GetTreatmentRequestBody } from './lib';
import {
    articleIdentifierIsAllowed,
    buildAuxiaProxyGetTreatmentsResponseData,
    buildGetTreatmentsRequestPayload,
    buildLogTreatmentInteractionRequestPayload,
    guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment,
    guDefaultGateGetTreatmentsResponseData,
    guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment,
    isValidContentType,
    isValidSection,
    isValidTagIdCollection,
    mvtIdIsAuxiaAudienceShare,
} from './lib';

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
    const dismissibleGuGateTreatment = guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment();
    const mandatoryGuGateTreatment = guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment();

    it('should not return gate data if the number of gate dismissal is more than 5 (low gate display count)', () => {
        const gateDismissCount = 6;
        const gateDisplayCount = 0; // dismissible gate
        const expectAnswer = {
            responseId: '',
            userTreatments: [],
        };
        expect(
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
        expect(
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'FR'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
        ).toStrictEqual(expectAnswer);
        expect(
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'FR'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'IE'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'FR'),
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
            guDefaultGateGetTreatmentsResponseData(gateDismissCount, gateDisplayCount, 'FR'),
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
        expect(buildAuxiaProxyGetTreatmentsResponseData(auxiaData)).toStrictEqual(expectedAnswer);
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
        expect(buildAuxiaProxyGetTreatmentsResponseData(auxiaData)).toStrictEqual(expectedAnswer);
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

describe('getTreatments', () => {
    // Function getTreatments is written as a set of conditions, from higher priority to lower
    // priority, where the first satisfactory condition determines the type of gate
    // that is going to be displayed/

    // This tests is following the logic getTreatments from top to bottom.

    it('test shouldServeDismissible and showDefaultGate:mandatory interacting together', async () => {
        // If we receive instruction to serve a default gate (showDefaultGate
        // can be `mandatory`, `dismissible` or `undefined`, and here we mean not
        // undefined), but also the condition to serve a dismissible gate,
        // then the latter condition takes priority, and we should serve
        // a dismissible gate.

        // This condition essentially resolve the semantic conflict between
        // showDefaultGate:mandatory and shouldServeDismissible:true

        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        const expectedAnswer = {
            responseId: '',
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        expect(treatment).toStrictEqual(expectedAnswer);
    });

    it('test shouldServeDismissible and showDefaultGate:dismissible interacting together', async () => {
        // Similar to test 1, but here we have
        // showDefaultGate: 'dismissible'

        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        const expectedAnswer = {
            responseId: '',
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        expect(treatment).toStrictEqual(expectedAnswer);
    });

    // From this point shouldServeDismissible is going to be false.

    // The attribute showDefaultGate overrides any other behavior
    // We pursue with two tests showing that showDefaultGate is correctly listened to.

    it('showDefaultGate:mandatory overrides any other behavior', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        const expectedAnswer = {
            responseId: '',
            userTreatments: [guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment()],
        };
        expect(treatment).toStrictEqual(expectedAnswer);
    });

    it('showDefaultGate:dismissible overrides any other behavior', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        const expectedAnswer = {
            responseId: '',
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        expect(treatment).toStrictEqual(expectedAnswer);
    });

    // At this point there should be a test of being in Ireland, but we are postponing this test
    // for a bit and will do w refactoring in the meantime.

    // TODO: Ireland test
    // ....

    // We check page metada to comply with Guardian policies.
    // If the policies are not met, then we do not display a gate

    it('invalid attribute: contentType', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        expect(treatment).toStrictEqual(undefined);
    });

    it('invalid attribute: sectionId', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        expect(treatment).toStrictEqual(undefined);
    });

    it('invalid attribute: tagIds', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        expect(treatment).toStrictEqual(undefined);
    });

    it('invalid attribute: articleIdentifier', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        expect(treatment).toStrictEqual(undefined);
    });

    // Should return a gate if we are not in the Auxia share and
    // dailyArticleCount: 3

    it('should return a gate in the case of the Giulia experiment', async () => {
        const config: AuxiaRouterConfig = {
            apiKey: 'sample',
            projectId: 'sample',
        };
        const body: GetTreatmentRequestBody = {
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
        const treatment = await getTreatments(config, body);
        const expectedAnswer = {
            responseId: '',
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        expect(treatment).toStrictEqual(expectedAnswer);
    });
});
