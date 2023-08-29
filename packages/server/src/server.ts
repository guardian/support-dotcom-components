import fs from 'fs/promises';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import { z } from 'zod';
import { isDev } from './lib/env';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { logError } from './utils/logging';
import { buildEpicRouter } from './api/epicRouter';
import { buildBannerRouter } from './api/bannerRouter';
import { buildHeaderRouter } from './api/headerRouter';
import { buildAmpEpicRouter } from './api/ampEpicRouter';
import { buildModulesRouter } from './api/modulesRouter';
import { buildChannelSwitchesReloader } from './channelSwitches';
import { buildSuperModeArticlesReloader } from './lib/superMode';
import { buildEpicLiveblogTestsReloader, buildEpicTestsReloader } from './tests/epics/epicTests';
import { buildChoiceCardAmountsReloader } from './choiceCardAmounts';
import { buildTickerDataReloader } from './lib/fetchTickerData';
import { buildProductPricesReloader } from './productPrices';
import { buildBannerTestsReloader } from './tests/banners/bannerTests';
import { buildBannerDeployTimesReloader } from './tests/banners/bannerDeployTimes';
import { buildHeaderTestsReloader } from './tests/headers/headerTests';
import { buildAmpEpicTestsReloader } from './tests/amp/ampEpicTests';
import { brazeMessagesMiddleware } from './middleware/brazeMessagesMiddleware';

const brazeApiKeySchema = z.object({
    key: z.string(),
});

const readBrazeApiKey = async (stage: string | undefined): Promise<string> => {
    switch (stage) {
        case 'PROD':
        case 'CODE':
            const fileContents = await fs.readFile('./braze-api-key.json', 'utf8');
            const rawJson = JSON.parse(fileContents);
            return brazeApiKeySchema.parse(rawJson).key;
        default:
            return 'dev-key';
    }
};

const buildApp = async (): Promise<Express> => {
    const app = express();

    app.use(express.json({ limit: '50mb' }));
    app.use(compression());

    const dotcomDevOrigins = ['http://localhost:3030', 'http://localhost:9000'];
    const corsOrigin = () => {
        switch (process.env.stage) {
            case 'PROD':
                return ['https://www.theguardian.com', ...dotcomDevOrigins];
            case 'CODE':
                return ['https://m.code.dev-theguardian.com', ...dotcomDevOrigins];
            default:
                return '*';
        }
    };

    const corsOptions = {
        origin: corsOrigin(),
    };
    app.use(cors(corsOptions));
    app.use(loggingMiddleware);
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(brazeMessagesMiddleware);

    const brazeApiKey: string = await readBrazeApiKey(process.env.stage);

    // Initialise dependencies
    const [
        channelSwitches,
        superModeArticles,
        articleEpicTests,
        liveblogEpicTests,
        ampEpicTests,
        choiceCardAmounts,
        tickerData,
        productPrices,
        bannerTests,
        bannerDeployTimes,
        headerTests,
    ] = await Promise.all([
        buildChannelSwitchesReloader(),
        buildSuperModeArticlesReloader(),
        buildEpicTestsReloader(),
        buildEpicLiveblogTestsReloader(),
        buildAmpEpicTestsReloader(),
        buildChoiceCardAmountsReloader(),
        buildTickerDataReloader(),
        buildProductPricesReloader(),
        buildBannerTestsReloader(),
        buildBannerDeployTimesReloader(),
        buildHeaderTestsReloader(),
    ]);

    // Build the routers
    app.use(
        buildEpicRouter(
            channelSwitches,
            superModeArticles,
            articleEpicTests,
            liveblogEpicTests,
            choiceCardAmounts,
            tickerData,
        ),
    );
    app.use(
        buildBannerRouter(
            channelSwitches,
            tickerData,
            productPrices,
            bannerTests,
            bannerDeployTimes,
            choiceCardAmounts,
        ),
    );
    app.use(buildHeaderRouter(channelSwitches, headerTests));
    app.use('/amp', buildAmpEpicRouter(choiceCardAmounts, tickerData, ampEpicTests));
    // Only serve the modules from this server when running locally (DEV).
    // In PROD/CODE we serve them from S3 via fastly.
    if (isDev) {
        app.use(buildModulesRouter());
    }

    app.use(errorHandlingMiddleware);

    app.post('/braze/liveblogEpic', (req: express.Request, res: express.Response) => {
        // No need for CORS here, this endpoint is requested server-to-server
        res.removeHeader('Access-Control-Allow-Origin');

        if (req.header('X-Api-Key') === brazeApiKey) {
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get('/healthcheck', (req: express.Request, res: express.Response) => {
        res.header('Content-Type', 'text/plain');
        res.send('OK');
    });

    return Promise.resolve(app);
};

buildApp()
    .then(app => {
        const PORT = process.env.PORT || 3030;

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(err => {
        logError(`Failed to start server: ${String(err)}`);
        throw err;
    });
