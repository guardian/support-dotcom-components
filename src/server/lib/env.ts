import type express from 'express';

// WARNING - do not use these in the modules, they are server-side only

export const isProd = process.env.stage === 'PROD';

export const isDev = process.env.stage === 'DEV';

export const isCode = process.env.stage === 'CODE';

// Defaults stage to PROD to avoid displaying non-PROD data in production.
export const stage = isDev ? 'DEV' : isCode ? 'CODE' : 'PROD';

export const baseUrl = (req: express.Request): string => {
    if (process.env.base_url) {
        return process.env.base_url;
    } else {
        return req.protocol + '://' + req.get('host');
    }
};
