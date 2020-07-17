import request from 'supertest';
import { app } from './server';
import { configuredTests } from './api/contributionsApi.testData';
import { factories } from './factories';

jest.mock('./api/contributionsApi', () => {
    return {
        fetchDefaultEpicContent: jest.fn().mockImplementation(() =>
            Promise.resolve({
                heading: 'Heading',
                paragraphs: ['Paragraph'],
                highlighted: ['Highlight'],
            }),
        ),
        fetchConfiguredEpicTests: jest
            .fn()
            .mockImplementation(() => Promise.resolve(configuredTests)),
    };
});

describe('POST /epic', () => {
    it('should return epic data', async () => {
        const targeting = factories.targeting.build({
            contentType: 'Article',
            sectionName: 'environment',
            shouldHideReaderRevenue: false,
            isMinuteArticle: false,
            isPaidContent: false,
            tags: [
                {
                    id: 'environment/drought',
                    type: 'Keyword',
                },
                {
                    id: 'environment/climate-change',
                    type: 'Keyword',
                },
            ],
            showSupportMessaging: true,
        });
        const pageTracking = factories.pageTracking.build();

        const res = await request(app)
            .post('/epic')
            .send({
                tracking: pageTracking,
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('meta');
        expect(res.body.data.meta).toEqual({
            abTestName: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
            abTestVariant: 'Control',
            campaignCode:
                'gdnwb_copts_memco_2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count_Control',
            campaignId: 'epic_2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
        });
    });

    it('returns a 400 when an invalid payload is sent', async () => {
        const res = await request(app)
            .post('/epic')
            .send({});

        expect(res.status).toEqual(400);
    });
});

describe('GET /healthcheck', () => {
    it('returns a 200 when required env vars are set', async () => {
        const oldEnv = { ...process.env };
        process.env.BASE_URL = 'https://contributions.guardianapis.com';

        const res = await request(app).get('/healthcheck');

        expect(res.status).toEqual(200);

        process.env = oldEnv;
    });

    it('returns a 500 when required env vars are not set', async () => {
        const oldEnv = { ...process.env };
        process.env.BASE_URL = undefined;

        const res = await request(app).get('/healthcheck');

        expect(res.status).toEqual(500);

        process.env = oldEnv;
    });
});
