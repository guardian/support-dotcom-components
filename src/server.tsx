import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fetchConfiguredEpicTests } from './api/contributionsApi';
import { cacheAsync } from './lib/cache';
import {
    EpicPageTracking,
    EpicTargeting,
    EpicTestTracking,
    EpicType,
} from './components/modules/epics/ContributionsEpicTypes';
import cors from 'cors';
import { validateBannerPayload, validateEpicPayload } from './lib/validation';
import { Debug, findTestAndVariant, Result, Variant, Test } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import {
    buildAmpEpicCampaignCode,
    buildBannerCampaignCode,
    buildCampaignCode,
} from './lib/tracking';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { getAllHardcodedTests } from './tests';
import { getQueryParams, Params } from './lib/params';
import { ampEpic } from './tests/amp/ampEpic';
import fs from 'fs';
import { EpicProps } from './components/modules/epics/ContributionsEpic';
import { baseUrl, isDev, isProd } from './lib/env';
import { addTickerDataToSettings, addTickerDataToVariant } from './lib/fetchTickerData';
import {
    BannerPageTracking,
    BannerProps,
    BannerTargeting,
    BannerTestTracking,
} from './types/BannerTypes';
import { selectBannerTest } from './tests/banners/bannerSelection';
import { getCachedTests } from './tests/banners/bannerTests';
import { bannerDeployCaches } from './tests/banners/bannerDeployCache';
import {
    ModuleInfo,
    moduleInfos,
    epic as epicModule,
    liveblogEpic as liveblogEpicModule,
    puzzlesBanner,
    header,
} from './modules';
import { getAmpVariantAssignments } from './lib/ampVariantAssignments';
import { getAmpExperimentData } from './tests/amp/ampEpicTests';
import { OphanComponentEvent } from './types/OphanTypes';
import { logger } from './utils/logging';
import { OneOffSignupRequest, setOneOffReminderEndpoint } from './api/supportRemindersApi';
import {
    epicSeparateArticleCountTestEuRow,
    epicSeparateArticleCountTestUkAus,
} from './tests/epicArticleCountTest';
import { selectHeaderTest } from './tests/header/headerSelection';
import {
    HeaderPageTracking,
    HeaderTargeting,
    HeaderTestTracking,
} from './types/HeaderTypes';

const app = express();
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', [cors()]);

app.use(loggingMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));

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

const [, fetchConfiguredArticleEpicTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('ARTICLE'),
    60,
    `fetchConfiguredEpicTests_ARTICLE`,
);

const [, fetchConfiguredArticleEpicHoldbackTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('ARTICLE_HOLDBACK'),
    60,
    `fetchConfiguredEpicTests_ARTICLE_HOLDBACK`,
);

const [, fetchConfiguredLiveblogEpicTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('LIVEBLOG'),
    60,
    `fetchConfiguredEpicTests_LIVEBLOG`,
);

const getArticleEpicTests = async (mvtId: number): Promise<Test[]> => {
    const shouldHoldBack = mvtId % 100 === 0; // holdback 1% of the audience
    if (shouldHoldBack) {
        const holdback = await fetchConfiguredArticleEpicHoldbackTestsCached();
        return holdback.tests;
    }
    const regular = await fetchConfiguredArticleEpicTestsCached();
    const hardCoded = await getAllHardcodedTests();

    return [
        epicSeparateArticleCountTestUkAus,
        epicSeparateArticleCountTestEuRow,
        ...regular.tests,
        ...hardCoded,
    ];
};

const getForceableArticleEpicTests = async (): Promise<Test[]> => {
    const regular = await fetchConfiguredArticleEpicTestsCached();
    const hardCoded = await getAllHardcodedTests();
    const holdback = await fetchConfiguredArticleEpicHoldbackTestsCached();

    return [
        epicSeparateArticleCountTestUkAus,
        epicSeparateArticleCountTestEuRow,
        ...regular.tests,
        ...hardCoded,
        ...holdback.tests,
    ];
};

const getLiveblogEpicTests = async (): Promise<Test[]> => {
    const configuredTests = await fetchConfiguredLiveblogEpicTestsCached();
    return [...configuredTests.tests];
};

const buildEpicData = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
    type: EpicType,
    params: Params,
    baseUrl: string,
): Promise<EpicDataResponse> => {
    let result: Result;

    if (params.force) {
        const tests = await (type === 'ARTICLE'
            ? getForceableArticleEpicTests()
            : getLiveblogEpicTests());

        const test = tests.find(test => test.name === params.force?.testName);
        const variant = test?.variants.find(v => v.name === params.force?.variantName);
        result = test && variant ? { result: { test, variant } } : {};
    } else {
        const tests = await (type === 'ARTICLE'
            ? getArticleEpicTests(targeting.mvtId || 0)
            : getLiveblogEpicTests());

        result = findTestAndVariant(tests, targeting, type, params.debug);
    }

    if (process.env.log_targeting === 'true') {
        console.log(
            `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(targeting)}`,
        );
    }

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
        numArticles: getArticleViewCountForWeeks(
            targeting.weeklyArticleHistory,
            test.articlesViewedSettings?.periodInWeeks,
        ),
        countryCode: targeting.countryCode,
    };

    const modulePathBuilder: (version?: string) => string =
        variantWithTickerData.modulePathBuilder ||
        (type === 'ARTICLE'
            ? epicModule.endpointPathBuilder
            : liveblogEpicModule.endpointPathBuilder);

    return {
        data: {
            variant: variantWithTickerData,
            meta: testTracking,
            module: {
                url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
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
            componentType: variant.componentType,
            ...(variant.products && { products: variant.products }),
        };

        const tickerSettings = variant.tickerSettings
            ? await addTickerDataToSettings(variant.tickerSettings)
            : undefined;

        const props: BannerProps = {
            tracking: { ...pageTracking, ...testTracking },
            bannerChannel: test.bannerChannel,
            isSupporter: !targeting.showSupportMessaging,
            countryCode: targeting.countryCode,
            content: variant.bannerContent,
            mobileContent: variant.mobileBannerContent,
            numArticles: getArticleViewCountForWeeks(
                targeting.weeklyArticleHistory,
                test.articlesViewedSettings?.periodInWeeks,
            ),
            hasOptedOutOfArticleCount: targeting.hasOptedOutOfArticleCount,
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

const buildHeaderData = async (
    pageTracking: HeaderPageTracking,
    targeting: HeaderTargeting,
    baseUrl: string,
) => {
    const testSelection = await selectHeaderTest(targeting);
    if (testSelection) {
        const { test, variant } = testSelection;
        const testTracking: HeaderTestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: `${test.name}_${variant.name}`,
            componentType: 'ACQUISITIONS_HEADER',
        };
        return {
            data: {
                module: {
                    url: `${baseUrl}/${header.endpointPathBuilder(targeting.modulesVersion)}`,
                    name: header.name,
                    props: {
                        content: variant.content,
                        tracking: { ...pageTracking, ...testTracking },
                        countryCode: targeting.countryCode,
                    },
                },
            },
        };
    }
    return { data: undefined };
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

            const epicType: EpicType = 'ARTICLE';

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);
            const response = await buildEpicData(
                tracking,
                targeting,
                epicType,
                params,
                baseUrl(req),
            );

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
    '/liveblog-epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (!isProd) {
                validateEpicPayload(req.body);
            }

            const epicType: EpicType = 'LIVEBLOG';

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req);
            const response = await buildEpicData(
                tracking,
                targeting,
                epicType,
                params,
                baseUrl(req),
            );

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
            };

            res.send(response);
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/header',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { tracking, targeting } = req.body;
            const response = await buildHeaderData(tracking, targeting, baseUrl(req));
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
const setComponentCacheHeaders = (res: express.Response): void => {
    if (isProd) {
        res.setHeader('Surrogate-Control', 'max-age=300');
        res.setHeader('Cache-Control', 'max-age=120');
    }
};

// ES module endpoints
const createEndpointForModule = (moduleInfo: ModuleInfo): void => {
    app.get(
        `/${moduleInfo.endpointPathBuilder()}`,
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const module = await fs.promises.readFile(__dirname + moduleInfo.devServerPath);

                res.type('js');
                setComponentCacheHeaders(res);
                res.send(module);
            } catch (error) {
                next(error);
            }
        },
    );
};

// Only serve the modules from this server when running locally (DEV).
// In PROD/CODE we serve them from S3 via fastly.
if (isDev) {
    moduleInfos.forEach(createEndpointForModule);
}

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

    const got = await buildEpicData(fakeTracking, targeting, 'ARTICLE', {}, baseUrl(req));

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
        logger.info(
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
    '/amp/experiments_data',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const response = await getAmpExperimentData();

            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('Surrogate-Control', 'max-age=0');
            res.json(response);
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/amp/set_reminder',
    cors({
        origin: [
            'https://amp-theguardian-com.cdn.ampproject.org',
            'https://amp.theguardian.com',
            'http://localhost:3030',
            'https://amp.code.dev-theguardian.com',
        ],
        credentials: true,
        allowedHeaders: ['x-gu-geoip-country-code'],
    }),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { email, reminderDate } = req.body;
            const countryCode = req.header('X-GU-GeoIP-Country-Code');
            const reminderSignupData: OneOffSignupRequest = {
                email: email,
                reminderPeriod: reminderDate,
                reminderPlatform: 'AMP',
                reminderComponent: 'EPIC',
                reminderStage: 'PRE',
                country: countryCode,
            };
            const setReminderResponse = await fetch(setOneOffReminderEndpoint(), {
                body: JSON.stringify(reminderSignupData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            res.setHeader('Origin', req.header('Origin') || '*');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('Surrogate-Control', 'max-age=0');

            res.json(setReminderResponse.status);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    '/amp/epic',
    cors({
        origin: [
            'https://amp-theguardian-com.cdn.ampproject.org',
            'https://amp.theguardian.com',
            'http://localhost:3030',
            'https://amp.code.dev-theguardian.com',
        ],
        credentials: true,
        allowedHeaders: ['x-gu-geoip-country-code'],
    }),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // We use the fastly geo header for determining the correct currency symbol
            const countryCode = req.header('X-GU-GeoIP-Country-Code');
            const ampVariantAssignments = getAmpVariantAssignments(req);
            const response = await ampEpic(ampVariantAssignments, countryCode);

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('Surrogate-Control', 'max-age=0');

            res.json(response);
        } catch (error) {
            next(error);
        }
    },
);

app.get(
    '/amp/epic_view', // IMPORTANT: do not change this route!
    cors({
        origin: [
            'https://amp-theguardian-com.cdn.ampproject.org',
            'https://amp.theguardian.com',
            'http://localhost:3030',
            'https://amp.code.dev-theguardian.com',
        ],
        credentials: true,
        allowedHeaders: ['x-gu-geoip-country-code'],
    }),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('Surrogate-Control', 'max-age=0');

            const countryCode = req.header('X-GU-GeoIP-Country-Code');
            const ampVariantAssignments = getAmpVariantAssignments(req);
            const epic = await ampEpic(ampVariantAssignments, countryCode);
            const campaignCode = buildAmpEpicCampaignCode(epic.testName, epic.variantName);
            const { viewId, ampViewId, browserIdCookie, browserId } = req.query;

            const browserIdQuery =
                browserIdCookie && browserId ? `&${browserIdCookie}=${browserId}` : '';

            const ophanComponentEvent: OphanComponentEvent = {
                component: {
                    componentType: 'ACQUISITIONS_EPIC',
                    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
                    campaignCode: campaignCode,
                    id: campaignCode,
                },
                abTest: {
                    name: epic.testName,
                    variant: epic.variantName,
                },
                action: 'VIEW',
            };

            const ophanUrl = `https://ophan.theguardian.com/img/2?viewId=${viewId}&ampViewId=${ampViewId}${browserIdQuery}&componentEvent=${encodeURI(
                JSON.stringify(ophanComponentEvent),
            )}`;

            fetch(ophanUrl).then(ophanResponse => {
                res.json({
                    ophanUrl: ophanUrl,
                    ophanResponseStatus: ophanResponse.status,
                });
            });
        } catch (error) {
            next(error);
        }
    },
);

app.post('/puzzles', async (req: express.Request, res: express.Response) => {
    const { tracking, targeting } = req.body;
    // Exclude AB test & campaign properties that relate to the admin console; we don't care about them for puzzles
    const puzzlesTracking: Partial<BannerTestTracking> = {
        componentType: 'ACQUISITIONS_OTHER',
    };

    const response = {
        data: {
            module: {
                url: `${baseUrl(req)}/${puzzlesBanner.endpointPathBuilder(
                    targeting ? targeting.modulesVersion : targeting,
                )}`,
                name: 'PuzzlesBanner',
                props: {
                    tracking: {
                        ...tracking,
                        ...puzzlesTracking,
                    },
                },
            },
            meta: {},
        },
    };
    res.send(response);
});

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export { app };
