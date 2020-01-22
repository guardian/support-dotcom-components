import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent } from './api/contributionsApi';
import { ContributionsEpic } from './components/ContributionsEpic';
import mocks from './components/ContributionsEpic.mocks';
import cors from 'cors';

// Pre-cache API response
fetchDefaultEpicContent();

const app = express();
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());
app.options('*', cors());

// Middleware needed to read POST data
app.use(express.urlencoded());
app.use(express.json());

const epicHandler = async (req, res): any => {
    try {
        const content = await fetchDefaultEpicContent();

        // Epic content props
        const epicContent = {
            heading: content.heading,
            paragraphs: content.paragraphs,
            highlighted: content.highlighted,
        };

        const {
            ophanPageId,
            ophanComponentId,
            platformId,
            campaignCode,
            abTestName,
            abTestVariant,
            referrerUrl,
        } = req.body ? req.body : mocks.metadata;

        // Epic metadata props
        const bodyMetadata = {
            ophanPageId,
            ophanComponentId,
            platformId,
            campaignCode,
            abTestName,
            abTestVariant,
            referrerUrl,
        };

        const epicMetadata = req.body ? bodyMetadata : mocks.metadata;

        const { html, css } = extractCritical(
            renderToStaticMarkup(
                <ContributionsEpic content={epicContent} metadata={epicMetadata} />,
            ),
        );
        if (typeof req.query.showPreview !== 'undefined') {
            const htmlContent = renderHtmlDocument({ html, css });
            res.send(htmlContent);
        } else {
            res.send({ html, css });
        }
    } catch (error) {
        console.log('Something went wrong: ', error.message);
        res.status(500).send({ error: error.message });
    }
};

app.get('/epic', epicHandler);
app.post('/epic', epicHandler);

// If local then don't wrap in serverless
const PORT = process.env.PORT || 3030;
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} else {
    const server = awsServerlessExpress.createServer(app);
    exports.handler = (event: any, context: Context) => {
        awsServerlessExpress.proxy(server, event, context);
    };
}
