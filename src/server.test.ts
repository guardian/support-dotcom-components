import request from 'supertest';
import { app } from './server';
import testData from './components/ContributionsEpic.testData';
import { configuredTests } from './api/contributionsApi.testData';

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

let oldEnableDynamicTestsConfig: string | undefined;

beforeEach(() => {
    oldEnableDynamicTestsConfig = process.env.ENABLE_DYNAMIC_TESTS;
});

afterEach(() => {
    process.env.ENABLE_DYNAMIC_TESTS = oldEnableDynamicTestsConfig;
});

const enableDynamicTests = (): void => {
    process.env.ENABLE_DYNAMIC_TESTS = 'true';
};
const disableDynamicTests = (): void => {
    process.env.ENABLE_DYNAMIC_TESTS = 'false';
};

describe('POST /epic', () => {
    it('should return an epic when targeting is positive', async () => {
        enableDynamicTests();

        const { pageTracking, targeting } = testData;

        const res = await request(app)
            .post('/epic')
            .send({
                tracking: pageTracking,
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('html');
        expect(res.body.data).toHaveProperty('css');
        expect(res.body.data).toHaveProperty('meta');
        expect(res.body.data.meta).toEqual({
            abTestName: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
            abTestVariant: 'Control',
            campaignCode:
                'gdnwb_copts_memco_2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count_Control',
            campaignId: '2020-02-11_enviro_fossil_fuel_r2_Epic__no_article_count',
        });
    });

    it('should return the default epic when targeting is positive', async () => {
        disableDynamicTests();

        const { pageTracking, targeting } = testData;

        const res = await request(app)
            .post('/epic')
            .send({
                tracking: pageTracking,
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('html');
        expect(res.body.data).toHaveProperty('css');
        expect(res.body.data).toHaveProperty('meta');
        expect(res.body.data.meta).toEqual({
            abTestName: 'FrontendDotcomRenderingEpic',
            abTestVariant: 'dcr',
            campaignCode: 'gdnwb_copts_memco_frontend_dotcom_rendering_epic_dcr',
            campaignId: 'frontend_dotcom_rendering_epic',
        });
    });

    it('returns a 400 when an invalid payload is sent', async () => {
        const res = await request(app)
            .post('/epic')
            .send({});

        expect(res.status).toEqual(400);
    });
});
