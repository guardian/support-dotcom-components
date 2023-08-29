import express from 'express';
import { fetchBrazeEpicTests } from '../lib/brazeMessages';

export const brazeMessagesMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> => {
    const brazeUUID = req.body?.targeting?.brazeUUID;
    if (brazeUUID) {
        const tests = await fetchBrazeEpicTests(brazeUUID);
        if (tests && tests.length > 0) {
            res.locals.brazeMessages = tests;
        }
    }
    next();
};
