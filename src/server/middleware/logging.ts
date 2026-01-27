import type express from 'express';
import { logger } from '../utils/logging';

type LoggingLocals = {
    didRenderEpic?: boolean;
    didRenderBanner?: boolean;
    bannerTargeting?: Record<string, unknown>;
    epicTargeting?: Record<string, unknown>;
    epicSuperMode?: boolean;
    auxiaTreatmentId?: string;
    auxiaTreatmentTrackingId?: string;
    auxiaInteractionType?: string;
    hasAuthorization?: boolean;
    gotMParticleProfile?: string;
};

export const logging = (
    req: express.Request,
    res: express.Response<unknown, LoggingLocals>,
    next: express.NextFunction,
): void => {
    const startTime = process.hrtime();

    res.on('finish', () => {
        logger.info({ message: `finish for ${req.path}` });
        try {
            const [seconds, nanoseconds] = process.hrtime(startTime);
            const responseTimeMs = seconds * 1000 + nanoseconds / 1e6;

            logger.info({
                status: res.statusCode,
                method: req.method,
                path: req.path,
                didRenderEpic: res.locals.didRenderEpic,
                didRenderBanner: res.locals.didRenderBanner,
                bannerTargeting: res.locals.bannerTargeting,
                epicTargeting: res.locals.epicTargeting,
                userAgent: isServerError(res.statusCode) ? req.headers['user-agent'] : undefined,
                epicSuperMode: res.locals.epicSuperMode,
                responseTimeInMs: Math.round(responseTimeMs),
                auxiaTreatmentId: res.locals.auxiaTreatmentId,
                auxiaTreatmentTrackingId: res.locals.auxiaTreatmentTrackingId,
                auxiaInteractionType: res.locals.auxiaInteractionType,
                hasAuthorization: res.locals.hasAuthorization,
                gotMParticleProfile: res.locals.gotMParticleProfile,
            });
        } catch (error) {
            logger.error({ message: `Logging error: ${String(error)}` });
            // Try logging with just the essential fields
            logger.info({
                status: res.statusCode,
                method: req.method,
                path: req.path,
                gotMParticleProfile: String(res.locals.gotMParticleProfile),
            });
        }
        logger.info({ message: `logged finish for ${req.path}` });
    });
    next();
};

const isServerError = (statusCode: number) => statusCode >= 500;
