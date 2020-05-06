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
    EpicTracking,
    EpicTargeting,
} from './components/ContributionsEpicTypes';
import testData from './components/ContributionsEpic.testData';
import cors from 'cors';
import { validatePayload } from './lib/validation';
import { findTestAndVariant } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import { buildCampaignCode } from './lib/tracking';
import {
    errorHandling as errorHandlingMiddleware,
    logging as loggingMiddleware,
} from './middleware';
import { getAllHardcodedTests } from './tests';
import { logTargeting } from './lib/logging';

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

interface Response {
    html: string;
    css: string;
    js: string;
    meta: EpicTestTracking;
}

const [, fetchConfiguredEpicTestsCached] = cacheAsync(fetchConfiguredEpicTests, 60);

const componentAsResponse = (componentWrapper: JsComponent, meta: EpicTestTracking): Response => {
    const { el, js } = componentWrapper;
    const { html, css } = extractCritical(renderToStaticMarkup(el));

    return {
        html,
        css,
        js,
        meta,
    };
};

const buildEpic = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
): Promise<Response | null> => {
    const configuredTests = await fetchConfiguredEpicTestsCached();
    const hardcodedTests = await getAllHardcodedTests();
    const tests = [...configuredTests.tests, ...hardcodedTests];
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
        campaignId: test.campaignId || test.name,
    };

    const tracking: EpicTracking = {
        ...pageTracking,
        ...testTracking,
    };

    const numArticles = getArticleViewCountForWeeks(targeting.weeklyArticleHistory);
    const { countryCode } = targeting;

    const props = {
        variant,
        tracking,
        numArticles,
        countryCode,
    };

    logTargeting(`Renders Epic true for targeting: ${JSON.stringify(targeting)}`);

    return componentAsResponse(getEpic(props), testTracking);
};

app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { pageTracking, targeting } = testData;
            const epic = await buildEpic(pageTracking, targeting);
            const { html, css, js } = epic ?? { html: '', css: '', js: '' };
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
            if (process.env.NODE_ENV !== 'production') {
                validatePayload(req.body);
            }

            const { tracking, targeting } = req.body;
            const epic = await buildEpic(tracking, targeting);

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

        const got = await buildEpic(sampleTracking, targeting);

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

app.use(errorHandlingMiddleware);

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
