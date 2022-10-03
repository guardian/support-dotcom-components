import express from 'express';

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);
export const isMobile = (req: express.Request): boolean => {
    const ua = req.get('User-Agent');
    return !!ua && (isIOS(ua) || isAndroid(ua));
};
