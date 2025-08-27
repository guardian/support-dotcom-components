import { buildGetTreatmentsRequestPayload } from '../libPure';

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
