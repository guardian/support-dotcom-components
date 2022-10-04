import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
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

const buildApp = (): Promise<Express> => {
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

    // Build the routers
    app.use(buildEpicRouter());
    app.use(buildBannerRouter());
    app.use(buildHeaderRouter());
    app.use('/amp', buildAmpEpicRouter());
    // Only serve the modules from this server when running locally (DEV).
    // In PROD/CODE we serve them from S3 via fastly.
    if (isDev) {
        app.use(buildModulesRouter());
    }

    app.use(errorHandlingMiddleware);

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
