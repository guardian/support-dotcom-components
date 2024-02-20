import { MobileOS } from '@sdc/shared/src/types';
import express from 'express';

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);
export const isMobile = (req: express.Request): boolean => {
    const ua = req.get('User-Agent');
    return !!ua && (isIOS(ua) || isAndroid(ua));
};

export function getMobileOS(req: express.Request): MobileOS {
    const ua = req.get('User-Agent');
    if (!ua) {
        return undefined;
    }

    if (isIOS(ua)) {
        return 'iOS';
    }
    if (isAndroid(ua)) {
        return 'Android';
    }

    return undefined;
}
