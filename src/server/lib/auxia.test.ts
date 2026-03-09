import { Auxia } from './auxia';
import type { GetTreatmentsAttributes, UserTreatment } from './auxia';

global.fetch = jest.fn();

const mockConfig = {
    apiKey: 'test-api-key',
    projectId: 'test-project-id',
};

const mockAttributes: GetTreatmentsAttributes = {
    isSupporter: false,
    hasConsented: true,
    countryCode: 'GB',
};

const makeUserTreatment = (treatmentContent: string): UserTreatment => ({
    treatmentId: 'tid-1',
    treatmentTrackingId: 'ttid-1',
    rank: '1',
    contentLanguageCode: 'en-GB',
    treatmentContent,
    treatmentType: 'BANNER',
    surface: 'SUPPORTER_REVENUE_BANNER',
});

const successResponse = (userTreatments?: UserTreatment[]) => ({
    ok: true,
    status: 200,
    json: () =>
        Promise.resolve({
            responseId: 'resp-1',
            userTreatments,
        }),
});

describe('Auxia.getBannerSuppressedChecker – HTTP behaviour', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return false (not suppressed) when Auxia returns a non-ok status', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        const result = await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(result).toBe(false);
    });

    it('should return false when fetch throws', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network error'));

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        const result = await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(result).toBe(false);
    });

    it('should return false when the response body fails schema validation', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ unexpected: 'shape' }),
        });

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        const result = await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(result).toBe(false);
    });
});

describe('Auxia.getBannerSuppressedChecker – suppression logic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return false when userTreatments is undefined', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(successResponse());

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(false);
    });

    it('should return false when userTreatments is an empty array', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(successResponse([]));

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(false);
    });

    it('should return true (suppressed) when show_banner is "false"', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'false' }))]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(true);
    });

    it('should return false (not suppressed) when show_banner is "true"', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'true' }))]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(false);
    });

    it('should return false when treatmentContent is not valid JSON', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment('not-json')]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(false);
    });

    it('should return false when treatmentContent JSON is missing show_banner', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment(JSON.stringify({ other_key: 'value' }))]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression } = auxia.getBannerSuppressedChecker();

        expect(await checkAuxiaSuppression('browser-id', mockAttributes)).toBe(false);
    });
});

describe('Auxia.getBannerSuppressedChecker – forLogging', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return "not-consulted" before any call is made', () => {
        const auxia = new Auxia(mockConfig);
        const { forLogging } = auxia.getBannerSuppressedChecker();

        expect(forLogging()).toBe('not-consulted');
        expect((global.fetch as jest.Mock).mock.calls.length).toBe(0);
    });

    it('should return "suppressed" after a suppressed result', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'false' }))]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression, forLogging } = auxia.getBannerSuppressedChecker();

        await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(forLogging()).toBe('suppressed');
    });

    it('should return "not-suppressed" after a not-suppressed result', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce(
            successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'true' }))]),
        );

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression, forLogging } = auxia.getBannerSuppressedChecker();

        await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(forLogging()).toBe('not-suppressed');
    });

    it('should return "not-suppressed" after a failed fetch (defaults to not suppressed)', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

        const auxia = new Auxia(mockConfig);
        const { checkAuxiaSuppression, forLogging } = auxia.getBannerSuppressedChecker();

        await checkAuxiaSuppression('browser-id', mockAttributes);

        expect(forLogging()).toBe('not-suppressed');
    });

    it('should not make a fetch call when only forLogging is called', () => {
        const auxia = new Auxia(mockConfig);
        const { forLogging } = auxia.getBannerSuppressedChecker();

        forLogging();

        expect((global.fetch as jest.Mock).mock.calls.length).toBe(0);
    });

    it('should return independent status per checker instance', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce(
                successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'false' }))]),
            )
            .mockResolvedValueOnce(
                successResponse([makeUserTreatment(JSON.stringify({ show_banner: 'true' }))]),
            );

        const auxia = new Auxia(mockConfig);
        const checker1 = auxia.getBannerSuppressedChecker();
        const checker2 = auxia.getBannerSuppressedChecker();

        await checker1.checkAuxiaSuppression('browser-1', mockAttributes);
        await checker2.checkAuxiaSuppression('browser-2', mockAttributes);

        expect(checker1.forLogging()).toBe('suppressed');
        expect(checker2.forLogging()).toBe('not-suppressed');
    });
});
