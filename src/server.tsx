import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent } from './api/contributionsApi';
import { ContributionsEpic, EpicMetadata } from './components/ContributionsEpic';
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
const buildMetadata = (req: express.Request): EpicMetadata => {
    const {
        ophanPageId,
        ophanComponentId,
        platformId,
        campaignCode,
        abTestName,
        abTestVariant,
        referrerUrl,
    } = req.body;

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

// Return the HTML and CSS from rendering the Epic to static markup
const buildEpic = async (metadata: EpicMetadata): Promise<ResponseType> => {
    const { heading, paragraphs, highlighted } = await fetchDefaultEpicContent();
    const content = {
        heading,
        paragraphs,
        highlighted,
    };

    const { html, css } = extractCritical(
        renderToStaticMarkup(<ContributionsEpic content={content} metadata={metadata} />),
    );

    return { html, css };
};

app.get('/epic', async (req: express.Request, res: express.Response) => {
    try {
        const { html, css } = await buildEpic(testData.metadata);
        const htmlContent = renderHtmlDocument({ html, css });
        res.send(htmlContent);
    } catch (error) {
        console.log('Something went wrong: ', error.message);
        res.status(500).send({ error: error.message });
    }
});

app.post('/epic', async (req: express.Request, res: express.Response) => {
    try {
        const metadata = buildMetadata(req);
        const { html, css } = await buildEpic(metadata);
        res.send({ html, css });
    } catch (error) {
        console.log('Something went wrong: ', error.message);
        res.status(500).send({ error: error.message });
    }
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
