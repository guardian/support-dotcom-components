import express from 'express';

export const isProd = process.env.stage === 'production';

export const isDev = process.env.NODE_ENV === 'development';

export const baseUrl = (req: express.Request): string => {
    if (process.env.base_url) {
        return process.env.base_url;
    } else {
        return req.protocol + '://' + req.get('host');
    }
};
