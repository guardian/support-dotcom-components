import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent, fetchConfiguredEpicTests } from './api/contributionsApi';
import { cacheAsync } from './lib/cache';
import { ContributionsEpic } from './components/ContributionsEpic';
import {
    EpicPageTracking,
    EpicTestTracking,
    EpicTracking,
    EpicTargeting,
    EpicPayload,
} from './components/ContributionsEpicTypes';
import { shouldNotRenderEpic } from './lib/targeting';
import testData from './components/ContributionsEpic.testData';
import cors from 'cors';
import { Validator } from 'jsonschema';
import * as fs from 'fs';
import * as path from 'path';
import { Test, findTestAndVariant, withinMaxViews } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import { buildCampaignCode } from './lib/tracking';

const schemaPath = path.join(__dirname, 'schemas', 'epicPayload.schema.json');
const epicPayloadSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
console.log('Loaded epic payload JSON schema');

// Use middleware
const app = express();
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', cors());

// Logging
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.on('finish', () =>
        console.log(
            JSON.stringify({
                status: res.statusCode,
                method: req.method,
                path: req.path,
                didRenderEpic: res.locals.didRenderEpic,
                clientName: res.locals.clientName || 'unknown',
            }),
        ),
    );
    next();
});

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

interface Epic {
    html: string;
    css: string;
    meta: EpicTestTracking;
}

const fiveMinutes = 60 * 5;
const [, fetchDefaultEpicContentCached] = cacheAsync(fetchDefaultEpicContent, fiveMinutes);
const [, fetchConfiguredEpicTestsCached] = cacheAsync(fetchConfiguredEpicTests, 60);

const logTargeting = (message: string): void => {
    if (process.env.LOG_TARGETING === 'true') {
        console.log(message);
    }
};

// Return the HTML and CSS from rendering the Epic to static markup
const buildEpic = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
): Promise<Epic | null> => {
    if (
        shouldNotRenderEpic(targeting) ||
        !withinMaxViews(targeting.epicViewLog || []).test({} as Test, targeting) // Note {} as Test is really flaky but is just for while we run the default Epic
    ) {
        logTargeting(`Renders Epic false for targeting: ${JSON.stringify(targeting)}`);
        return null;
    }

    const variant = await fetchDefaultEpicContentCached();
    const testName = 'FrontendDotcomRenderingEpic';
    const campaign = 'frontend_dotcom_rendering_epic';
    const variantName = pageTracking.clientName; // dcr || frontend

    const testTracking: EpicTestTracking = {
        abTestName: testName,
        abTestVariant: variantName,
        campaignCode: `gdnwb_copts_memco_${campaign}_${variantName}`,
        campaignId: campaign,
    };

    const tracking: EpicTracking = {
        ...pageTracking,
        ...testTracking,
    };

    // Hardcoding the number of weeks to match common values used in the tests.
    // We know the copy refers to 'articles viewed in past 4 months' and this
    // will show a count for the past year, but this seems to mirror Frontend
    // and an accurate match between the view counts used for variant selection
    // and template rendering is not necessarily essential.
    const periodInWeeks = 52;
    const numArticles = getArticleViewCountForWeeks(targeting.weeklyArticleHistory, periodInWeeks);

    const { html, css } = extractCritical(
        renderToStaticMarkup(
            <ContributionsEpic
                variant={variant}
                countryCode={targeting.countryCode}
                tracking={tracking}
                numArticles={numArticles}
            />,
        ),
    );

    logTargeting(`Renders Epic true for targeting: ${JSON.stringify(targeting)}`);

    return {
        html,
        css,
        meta: testTracking,
    };
};

// Return the HTML and CSS from rendering the Epic to static markup
const buildDynamicEpic = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
): Promise<Epic | null> => {
    const tests = await fetchConfiguredEpicTestsCached();
    const result = findTestAndVariant(tests, targeting);

    if (!result) {
        logTargeting(`Renders Epic false for targeting: ${JSON.stringify(targeting)}`);
        return null;
    }

    const { test, variant } = result;

    const testTracking: EpicTestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: test.name,
    };

    const tracking: EpicTracking = {
        ...pageTracking,
        ...testTracking,
    };

    // Hardcoding the number of weeks to match common values used in the tests.
    // We know the copy refers to 'articles viewed in past 4 months' and this
    // will show a count for the past year, but this seems to mirror Frontend
    // and an accurate match between the view counts used for variant selection
    // and template rendering is not necessarily essential.
    const periodInWeeks = 52;
    const numArticles = getArticleViewCountForWeeks(targeting.weeklyArticleHistory, periodInWeeks);

    const { html, css } = extractCritical(
        renderToStaticMarkup(
            <ContributionsEpic
                variant={variant}
                countryCode={targeting.countryCode}
                tracking={tracking}
                numArticles={numArticles}
            />,
        ),
    );

    logTargeting(`Renders Epic true for targeting: ${JSON.stringify(targeting)}`);

    return {
        html,
        css,
        meta: {
            ...testTracking,
        },
    };
};

class ValidationError extends Error {}
const validator = new Validator(); // reuse as expensive to initialise

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePayload = (body: any): EpicPayload => {
    const validation = validator.validate(body, epicPayloadSchema);

    if (!validation.valid) {
        throw new ValidationError(validation.toString());
    }

    return body as EpicPayload;
};

const shouldSelectTestDynamically = (): boolean => process.env.ENABLE_DYNAMIC_TESTS === 'true';

app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { pageTracking, targeting } = testData;

            const epic = shouldSelectTestDynamically()
                ? await buildDynamicEpic(pageTracking, targeting)
                : await buildEpic(pageTracking, targeting);

            const { html, css } = epic ?? { html: '', css: '' };
            const htmlContent = renderHtmlDocument({ html, css });
            res.send(htmlContent);
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (process.env.NODE_ENV !== 'production') {
                validatePayload(req.body);
            }

            const { tracking, targeting } = req.body;

            const epic = shouldSelectTestDynamically()
                ? await buildDynamicEpic(tracking, targeting)
                : await buildEpic(tracking, targeting);

            // for response logging
            res.locals.didRenderEpic = !!epic;
            res.locals.clientName = tracking.clientName;

            res.send({ data: epic });
        } catch (error) {
            next(error);
        }
    },
);

app.post(
    '/epic/compare-variant-decision',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

        // Ignore some manually defined tests in Frontend for now
        const ignores = [
            'FrontendDotcomRenderingEpic',
            'RemoteRenderEpicRoundTwo',
            'ContributionsEpicPrecontributionReminderRoundTwo',
        ];

        if (ignores.includes(expectedTest)) {
            res.send('ignoring');
            return;
        }

        // We need these to satisfy the buildDynamicEpic interface, but it
        // doesn't matter what values we use
        const sampleTracking = {
            ophanPageId: 'xxxxxxxxxxxxx',
            ophanComponentId: 'ACQUISITIONS_EPIC',
            platformId: 'GUARDIAN_WEB',
            clientName: 'xxx',
            referrerUrl: 'https://theguardian.com',
        };

        const got = await buildDynamicEpic(sampleTracking, targeting);

        const notBothFalsy = expectedTest || got;
        const gotTestName = got?.meta?.abTestName;
        const gotVariantName = got?.meta?.abTestVariant;
        const gotCampaignCode = got?.meta?.campaignCode;
        const gotCampaignId = got?.meta?.campaignId;

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
    },
);

// Error handling middleware in Express needs to take 4 arguments in the handler
// for it to run when `next()` function is called in the route handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { message } = error;

    switch (error.constructor) {
        case ValidationError:
            res.status(400).send({ error: message });
            break;
        default:
            res.status(500).send({ error: message });
    }

    console.log('Something went wrong: ', message);
});

// If local then don't wrap in serverless
const PORT = process.env.PORT || 3030;
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} else {
    const server = awsServerlessExpress.createServer(app);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exports.handler = (event: any, context: Context): void => {
        awsServerlessExpress.proxy(server, event, context);
    };
}

export { app };
