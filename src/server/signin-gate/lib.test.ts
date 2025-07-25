import {
    articleIdentifierIsAllowed,
    buildAuxiaProxyGetTreatmentsResponseData,
    buildGetTreatmentsRequestPayload,
    buildLogTreatmentInteractionRequestPayload,
    guDefaultGateGetTreatmentsResponseData,
    guDefaultShouldShowTheGate,
    guDefaultGateAsAnAuxiaAPIUserTreatment,
    isValidContentType,
    isValidSection,
    isValidTagIdCollection,
    mvtIdIsAuxiaAudienceShare,
} from './lib';

describe('guDefaultShouldShowTheGate', () => {
    it('should return false if a non multiple of 10', () => {
        expect(guDefaultShouldShowTheGate(21)).toBe(false);
    });

    it('should return true if a multiple of 10', () => {
        expect(guDefaultShouldShowTheGate(30)).toBe(true);
    });
});

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
        const shouldNotServeMandatory = false;

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
                    boolValue: shouldNotServeMandatory,
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
            shouldNotServeMandatory,
        );
        expect(returnedAnswer).toStrictEqual(expectedAnswer);
    });
});

describe('guDefaultGateGetTreatmentsResponseData', () => {
    const guGateAsAuxiaUserTreatment1 = guDefaultGateAsAnAuxiaAPIUserTreatment();

    it('should not return gate data if the number of gate dismissal is less than 5 (or equal to 5)', () => {
        // We are setting the daily article count to a value which would allow for the gate to be shown
        const daily_article_count = 0;
        const expectAnswer = {
            responseId: '',
            userTreatments: [guGateAsAuxiaUserTreatment1],
        };
        expect(guDefaultGateGetTreatmentsResponseData(daily_article_count, 5)).toStrictEqual(
            expectAnswer,
        );
    });
    it('should not return gate data if the number of gate dismissal is more than 5', () => {
        // We are setting the daily article count to a value which would allow for the gate to be shown
        const daily_article_count = 0;
        const expectAnswer = {
            responseId: '',
            userTreatments: [],
        };
        expect(guDefaultGateGetTreatmentsResponseData(daily_article_count, 6)).toStrictEqual(
            expectAnswer,
        );
    });
    it('should not return gate data if the daily article count is not a multiple of 10', () => {
        // We are setting the gateDismissCount to a value which would allow for the gate to be shown
        const gateDismissCount = 0;
        const expectAnswer = {
            responseId: '',
            userTreatments: [],
        };
        expect(guDefaultGateGetTreatmentsResponseData(1, gateDismissCount)).toStrictEqual(
            expectAnswer,
        );
    });
    it('should not return gate data if the daily article count is a multiple of 10', () => {
        // We are setting the gateDismissCount to a value which would allow for the gate to be shown
        const gateDismissCount = 0;
        const expectAnswer = {
            responseId: '',
            userTreatments: [guGateAsAuxiaUserTreatment1],
        };
        expect(guDefaultGateGetTreatmentsResponseData(10, gateDismissCount)).toStrictEqual(
            expectAnswer,
        );
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
