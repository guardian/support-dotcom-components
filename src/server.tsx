import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { css } from 'emotion';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { headline } from '@guardian/src-foundations/typography';
import { renderHtmlDocument } from './utils/renderHtmlDocument';

const app = express();
app.use(express.json({ limit: '50mb' }));

const ExampleComponent: React.FC<{}> = () => (
    <h1
        className={css`
            ${headline.medium()}
        `}
    >
        Hello World
    </h1>
);

app.get('/', (req, res) => {
    const { html, css } = extractCritical(renderToStaticMarkup(<ExampleComponent />));
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
