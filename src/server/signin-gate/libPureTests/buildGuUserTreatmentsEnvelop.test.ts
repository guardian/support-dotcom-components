import {
    buildGuUserTreatmentsEnvelop,
    guDismissibleUserTreatment,
    guMandatoryUserTreatment,
} from '../libPure';

describe('buildGuUserTreatmentsEnvelop', () => {
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
