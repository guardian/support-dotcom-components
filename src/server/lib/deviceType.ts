import type express from 'express';
import type { UserDeviceType } from '../../shared/types';

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);

const getCookieValue = (req: express.Request, cookieName: string): string | undefined => {
    const cookieHeader = req.get('Cookie');
    if (!cookieHeader) {
        return undefined;
    }

    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return undefined;
};

/**
 * Determines the user's device type from the request.
 *
 * iPadOS 13+ no longer includes "iPad" in the User-Agent string, reporting as macOS instead.
 * To handle this, dotcom-rendering sets a `device_class=tablet` cookie via client-side
 * feature detection when an iPad is detected. We check this cookie first and return 'iOS'
 * if present, before falling back to User-Agent parsing.
 */
export const getDeviceType = (req: express.Request): UserDeviceType => {
    // Check for device_class cookie set by client-side iPad detection
    // iPadOS 13+ reports as macOS in User-Agent, so we rely on this cookie
    const deviceClass = getCookieValue(req, 'device_class');
    if (deviceClass === 'tablet') {
        return 'iOS';
    }

    const ua = req.get('User-Agent');
    if (!ua) {
        return 'Desktop';
    }

    if (isIOS(ua)) {
        return 'iOS';
    }
    if (isAndroid(ua)) {
        return 'Android';
    }

    return 'Desktop';
};
