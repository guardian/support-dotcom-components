import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { DefaultEpic } from './components/DefaultEpic';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '50mb' }));

// Note allows *all* cors. We may want to tighten this later.
app.use(cors());

//
app.use(express.urlencoded());
app.use(express.json());

app.options('*', cors());

app.post('/epic', (req, res) => {
    const {
        ophanPageId,
        ophanComponentId,
        platformId,
        campaignCode,
        abTestName,
        abTestVariant,
        referrerUrl,
    } = req.body;

    const { html, css } = extractCritical(
        renderToStaticMarkup(
            <DefaultEpic
                ophanPageId={ophanPageId}
                ophanComponentId={ophanComponentId}
                platformId={platformId}
                campaignCode={campaignCode}
                abTestName={abTestName}
                abTestVariant={abTestVariant}
                referrerUrl={referrerUrl}
            />,
        ),
    );

    if (typeof req.query.showPreview !== 'undefined') {
        const htmlContent = renderHtmlDocument({ html, css });
        res.send(htmlContent);
    } else {
        res.send({ html, css });
    }
});

// app.post('/epic', (req, res) => {
//     console.log('=== REQ:');
//     console.log(req);
//     const { html, css } = extractCritical(renderToStaticMarkup(<DefaultEpic />));
//     res.send({ html, css });
// });

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
