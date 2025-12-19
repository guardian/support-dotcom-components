import type express from 'express';
import { getDeviceType } from './deviceType';

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
    describe('cookie-based detection (iPadOS 13+)', () => {
        it('should return iOS when device_class=tablet cookie is present', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'device_class=tablet',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should return iOS when device_class=tablet cookie is present among other cookies', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'other_cookie=value; device_class=tablet; another=test',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should prioritize cookie over User-Agent when both indicate different devices', () => {
            // Cookie says tablet (iPad), but UA says desktop Mac
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'device_class=tablet',
            );
            expect(getDeviceType(req)).toBe('iOS');
        });

        it('should fall back to User-Agent when device_class cookie has different value', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'device_class=desktop',
            );
            expect(getDeviceType(req)).toBe('Desktop');
        });

        it('should fall back to User-Agent when device_class cookie is not present', () => {
            const req = createMockRequest(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'other_cookie=value',
            );
            expect(getDeviceType(req)).toBe('Desktop');
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
