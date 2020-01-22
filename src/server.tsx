import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent, DefaultEpicContent } from './api/contributionsApi';
import { DefaultEpic } from './components/DefaultEpic';
import cors from 'cors';

const bootApp = (content: DefaultEpicContent): void => {
    const app = express();
    app.use(express.json({ limit: '50mb' }));

    // Note allows *all* cors. We may want to tighten this later.
    app.use(cors());
    app.options('*', cors());

    // Middleware to read POST data
    app.use(express.urlencoded());
    app.use(express.json());

    app.post('/epic', (req, res) => {
        // Epic content props
        const epicContent = {
            heading: content.heading,
            paragraphs: content.paragraphs,
            highlighted: content.highlighted,
        };

        // Epic metadata props
        const epicMetadata = {
            ophanPageId: req.body.ophanPageId,
            ophanComponentId: req.body.ophanComponentId,
            platformId: req.body.platformId,
            campaignCode: req.body.campaignCode,
            abTestName: req.body.abTestName,
            abTestVariant: req.body.abTestVariant,
            referrerUrl: req.body.referrerUrl,
        };

        const { html, css } = extractCritical(
            renderToStaticMarkup(<DefaultEpic content={epicContent} metadata={epicMetadata} />),
        );
        if (typeof req.query.showPreview !== 'undefined') {
            const htmlContent = renderHtmlDocument({ html, css });
            res.send(htmlContent);
        } else {
            res.send({ html, css });
        }
    });

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
};

fetchDefaultEpicContent()
    .then(bootApp)
    .catch(error => console.error(`App failed to boot: ${error}`));
