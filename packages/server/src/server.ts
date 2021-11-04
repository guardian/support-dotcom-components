import fs from 'fs';
import { ModuleInfo, moduleInfos } from '@sdc/shared/config';
import {
    buildAmpEpicCampaignCode,
    countryCodeToCountryGroupId,
    getLocalCurrencySymbol,
} from '@sdc/shared/lib';
import {
    EpicType,
    OphanComponentEvent,
    OneOffSignupRequest,
    WeeklyArticleLog,
} from '@sdc/shared/types';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import { setOneOffReminderEndpoint } from './api/supportRemindersApi';
import { getAmpVariantAssignments } from './lib/ampVariantAssignments';
import { baseUrl, isDev, isProd } from './lib/env';
import { getQueryParams } from './lib/params';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { buildBannerData, buildEpicData, buildHeaderData, buildPuzzlesData } from './payloads';
import { ampEpic } from './tests/amp/ampEpic';
import { getAmpExperimentData } from './tests/amp/ampEpicTests';
import { logInfo } from './utils/logging';
import { cachedChoiceCardAmounts } from './choiceCardAmounts';
import { buildReminderFields } from '@sdc/shared/lib';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(compression());

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', [cors()]);

app.use(loggingMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

app.post(
    '/epic',
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<void> => {
        try {
            const epicType: EpicType = 'ARTICLE';

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req.query);
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
            res.locals.epicTargeting = {
                weeklyArticleHistory: (targeting.weeklyArticleHistory ?? [])
                    .slice(0, 3)
                    .map((c: WeeklyArticleLog) => JSON.stringify(c)),
            };

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
            const epicType: EpicType = 'LIVEBLOG';

            const { tracking, targeting } = req.body;
            const params = getQueryParams(req.query);
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
            const { tracking, targeting } = req.body;
            const params = getQueryParams(req.query);

            const response = await buildBannerData(tracking, targeting, params, req);

            // for response logging
            res.locals.didRenderBanner = !!response.data;
            res.locals.clientName = tracking.clientName;
            // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
            res.locals.bannerTargeting = {
                shouldHideReaderRevenue: targeting.shouldHideReaderRevenue,
                showSupportMessaging: targeting.showSupportMessaging,
                alreadyVisitedCount: targeting.alreadyVisitedCount,
                countryCode: targeting.countryCode,
                engagementBannerLastClosedAt: targeting.engagementBannerLastClosedAt,
                subscriptionBannerLastClosedAt: targeting.subscriptionBannerLastClosedAt,
                isPaidContent: targeting.isPaidContent,
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
    const gotTestName = got.data?.meta.abTestName;
    const gotVariantName = got.data?.meta.abTestVariant;
    const gotCampaignCode = got.data?.meta.campaignCode;
    const gotCampaignId = got.data?.meta.campaignId;

    const notTheSame =
        gotTestName !== expectedTest ||
        gotVariantName !== expectedVariant ||
        gotCampaignCode !== expectedCampaignCode ||
        gotCampaignId !== expectedCampaignId;

    if (notBothFalsy && notTheSame) {
        logInfo(
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
            const countryCode = req.header('X-GU-GeoIP-Country-Code') || 'GB';
            const countryGroupId = countryCodeToCountryGroupId(countryCode);
            const choiceCardAmounts = await cachedChoiceCardAmounts();
            const ampVariantAssignments = getAmpVariantAssignments(req);
            const epic = await ampEpic(ampVariantAssignments, countryCode);
            const acquisitionData = {
                source: 'GOOGLE_AMP',
                componentType: 'ACQUISITIONS_EPIC',
                componentId: epic.cta.componentId,
                campaignCode: epic.cta.campaignCode,
                abTest: {
                    name: epic.testName,
                    variant: epic.variantName,
                },
                referrerUrl: req.query.webUrl,
            };
            const ampState = {
                ctaUrl: `${epic.cta.url}?INTCMP=${
                    epic.cta.campaignCode
                }&acquisitionData=${JSON.stringify(acquisitionData)}`,
                reminder: {
                    ...buildReminderFields(),
                    hideButtons: false,
                    hideReminderWrapper: true,
                    hideSuccessMessage: true,
                    hideFailureMessage: true,
                    hideReminderCta: false,
                    hideReminderForm: false,
                },
                choiceCards: epic.showChoiceCards
                    ? {
                          choiceCardSelection: {
                              frequency: 'MONTHLY',
                              amount:
                                  choiceCardAmounts[countryGroupId]['control']['MONTHLY']
                                      .amounts[1],
                          },
                          amounts: {
                              ONE_OFF: choiceCardAmounts[countryGroupId]['control'][
                                  'ONE_OFF'
                              ].amounts.slice(0, 2),
                              MONTHLY: choiceCardAmounts[countryGroupId]['control'][
                                  'MONTHLY'
                              ].amounts.slice(0, 2),
                              ANNUAL: choiceCardAmounts[countryGroupId]['control'][
                                  'ANNUAL'
                              ].amounts.slice(0, 2),
                          },
                          choiceCardLabelSuffix: {
                              ONE_OFF: '',
                              MONTHLY: ' per month',
                              ANNUAL: ' per year',
                          },
                          classNames: {
                              choiceCard: 'epicChoiceCard',
                              choiceCardSelected: 'epicChoiceCard epicChoiceCardSelected',
                          },
                          currencySymbol: getLocalCurrencySymbol(countryCode),
                      }
                    : false,
            };

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'private, no-store');
            res.setHeader('Surrogate-Control', 'max-age=0');

            res.json({ ...epic, ...ampState });
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
    const response = await buildPuzzlesData(tracking, targeting, req.params, req);

    // for response logging
    res.locals.didRenderBanner = !!response.data;
    res.locals.clientName = tracking.clientName;
    // be specific about which fields to log, to avoid accidentally logging inappropriate things in future
    res.locals.bannerTargeting = {
        shouldHideReaderRevenue: targeting.shouldHideReaderRevenue,
        showSupportMessaging: targeting.showSupportMessaging,
        alreadyVisitedCount: targeting.alreadyVisitedCount,
        countryCode: targeting.countryCode,
        engagementBannerLastClosedAt: targeting.engagementBannerLastClosedAt,
        subscriptionBannerLastClosedAt: targeting.subscriptionBannerLastClosedAt,
        isPaidContent: targeting.isPaidContent,
    };
    res.send(response);
});

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export { app };
