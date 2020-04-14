import express from 'express';

export const logging = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    res.on('finish', () =>
        console.log(
            JSON.stringify({
                status: res.statusCode,
                method: req.method,
                path: req.path,
                didRenderEpic: res.locals.didRenderEpic,
                clientName: res.locals.clientName || 'unknown',
            }),
        ),
    );
    next();
};
