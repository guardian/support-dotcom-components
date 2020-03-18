import request from 'supertest';
import { app } from './server';
import testData from './components/ContributionsEpic.testData';
import { configuredTests } from './api/contributionsApi.testData';

jest.mock('./api/contributionsApi', () => {
    return {
        fetchConfiguredEpicTests: jest
            .fn()
            .mockImplementation(() => Promise.resolve(configuredTests)),
    };
});

describe('POST /epic', () => {
    it('should return an epic when targeting is positive', async () => {
        const { tracking, localisation, targeting } = testData;

        const res = await request(app)
            .post('/epic')
            .send({
                tracking,
                localisation,
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('html');
        expect(res.body.data).toHaveProperty('css');
        expect(res.body.data.testName).toEqual(
            '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
        );
        expect(res.body.data.variantName).toEqual('Control');
    });

    // Skip this test until JSON schema validation is configurable
    it('returns a 400 when an invalid payload is sent', async () => {
        const res = await request(app)
            .post('/epic')
            .send({});

        expect(res.status).toEqual(400);
    });
});
