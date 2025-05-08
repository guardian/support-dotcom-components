import type express from 'express';
import { fetchBrazeEpicTests } from '../braze/brazeTable';

export const brazeMessagesMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access -- expected
    const brazeUUID = req.body?.targeting?.brazeUUID;
    if (brazeUUID) {
        const tests = await fetchBrazeEpicTests(brazeUUID as string);
        if (tests.length > 0) {
            res.locals.brazeMessages = tests;
        }
    }
    next();
};
