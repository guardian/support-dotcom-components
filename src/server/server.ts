import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { buildBanditDataReloader } from './bandit/banditData';
import { logError } from './utils/logging';
import { buildEpicRouter } from './api/epicRouter';
import { buildBannerRouter } from './api/bannerRouter';
import { buildHeaderRouter } from './api/headerRouter';
import { buildGutterRouter } from './api/gutterRouter';
import { buildAuxiaProxyRouter, getAuxiaRouterConfig } from './api/auxiaProxyRouter';
import { buildAmpEpicRouter } from './api/ampEpicRouter';
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
import { buildBannerDesignsReloader } from './tests/banners/bannerDesigns';
import { buildGutterLiveblogTestsReloader } from './tests/gutters/gutterTests';

const buildApp = async (): Promise<Express> => {
    const app = express();

    app.use(express.json({ limit: '50mb' }));
    app.use(compression());

    const dotcomDevOrigins = [
        // see: https://github.com/guardian/dotcom-rendering/blob/f05969110b0ab9af18041bbe537f93f98d28ad8f/dotcom-rendering/scripts/nginx/setup.sh#L11
        'https://r.thegulocal.com',
        'http://localhost:3030',
        'http://localhost:9000',
    ];
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

    const stage =
        process.env.stage === 'CODE' ? 'CODE' : process.env.stage === 'DEV' ? 'DEV' : 'PROD';

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
        bannerDesigns,
        gutterLiveblogTests,
    ] = await Promise.all([
        buildChannelSwitchesReloader(),
        buildSuperModeArticlesReloader(),
        buildEpicTestsReloader(),
        buildEpicLiveblogTestsReloader(),
        buildAmpEpicTestsReloader(),
        buildChoiceCardAmountsReloader(),
        buildTickerDataReloader(stage),
        buildProductPricesReloader(),
        buildBannerTestsReloader(),
        buildBannerDeployTimesReloader(),
        buildHeaderTestsReloader(),
        buildBannerDesignsReloader(),
        buildGutterLiveblogTestsReloader(),
    ]);

    const banditData = await buildBanditDataReloader(articleEpicTests, bannerTests);

    const auxiaConfig = await getAuxiaRouterConfig();

    // Build the routers
    app.use(
        buildEpicRouter(
            channelSwitches,
            superModeArticles,
            articleEpicTests,
            liveblogEpicTests,
            choiceCardAmounts,
            tickerData,
            banditData,
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
            bannerDesigns,
            banditData,
        ),
    );
    app.use(buildHeaderRouter(channelSwitches, headerTests));

    app.use('/amp', buildAmpEpicRouter(choiceCardAmounts, tickerData, ampEpicTests));

    app.use(buildAuxiaProxyRouter(auxiaConfig));

    app.use(buildGutterRouter(channelSwitches, gutterLiveblogTests));

    // The error handling middleware must be the last middleware in the chain
    // https://stackoverflow.com/questions/72227296/does-the-position-of-error-handling-middleware-matter-in-express
    app.use(errorHandlingMiddleware);

    app.get('/healthcheck', (req: express.Request, res: express.Response) => {
        res.header('Content-Type', 'text/plain');
        res.send('OK');
    });

    return Promise.resolve(app);
};

buildApp()
    .then((app) => {
        const PORT = process.env.PORT || 3030;

        const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        // keep-alive timeout should match LB idle timeout value, see https://repost.aws/knowledge-center/elb-alb-troubleshoot-502-errors
        server.keepAliveTimeout = 60000;
    })
    .catch((err) => {
        logError(`Failed to start server: ${String(err)}`);
        throw err;
    });
