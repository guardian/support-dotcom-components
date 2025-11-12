import type express from 'express';
import { Router } from 'express';
import type { TickerName } from '../../shared/types';
import type { TickerDataProvider } from '../lib/fetchTickerData';

const validTickerNames: TickerName[] = ['US', 'AU', 'global'];

export const buildTickerRouter = (tickerData: TickerDataProvider): express.Router => {
    const router = Router();

    router.get('/ticker/:name', (req: express.Request, res: express.Response) => {
        const name = req.params.name;

        if (!validTickerNames.includes(name as TickerName)) {
            res.status(404).json({ error: 'Ticker not found' });
            return;
        }

        const data = tickerData.getTickerData(name as TickerName);

        if (!data) {
            res.status(503).json({ error: 'Ticker data unavailable' });
            return;
        }

        res.json(data);
    });

    return router;
};
