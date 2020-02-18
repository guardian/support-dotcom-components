import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { renderHtmlDocument } from './utils/renderHtmlDocument';
import { fetchDefaultEpicContent } from './api/contributionsApi';
import { ContributionsEpic } from './components/ContributionsEpic';
import {
    EpicTracking,
    EpicLocalisation,
    EpicTargeting,
    EpicPayload,
} from './components/ContributionsEpicTypes';
import { shouldNotRenderEpic } from './lib/targeting';
import testData from './components/ContributionsEpic.testData';
import cors from 'cors';
import { Validator } from 'jsonschema';
import * as fs from 'fs';
import * as path from 'path';

// Pre-cache API response
fetchDefaultEpicContent().catch(error =>
    console.log('Failed to pre-fetch default epic content:', error),
);

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
    next();
    console.log(JSON.stringify({ status: res.statusCode, method: req.method, path: req.path }));
});

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

interface Epic {
    html: string;
    css: string;
}

// Return the HTML and CSS from rendering the Epic to static markup
const buildEpic = async (
    tracking: EpicTracking,
    localisation: EpicLocalisation,
    targeting: EpicTargeting,
): Promise<Epic | null> => {
    const { heading, paragraphs, highlighted } = await fetchDefaultEpicContent();
    const content = {
        heading,
        paragraphs,
        highlighted,
    };

    // Determine whether to render the Epic or return empty HTML and CSS
    if (shouldNotRenderEpic(targeting)) {
        console.log(`Did not render for targeting data: ${JSON.stringify(targeting)}`);
        return null;
    }

    const { html, css } = extractCritical(
        renderToStaticMarkup(
            <ContributionsEpic content={content} tracking={tracking} localisation={localisation} />,
        ),
    );
    return { html, css };
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

app.get(
    '/epic',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (process.env.NODE_ENV !== 'production') {
                validatePayload(testData);
            }

            const { tracking, localisation, targeting } = testData;
            const epic = await buildEpic(tracking, localisation, targeting);
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

            const { tracking, localisation, targeting } = req.body;
            console.log(tracking);
            const epic = await buildEpic(tracking, localisation, targeting);
            res.send({ data: epic });
        } catch (error) {
            next(error);
        }
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
