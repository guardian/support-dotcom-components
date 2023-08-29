import express from 'express';
import { fetchBrazeEpicTests } from '../lib/brazeMessages';

export const brazeMessagesMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> => {
    const brazeUUID = req.body?.targeting?.brazeUUID;
    if (brazeUUID) {
        const test = await fetchBrazeEpicTests(brazeUUID);
        if (test) {
            res.locals.brazeMessages = test;
        }
    }
    next();
};
