import type express from 'express';
import type { UserDeviceType } from '../../shared/types';
import type { Params } from './params';

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);

/**
 * Determines the user's device type from the request.
 *
 * iPadOS 13+ no longer includes "iPad" in the User-Agent string, reporting as macOS instead.
 * To handle this, dotcom-rendering sets a `deviceClass=tablet` query parameter via client-side
 * feature detection when an iPad is detected. We check this parameter first and return 'iOS'
 * if present, before falling back to cookie and User-Agent parsing.
 */
export const getDeviceType = (req: express.Request, params?: Params): UserDeviceType => {
    // Check for deviceClass query parameter set by client-side iPad detection
    // This takes priority over cookies and User-Agent
    if (params?.deviceClass === 'tablet') {
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
