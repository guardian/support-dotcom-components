import express from 'express';
import { AnyZodObject } from 'zod';

export const validation = (schema: AnyZodObject) => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    const result = schema.safeParse(req.body);
    if (result.success) {
        req.body = result.data;
        next();
    } else {
        res.sendStatus(400);
    }
};
