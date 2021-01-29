import express from 'express';
import { ValidationError } from '../lib/validation';
import { logger } from '../utils/logging';

export const errorHandling = (
    error: Error,
    req: express.Request,
    res: express.Response,
    // Error handling middleware in Express needs to take 4 arguments in the handler
    // for it to run when `next()` function is called in the route handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
): void => {
    const { message } = error;

    switch (error.constructor) {
        case ValidationError:
            res.status(400).send({ error: message });
            break;
        default:
            res.status(500).send({ error: message });
    }

    logger.error('Something went wrong: ', message);
};
