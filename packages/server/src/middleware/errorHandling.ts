import type express from 'express';
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

	res.status(500).send({ error: message });

	logger.error('Something went wrong: ', message);
};
