import express from 'express';
import { fetchConfiguredEpicTests } from './api/contributionsApi';
import { cacheAsync } from './lib/cache';
import {
    EpicPageTracking,
    EpicTestTracking,
    EpicTargeting,
} from './components/modules/epics/ContributionsEpicTypes';
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
import { EpicProps } from './components/modules/epics/ContributionsEpic';
import { isProd, isDev, baseUrl } from './lib/env';
import { addTickerDataToSettings, addTickerDataToVariant } from './lib/fetchTickerData';
import {
    BannerPageTracking,
    BannerTestTracking,
    BannerTargeting,
    BannerProps,
} from './types/BannerTypes';
import { selectBannerTest } from './tests/banners/bannerSelection';
import { AusMomentContributionsBannerPath } from './tests/banners/AusMomentContributionsBannerTest';
import { DefaultContributionsBannerPath } from './tests/banners/DefaultContributionsBannerTest';
import { DigitalSubscriptionsBannerPath } from './tests/banners/DigitalSubscriptionsBannerTest';
import { GuardianWeeklyBannerPath } from './tests/banners/GuardianWeeklyBannerTest';
import { AusMomentThankYouBannerPath } from './tests/banners/AusMomentThankYouBannerTest';
import { getCachedTests } from './tests/banners/bannerTests';
import { bannerDeployCaches } from './tests/banners/bannerDeployCache';

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

const [, fetchConfiguredEpicTestsCached] = cacheAsync(
    fetchConfiguredEpicTests,
    60,
    'fetchConfiguredEpicTests',
);

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
        componentType: 'ACQUISITIONS_EPIC',
        products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
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
    const selectedTest = await selectBannerTest(
        targeting,
        pageTracking,
        baseUrl(req),
        getCachedTests,
        bannerDeployCaches,
        params.force,
    );

    if (selectedTest) {
        const { test, variant, moduleUrl, moduleName } = selectedTest;

        const testTracking: BannerTestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: buildBannerCampaignCode(test, variant),
            componentType: test.componentType,
            ...(test.products && { products: test.products }),
        };

        const tickerSettings = variant.tickerSettings
            ? await addTickerDataToSettings(variant.tickerSettings)
            : undefined;

        const props: BannerProps = {
            tracking: { ...pageTracking, ...testTracking },
            isSupporter: !targeting.showSupportMessaging,
            countryCode: targeting.countryCode,
            content: variant.bannerContent,
            tickerSettings,
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

// TODO replace with module-friendly solution
/* app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { pageTracking, targeting } = testData;
            const params = getQueryParams(req);
            const data = await buildEpicData(pageTracking, targeting, params, baseUrl(req));
            const moduleUrl = data.data?.module.url;
            const js = import(moduleUrl);

            // server-side render react
            const htmlDoc = renderHtmlDocument({ html, css, js });
            res.send(htmlDoc);
        } catch (error) {
            next(error);
        }
    },
); */

app.post(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (!isProd) {
                validateEpicPayload(req.body);
            }

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);
            const response = await buildEpicData(tracking, targeting, params, baseUrl(req));

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
                subscriptionBannerLastClosedAt: payload.targeting.subscriptionBannerLastClosedAt,
                isPaidContent: payload.targeting.isPaidContent,
                switches: {
                    remoteSubscriptionsBanner: payload.targeting.switches.remoteSubscriptionsBanner,
                },
            };

            res.send(response);
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

// ES module endpoints
app.get(
    '/epic.js',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev ? '/../dist/modules/epics/Epic.js' : '/modules/epics/Epic.js';
            const module = await fs.promises.readFile(__dirname + path);
            res.type('js');
            setComponentCacheHeaders(res);
            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    `/${AusMomentContributionsBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/banners/ausMomentContributionsBanner/AusMomentContributionsBanner.js'
                : '/modules/banners/ausMomentContributionsBanner/AusMomentContributionsBanner.js';
            const module = await fs.promises.readFile(__dirname + path);

            res.type('js');
            setComponentCacheHeaders(res);

            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    `/${DefaultContributionsBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/banners/contributions/ContributionsBanner.js'
                : '/modules/banners/contributions/ContributionsBanner.js';
            const module = await fs.promises.readFile(__dirname + path);

            res.type('js');
            setComponentCacheHeaders(res);

            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    `/${DigitalSubscriptionsBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/banners/digitalSubscriptions/DigitalSubscriptionsBanner.js'
                : '/modules/banners/digitalSubscriptions/DigitalSubscriptionsBanner.js';
            const module = await fs.promises.readFile(__dirname + path);

            res.type('js');
            setComponentCacheHeaders(res);

            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    `/${GuardianWeeklyBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/banners/guardianWeekly/GuardianWeeklyBanner.js'
                : '/modules/banners/guardianWeekly/GuardianWeeklyBanner.js';
            const module = await fs.promises.readFile(__dirname + path);

            res.type('js');
            setComponentCacheHeaders(res);

            res.send(module);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    `/${AusMomentThankYouBannerPath}`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const path = isDev
                ? '/../dist/modules/banners/ausMomentThankYouBanner/AusMomentThankYouBanner.js'
                : '/modules/banners/ausMomentThankYouBanner/AusMomentThankYouBanner.js';
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
    if (process.env.log_compare_variants !== 'true') {
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
        platformId: 'GUARDIAN_WEB',
        clientName: 'xxx',
        referrerUrl: 'https://theguardian.com',
    };

    const got = await buildEpicData(fakeTracking, targeting, {}, baseUrl(req));

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export { app };
