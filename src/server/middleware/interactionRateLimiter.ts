import { rateLimit } from 'express-rate-limit';

const oneMinuteInMillis = 60 * 1000;
const maxRequestsInWindow = 60;

export const interactionRateLimiter = rateLimit({
    windowMs: oneMinuteInMillis,
    max: maxRequestsInWindow,
    standardHeaders: true,
    legacyHeaders: false,
});
