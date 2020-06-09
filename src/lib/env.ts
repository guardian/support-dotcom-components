import express from 'express';

export const isProd = process.env.NODE_ENV === 'production';

export const isDev = process.env.NODE_ENV === 'development';

export const baseUrl = (req: express.Request): string => {
    if (process.env.BASE_URL) {
        return process.env.BASE_URL;
    } else {
        return req.protocol + '://' + req.get('host');
    }
};
