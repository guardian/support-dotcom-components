import type express from 'express';
import type { UserDeviceType } from '../../shared/types';

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);

export const getDeviceType = (req: express.Request): UserDeviceType => {
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
