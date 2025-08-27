import { buildLogTreatmentInteractionRequestPayload } from '../libPure';

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
