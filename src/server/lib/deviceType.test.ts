import type express from 'express';
import { getDeviceType } from './deviceType';
import type { Params } from './params';

const createMockRequest = (userAgent?: string, cookies?: string): express.Request => {
    return {
        get: ((name: string) => {
            if (name === 'User-Agent') {
                return userAgent;
            }
            if (name === 'Cookie') {
                return cookies;
            }
            return undefined;
        }) as express.Request['get'],
    } as express.Request;
};

describe('getDeviceType', () => {
    describe('deviceClass query parameter detection (iPadOS 13+)', () => {
        it('should return iOS when deviceClass=tablet is in params', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
            );
            const params: Params = { deviceClass: 'tablet' };
            expect(getDeviceType(req, params)).toBe('iOS');
        });

        it('should prioritize deviceClass query parameter over cookie', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'device_class=desktop',
            );
            const params: Params = { deviceClass: 'tablet' };
            expect(getDeviceType(req, params)).toBe('iOS');
        });

        it('should prioritize deviceClass query parameter over User-Agent', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            );
            const params: Params = { deviceClass: 'tablet' };
            expect(getDeviceType(req, params)).toBe('iOS');
        });

        it('should fall back to User-Agent when deviceClass is not provided', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
            );
            const params: Params = {};
            expect(getDeviceType(req, params)).toBe('Desktop');
        });
    });

    describe('User-Agent based detection', () => {
        it('should return iOS for iPhone User-Agent', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should return iOS for iPad User-Agent (older iPadOS)', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (iPad; CPU OS 12_0 like Mac OS X) AppleWebKit/605.1.15',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should return iOS for iPod touch User-Agent', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should return Android for Android User-Agent', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36',
            );
            expect(getDeviceType(req)).toBe('Android');
        });

        it('should return Desktop for macOS User-Agent without tablet cookie', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
            );
            expect(getDeviceType(req)).toBe('Desktop');
        });

        it('should return Desktop for Windows User-Agent', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            );
            expect(getDeviceType(req)).toBe('Desktop');
        });

        it('should return Desktop when User-Agent is missing', () => {
            const req = createMockRequest(undefined);
            expect(getDeviceType(req)).toBe('Desktop');
        });

        it('should return Desktop when no headers are present', () => {
            const req = createMockRequest(undefined, undefined);
            expect(getDeviceType(req)).toBe('Desktop');
        });
    });
});
