import express from 'express';
import { logger } from '../utils/logging';

export const RequestLogName = 'request';

export const logging = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    res.on('finish', () =>
        logger.info({
            status: res.statusCode,
            method: req.method,
            path: req.path,
            didRenderEpic: res.locals.didRenderEpic,
            didRenderBanner: res.locals.didRenderBanner,
            clientName: res.locals.clientName || 'unknown',
            bannerTargeting: res.locals.bannerTargeting,
            epicTargeting: res.locals.epicTargeting,
            userAgent: isServerError(res.statusCode) ? req.headers['user-agent'] : undefined,
            epicSuperMode: res.locals.epicSuperMode,
        }),
    );
    next();
};

const isServerError = (statusCode: number) => statusCode >= 500;
