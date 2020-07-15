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
import { validateEpicPayload, validateBannerPayload } from './lib/validation';
import { findTestAndVariant, Result, Debug, Variant } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import { buildBannerCampaignCode, buildCampaignCode } from './lib/tracking';
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
import { isProd, isDev, baseUrl } from './lib/env';
import { addTickerDataToSettings, addTickerDataToVariant } from './lib/fetchTickerData';
import { BannerPageTracking, BannerTestTracking, BannerTargeting } from './components/BannerTypes';
import { BannerProps } from './components/modules/Banner';
import { selectBannerTest } from './tests/banners/bannerSelection';
import { AusMomentContributionsBannerPath } from './tests/banners/AusMomentContributionsBannerTest';

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

interface EpicDataResponse {
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

interface BannerDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: BannerProps;
        };
        meta: BannerTestTracking;
    };
    debug?: Debug;
}

interface MarkupResponse {
    data?: { html: string; css: string; js: string; meta: EpicTestTracking };
    debug?: Debug;
}

const [, fetchConfiguredEpicTestsCached] = cacheAsync(
    fetchConfiguredEpicTests,
    60,
    'fetchConfiguredEpicTests',
);

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
): Promise<EpicDataResponse> => {
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

    const variantWithTickerData = await addTickerDataToVariant(variant);

    const testTracking: EpicTestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: `epic_${test.campaignId || test.name}`,
    };

    const props: EpicProps = {
        variant: variantWithTickerData,
        tracking: { ...pageTracking, ...testTracking },
        numArticles: getArticleViewCountForWeeks(targeting.weeklyArticleHistory),
        countryCode: targeting.countryCode,
    };

    const moduleUrl = `${baseUrl}/epic.js`;

    return {
        data: {
            variant: variantWithTickerData,
            meta: testTracking,
            module: {
                url: moduleUrl,
                props,
            },
        },
        debug: result.debug,
    };
};

const buildBannerData = async (
    pageTracking: BannerPageTracking,
    targeting: BannerTargeting,
    params: Params,
    req: express.Request,
): Promise<BannerDataResponse> => {
    const selectedTest = await selectBannerTest(targeting, pageTracking, baseUrl(req));

    if (selectedTest) {
        const { test, variant, moduleUrl, moduleName } = selectedTest;

        const testTracking: BannerTestTracking = {
            abTestName: test.name,
            abTestVariant: variant ? variant.name : null,
            campaignCode: variant ? buildBannerCampaignCode(test, variant) : null,
        };

        const tickerSettings = await (variant &&
            variant.tickerSettings &&
            addTickerDataToSettings(variant.tickerSettings));

        const props: BannerProps = {
            tracking: { ...pageTracking, ...testTracking },
            isSupporter: !targeting.showSupportMessaging,
            tickerSettings: tickerSettings || null,
        };

        return {
            data: {
                module: {
                    url: moduleUrl,
                    name: moduleName,
                    props: props,
                },
                meta: testTracking,
            },
        };
    } else {
        // No banner
        return { data: undefined };
    }
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
                validateEpicPayload(req.body);
            }

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);

            let response;

            // If modules are validated, we can remove the non-data branch along with this query param
            if (req.query.dataOnly) {
                response = await buildEpicData(tracking, targeting, params, baseUrl(req));
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
            const payload = validateBannerPayload(req.body);

            const { tracking, targeting } = payload;
            const params = getQueryParams(req);

            const response = await buildBannerData(tracking, targeting, params, req);

            // for response logging
            res.locals.didRenderBanner = !!response.data;
            res.locals.clientName = tracking.clientName;
            // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
            res.locals.bannerTargeting = {
                shouldHideReaderRevenue: payload.targeting.shouldHideReaderRevenue,
                showSupportMessaging: payload.targeting.showSupportMessaging,
                alreadyVisitedCount: payload.targeting.alreadyVisitedCount,
                countryCode: payload.targeting.countryCode,
                engagementBannerLastClosedAt: payload.targeting.engagementBannerLastClosedAt,
                isPaidContent: payload.targeting.isPaidContent,
            };

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
            const path = isDev ? '/../dist/modules/Epic.js' : '/modules/Epic.js';
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
            const path = isDev ? '/../dist/modules/Banner.js' : '/modules/Banner.js';
            const module = await fs.promises.readFile(__dirname + path);
            res.type('js');
            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

/**
 * For component endpoints only. Data endpoints must never be cached.
 * Tell fastly to cache for 5 mins
 * Tell clients to cache for 2 mins
 */
const setComponentCacheHeaders = (res: express.Response) => {
    res.setHeader('Surrogate-Control', 'max-age=300');
    res.setHeader('Cache-Control', 'max-age=120');
};

app.get(
    `/${AusMomentContributionsBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/contributionsBanners/AusMomentContributionsBanner.js'
                : '/modules/contributionsBanners/AusMomentContributionsBanner.js';
            const module = await fs.promises.readFile(__dirname + path);

            res.type('js');
            setComponentCacheHeaders(res);

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
