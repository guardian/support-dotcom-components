import express from 'express';

export const retrieveSecondBannerChannel = process.env.stage === 'CODE';

export const isProd = process.env.stage === 'PROD';

export const isDev = process.env.NODE_ENV === 'development';

export const baseUrl = (req: express.Request): string => {
    if (process.env.base_url) {
        return process.env.base_url;
    } else {
        return req.protocol + '://' + req.get('host');
    }
};
