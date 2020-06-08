import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchConfiguredEpicTests } from './api/contributionsApi';
import { cacheAsync } from './lib/cache';
import { JsComponent, getEpic } from './components/ContributionsEpic';
import {
    EpicPageTracking,
    EpicTestTracking,
    EpicTargeting,
} from './components/ContributionsEpicTypes';
import testData from './components/ContributionsEpic.testData';
import cors from 'cors';
import { validatePayload } from './lib/validation';
import { findTestAndVariant, Result, Debug, Variant } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import { buildCampaignCode } from './lib/tracking';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { getAllHardcodedTests } from './tests';
import { logTargeting } from './lib/logging';
import { getQueryParams, Params } from './lib/params';
import { ampDefaultEpic } from './tests/ampDefaultEpic';
import fs from 'fs';
import { EpicProps } from './components/modules/ContributionsEpic';
import { isProd, isDev } from './lib/env';

const app = express();
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', cors());

app.use(loggingMiddleware);

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

interface DataResponse {
    data?: {
        module: {
            url: string;
            props: EpicProps;
        };
        variant: Variant;
        meta: EpicTestTracking;
    };
    debug?: Debug;
}

interface MarkupResponse {
    data?: { html: string; css: string; js: string; meta: EpicTestTracking };
    debug?: Debug;
}

const [, fetchConfiguredEpicTestsCached] = cacheAsync(fetchConfiguredEpicTests, 60);

const asResponse = (
    component: JsComponent,
    meta: EpicTestTracking,
    debug?: Debug,
): MarkupResponse => {
    const { el, js } = component;
    const { html, css } = extractCritical(renderToStaticMarkup(el));
    return { data: { html, css, js, meta }, debug };
};

const buildEpic = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
    params: Params,
): Promise<MarkupResponse> => {
    const configuredTests = await fetchConfiguredEpicTestsCached();
    const hardcodedTests = await getAllHardcodedTests();
    const tests = [...configuredTests.tests, ...hardcodedTests];

    let result: Result;

    if (params.force) {
        const test = tests.find(test => test.name === params.force?.testName);
        const variant = test?.variants.find(v => v.name === params.force?.variantName);
        result = test && variant ? { result: { test, variant } } : {};
    } else {
        result = findTestAndVariant(tests, targeting, params.debug);
    }

    logTargeting(
        `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(targeting)}`,
    );

    if (!result.result) {
        return { debug: result.debug };
    }

    const { test, variant } = result.result;

    const testTracking: EpicTestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: `epic_${test.campaignId || test.name}`,
    };

    const props = {
        variant,
        tracking: { ...pageTracking, ...testTracking },
        numArticles: getArticleViewCountForWeeks(targeting.weeklyArticleHistory),
        countryCode: targeting.countryCode,
    };

    return asResponse(getEpic(props), testTracking, result.debug);
};

const buildEpicData = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
    params: Params,
    baseUrl: string,
): Promise<DataResponse> => {
    const configuredTests = await fetchConfiguredEpicTestsCached();
    const hardcodedTests = await getAllHardcodedTests();
    const tests = [...configuredTests.tests, ...hardcodedTests];

    let result: Result;

    if (params.force) {
        const test = tests.find(test => test.name === params.force?.testName);
        const variant = test?.variants.find(v => v.name === params.force?.variantName);
        result = test && variant ? { result: { test, variant } } : {};
    } else {
        result = findTestAndVariant(tests, targeting, params.debug);
    }

    logTargeting(
        `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(targeting)}`,
    );

    if (!result.result) {
        return { data: undefined, debug: result.debug };
    }

    const { test, variant } = result.result;

    const testTracking: EpicTestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: `epic_${test.campaignId || test.name}`,
    };

    const props: EpicProps = {
        variant,
        tracking: { ...pageTracking, ...testTracking },
        numArticles: getArticleViewCountForWeeks(targeting.weeklyArticleHistory),
        countryCode: targeting.countryCode,
    };

    const moduleUrl = `${baseUrl}/epic.js`;

    return {
        data: {
            variant,
            meta: testTracking,
            module: {
                url: moduleUrl,
                props,
            },
        },
        debug: result.debug,
    };
};

// TODO implement this stub
const buildBannerData = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
    params: Params,
    req: express.Request,
): Promise<{}> => {
    //TODO create return types specific to the banner
    const moduleUrl = `${req.protocol}://${req.get('Host')}/banner.js`;

    return {
        data: {
            module: {
                url: moduleUrl,
                props: {},
            },
        },
    };
};

// Pre-ES module endpoints (expected to be removed once module approach is validated)
app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { pageTracking, targeting } = testData;
            const params = getQueryParams(req);
            const epic = await buildEpic(pageTracking, targeting, params);
            const { html, css, js } = epic.data ?? { html: '', css: '', js: '' };
            const htmlDoc = renderHtmlDocument({ html, css, js });
            res.send(htmlDoc);
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (!isProd) {
                validatePayload(req.body);
            }

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);

            let response;

            // If modules are validated, we can remove the non-data branch along with this query param
            if (req.query.dataOnly) {
                const baseUrl = req.protocol + '://' + req.get('host');
                response = await buildEpicData(tracking, targeting, params, baseUrl);
            } else {
                response = await buildEpic(tracking, targeting, params);
            }

            // for response logging
            res.locals.didRenderEpic = !!response.data;
            res.locals.clientName = tracking.clientName;

            res.send(response);
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/banner',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // TODO: validate payload using an appropriate json schema
            // if (process.env.NODE_ENV !== 'production') {
            //     validatePayload(req.body);
            // }

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);

            const response = await buildBannerData(tracking, targeting, params, req);

            // TODO for response logging
            // res.locals.didRenderBanner = !!response.data;
            // res.locals.clientName = tracking.clientName;

            res.send(response);
        } catch (error) {
            next(error);
        }
    },
);

// ES module endpoints
app.get(
    '/epic.js',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isProd ? '/modules/Epic.js' : '/../dist/modules/Epic.js';
            const module = await fs.promises.readFile(__dirname + path);
            res.type('js');
            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    '/banner.js',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isProd ? '/modules/Banner.js' : '/../dist/modules/Banner.js';
            const module = await fs.promises.readFile(__dirname + path);
            res.type('js');
            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

// TODO remove once migration complete
app.post('/epic/compare-variant-decision', async (req: express.Request, res: express.Response) => {
    if (process.env.LOG_COMPARE_VARIANTS !== 'true') {
        res.send('ignoring');
        return;
    }

    const {
        targeting,
        expectedTest,
        expectedVariant,
        expectedCampaignCode,
        expectedCampaignId,
        frontendLog,
    } = req.body;

    const ignores = [
        'FrontendDotcomRenderingEpic',
        'RemoteRenderEpicRoundTwo',
        'ContributionsEpicPrecontributionReminderRoundTwo',
    ];

    if (ignores.includes(expectedTest)) {
        res.send('ignoring');
        return;
    }

    const fakeTracking = {
        ophanPageId: 'xxxxxxxxxxxxx',
        ophanComponentId: 'ACQUISITIONS_EPIC',
        platformId: 'GUARDIAN_WEB',
        clientName: 'xxx',
        referrerUrl: 'https://theguardian.com',
    };

    const got = await buildEpic(fakeTracking, targeting, {});

    const notBothFalsy = expectedTest || got;
    const gotTestName = got.data?.meta?.abTestName;
    const gotVariantName = got.data?.meta?.abTestVariant;
    const gotCampaignCode = got.data?.meta?.campaignCode;
    const gotCampaignId = got.data?.meta?.campaignId;

    const notTheSame =
        gotTestName !== expectedTest ||
        gotVariantName !== expectedVariant ||
        gotCampaignCode !== expectedCampaignCode ||
        gotCampaignId !== expectedCampaignId;

    if (notBothFalsy && notTheSame) {
        console.log(
            'comparison failed with data: ' +
                JSON.stringify({
                    status: 'comparison failed',
                    got: `${gotTestName}:${gotVariantName}:${gotCampaignCode}:${gotCampaignId}`,
                    want: `${expectedTest}:${expectedVariant}:${expectedCampaignCode}:${expectedCampaignId}`,
                    targeting,
                    frontendLog,
                }),
        );
    }

    res.send('thanks');
});

app.get(
    '/amp/epic',
    cors({
        origin: [
            'https://amp-theguardian-com.cdn.ampproject.org',
            'https://amp.theguardian.com',
            'http://localhost:3030',
        ],
        credentials: true,
        allowedHeaders: ['x-gu-geoip-country-code'],
    }),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // We use the fastly geo header for determining the correct currency symbol
            const countryCode = req.header('X-GU-GeoIP-Country-Code');
            const response = ampDefaultEpic(countryCode);

            // The cache key in fastly is the X-GU-GeoIP-Country-Code header
            res.setHeader('Surrogate-Control', 'max-age=300');
            res.setHeader('Cache-Control', 'max-age=60');
            res.setHeader('Content-Type', 'application/json');

            res.send(JSON.stringify(response));
        } catch (error) {
            next(error);
        }
    },
);

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3030;

if (isDev) {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} else {
    const server = awsServerlessExpress.createServer(app);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exports.handler = (event: any, context: Context): void => {
        awsServerlessExpress.proxy(server, event, context);
    };
}

export { app };
