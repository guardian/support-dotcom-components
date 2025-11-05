import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import { buildAuxiaProxyRouter, getAuxiaRouterConfig } from './api/auxiaProxyRouter';
import { buildBannerRouter } from './api/bannerRouter';
import { buildEpicRouter } from './api/epicRouter';
import { buildGutterRouter } from './api/gutterRouter';
import { buildHeaderRouter } from './api/headerRouter';
import { buildChannelSwitchesReloader } from './channelSwitches';
import { buildChoiceCardAmountsReloader } from './choiceCardAmounts';
import { buildTickerDataReloader } from './lib/fetchTickerData';
import { getMParticleConfig, MParticle } from './lib/mParticle';
import { getOktaConfig, Okta } from './lib/okta';
import { buildPromotionsReloader } from './lib/promotions/promotions';
import { buildSuperModeArticlesReloader } from './lib/superMode';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { buildProductCatalogReloader } from './productCatalog';
import { buildProductPricesReloader } from './productPrices';
import { buildBanditDataReloader } from './selection/banditData';
import { buildBannerDeployTimesReloader } from './tests/banners/bannerDeployTimes';
import { buildBannerDesignsReloader } from './tests/banners/bannerDesigns';
import { buildBannerTestsReloader } from './tests/banners/bannerTests';
import { buildEpicLiveblogTestsReloader, buildEpicTestsReloader } from './tests/epics/epicTests';
import { buildGutterLiveblogTestsReloader } from './tests/gutters/gutterTests';
import { buildHeaderTestsReloader } from './tests/headers/headerTests';
import { logError } from './utils/logging';

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
        choiceCardAmounts,
        tickerData,
        productPrices,
        bannerTests,
        bannerDeployTimes,
        headerTests,
        bannerDesigns,
        gutterLiveblogTests,
        productCatalog,
        promotions,
    ] = await Promise.all([
        buildChannelSwitchesReloader(),
        buildSuperModeArticlesReloader(),
        buildEpicTestsReloader(),
        buildEpicLiveblogTestsReloader(),
        buildChoiceCardAmountsReloader(),
        buildTickerDataReloader(stage),
        buildProductPricesReloader(),
        buildBannerTestsReloader(),
        buildBannerDeployTimesReloader(),
        buildHeaderTestsReloader(),
        buildBannerDesignsReloader(),
        buildGutterLiveblogTestsReloader(),
        buildProductCatalogReloader(),
        buildPromotionsReloader(),
    ]);

    const banditData = await buildBanditDataReloader(articleEpicTests, bannerTests);

    const auxiaConfig = await getAuxiaRouterConfig();

    const mParticleConfig = await getMParticleConfig();
    const mParticle = new MParticle(mParticleConfig);

    const oktaConfig = await getOktaConfig();
    const okta = new Okta(oktaConfig);

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
            productCatalog,
            promotions,
            mParticle,
            okta,
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
            productCatalog,
            promotions,
        ),
    );
    app.use(buildHeaderRouter(channelSwitches, headerTests));

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
        const PORT = process.env.PORT ?? 3030;

        const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        // keep-alive timeout should match LB idle timeout value, see https://repost.aws/knowledge-center/elb-alb-troubleshoot-502-errors
        server.keepAliveTimeout = 60000;
    })
    .catch((err) => {
        logError(`Failed to start server: ${String(err)}`);
        throw err;
    });
