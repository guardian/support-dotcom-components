import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent } from './api/contributionsApi';
import {
    ContributionsEpic,
    EpicTracking,
    EpicLocalisation,
    EpicTargeting,
} from './components/ContributionsEpic';
import { shouldRenderEpic } from './lib/targeting';
import testData from './components/ContributionsEpic.testData';
import cors from 'cors';

// Pre-cache API response
fetchDefaultEpicContent();

// Use middleware
const app = express();
app.use(express.urlencoded());
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', cors());

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

interface ResponseType {
    html: string;
    css: string;
}

// Return a metadata object safe to be consumed by the Epic component
const buildTracking = (req: express.Request): EpicTracking => {
    const {
        ophanPageId,
        ophanComponentId,
        platformId,
        campaignCode,
        abTestName,
        abTestVariant,
        referrerUrl,
    } = req.body.tracking;

    return {
        ophanPageId,
        ophanComponentId,
        platformId,
        campaignCode,
        abTestName,
        abTestVariant,
        referrerUrl,
    };
};

const buildLocalisation = (req: express.Request): EpicLocalisation => {
    const { countryCode } = req.body.localisation;
    return { countryCode };
};

const buildTargeting = (req: express.Request): EpicTargeting => {
    const {
        contentType,
        sectionName,
        shouldHideReaderRevenue,
        isMinuteArticle,
        isPaidContent,
        tags,
    } = req.body.targeting;

    return {
        contentType,
        sectionName,
        shouldHideReaderRevenue,
        isMinuteArticle,
        isPaidContent,
        tags,
    };
};

// Return the HTML and CSS from rendering the Epic to static markup
const buildEpic = async (
    tracking: EpicTracking,
    localisation: EpicLocalisation,
    targeting: EpicTargeting,
): Promise<ResponseType> => {
    const { heading, paragraphs, highlighted } = await fetchDefaultEpicContent();
    const content = {
        heading,
        paragraphs,
        highlighted,
    };

    // Determine whether to render the Epic or return empty HTML and CSS
    if (shouldRenderEpic(targeting)) {
        const { html, css } = extractCritical(
            renderToStaticMarkup(
                <ContributionsEpic
                    content={content}
                    tracking={tracking}
                    localisation={localisation}
                />,
            ),
        );
        return { html, css };
    }

    return { html: '', css: '' };
};

app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { tracking, localisation, targeting } = testData;
            const { html, css } = await buildEpic(tracking, localisation, targeting);
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
            const tracking = buildTracking(req);
            const localisation = buildLocalisation(req);
            const targeting = buildTargeting(req);
            const { html, css } = await buildEpic(tracking, localisation, targeting);
            res.send({ html, css });
        } catch (error) {
            next(error);
        }
    },
);

// Error handling middleware in Express needs to take 4 arguments in the handler
// for it to run when `next()` function is called in the route handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Something went wrong: ', error.message);
    res.status(500).send({ error: error.message });
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
