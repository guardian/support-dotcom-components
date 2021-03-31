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
jest.mock('./tests/amp/ampEpicTests', () => {
    return {
        getAmpExperimentData: jest.fn().mockImplementation(() => Promise.resolve({})),
    };
});
jest.mock('./tests/banners/bannerDeployCache', () => {
    return {
        bannerDeployCaches: {
            contributions: jest.fn().mockImplementation(() => Promise.resolve({})),
            subscriptions: jest.fn().mockImplementation(() => Promise.resolve({})),
        },
    };
});

jest.mock('./tests/banners/ChannelBannerTests', () => {
    return {
        channel1BannersAllTestsGenerator: jest
            .fn()
            .mockImplementation(() => () => Promise.resolve([])),
        channel2BannersAllTestsGenerator: jest
            .fn()
            .mockImplementation(() => () => Promise.resolve([])),
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
            componentType: 'ACQUISITIONS_EPIC',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
        });
    });

    it('returns a 400 when an invalid payload is sent', async () => {
        const res = await request(app)
            .post('/epic')
            .send({});

        expect(res.status).toEqual(400);
    });
});
