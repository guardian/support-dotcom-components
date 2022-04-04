import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validation = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const result = schema.safeParse(req.body);

    if (result.success) {
        next();
    } else {
        res.sendStatus(400);
    }
};
