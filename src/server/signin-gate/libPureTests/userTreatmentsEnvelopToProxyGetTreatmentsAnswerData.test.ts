import { userTreatmentsEnvelopToProxyGetTreatmentsAnswerData } from '../libPure';

describe('userTreatmentsEnvelopToProxyGetTreatmentsAnswerData', () => {
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
