import type express from 'express';

// This is a temporary 'validation' middleware to provide a minimal level of
// validation to incoming post requests. This is in response to an ongoing alarm
// we've been seeing related to invalid POST requests being send to the `/header`
// endpoint. The proper solution is to use zod to do the validation. However, that
// will require a bit of a refactor to avoid bundling zod into the dotcom package.
//
// TODO: Remove this middleware after adding proper validation.
export const bodyContainsAllFields =
    (fields: string[]) =>
    (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (fields.every((f) => f in req.body)) {
            next();
        } else {
            res.sendStatus(400);
        }
    };
