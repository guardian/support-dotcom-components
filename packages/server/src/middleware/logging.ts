import express from 'express';
import { logger } from '../utils/logging';

export const RequestLogName = 'request';

export const logging = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    res.on('finish', () =>
        logger.info(RequestLogName, {
            body: res.statusCode === 500 ? req.body : undefined,
            status: res.statusCode,
            method: req.method,
            path: req.path,
            didRenderEpic: res.locals.didRenderEpic,
            didRenderBanner: res.locals.didRenderBanner,
            clientName: res.locals.clientName || 'unknown',
            bannerTargeting: res.locals.bannerTargeting,
            epicTargeting: res.locals.epicTargeting,
        }),
    );
    next();
};
