import { getQueryParams } from './params';

describe('getQueryParams', () => {
    describe('force param', () => {
        it('parses force query param with testName:variantName format', () => {
            const result = getQueryParams({ force: 'TestName:Variant' });
            expect(result.force).toEqual({
                testName: 'TestName',
                variantName: 'Variant',
            });
        });

        it('returns undefined for force when not present', () => {
            const result = getQueryParams({});
            expect(result.force).toBeUndefined();
        });

        it('returns undefined for force when invalid (no colon)', () => {
            const result = getQueryParams({ force: 'invalid' });
            expect(result.force).toBeUndefined();
        });

        it('returns undefined for force when only testName present', () => {
            const result = getQueryParams({ force: 'TestName:' });
            expect(result.force).toBeUndefined();
        });
    });

    describe('preview param', () => {
        it('parses preview query param with testName:variantName format', () => {
            const result = getQueryParams({ preview: 'TestName:Variant' });
            expect(result.preview).toEqual({
                testName: 'TestName',
                variantName: 'Variant',
            });
        });

        it('returns undefined for preview when not present', () => {
            const result = getQueryParams({});
            expect(result.preview).toBeUndefined();
        });

        it('returns undefined for preview when invalid (no colon)', () => {
            const result = getQueryParams({ preview: 'invalid' });
            expect(result.preview).toBeUndefined();
        });

        it('returns undefined for preview when only testName present', () => {
            const result = getQueryParams({ preview: 'TestName:' });
            expect(result.preview).toBeUndefined();
        });
    });

    describe('both force and preview', () => {
        it('parses both force and preview when both present', () => {
            const result = getQueryParams({
                force: 'ForceTest:ForceVariant',
                preview: 'PreviewTest:PreviewVariant',
            });
            expect(result.force).toEqual({
                testName: 'ForceTest',
                variantName: 'ForceVariant',
            });
            expect(result.preview).toEqual({
                testName: 'PreviewTest',
                variantName: 'PreviewVariant',
            });
        });
    });

    describe('debug param', () => {
        it('sets debug to true when present', () => {
            const result = getQueryParams({ debug: 'true' });
            expect(result.debug).toBe(true);
        });

        it('sets debug to false when not present', () => {
            const result = getQueryParams({});
            expect(result.debug).toBe(false);
        });
    });

    describe('deviceClass param', () => {
        it('sets deviceClass to tablet when present', () => {
            const result = getQueryParams({ deviceClass: 'tablet' });
            expect(result.deviceClass).toBe('tablet');
        });

        it('sets deviceClass to undefined when not tablet', () => {
            const result = getQueryParams({ deviceClass: 'desktop' });
            expect(result.deviceClass).toBeUndefined();
        });
    });
});
