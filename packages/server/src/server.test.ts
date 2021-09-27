import request from 'supertest';
import { configuredTests } from './api/contributionsApi.testData';
import { factories } from './factories';
import { app } from './server';

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
jest.mock('./channelSwitches', () => {
    return {
        cachedChannelSwitches: jest.fn().mockImplementation(() =>
            Promise.resolve({
                enableEpics: true,
                enableBanners: true,
            }),
        ),
    };
});
jest.mock('./choiceCardAmounts', () => {
    return {
        cachedChoiceCardAmounts: jest.fn().mockImplementation(() =>
            Promise.resolve({
                GBPCountries: {
                    ONE_OFF: [
                        { value: 30 },
                        { value: 60, isDefault: true },
                        { value: 120 },
                        { value: 240 },
                    ],
                    MONTHLY: [
                        { value: 3 },
                        { value: 6 },
                        { value: 9, isDefault: true },
                        { value: 15 },
                    ],
                    ANNUAL: [
                        { value: 60 },
                        { value: 120, isDefault: true },
                        { value: 240 },
                        { value: 480 },
                    ],
                },
                UnitedStates: {
                    ONE_OFF: [
                        { value: 25 },
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                    ],
                    MONTHLY: [{ value: 7 }, { value: 15, isDefault: true }, { value: 30 }],
                    ANNUAL: [
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                        { value: 500 },
                    ],
                },
                AUDCountries: {
                    ONE_OFF: [
                        { value: 60 },
                        { value: 100, isDefault: true },
                        { value: 250 },
                        { value: 500 },
                    ],
                    MONTHLY: [{ value: 10 }, { value: 20, isDefault: true }, { value: 40 }],
                    ANNUAL: [
                        { value: 80, isDefault: true },
                        { value: 250 },
                        { value: 500 },
                        { value: 750 },
                    ],
                },
                EURCountries: {
                    ONE_OFF: [
                        { value: 25 },
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                    ],
                    MONTHLY: [{ value: 6 }, { value: 10, isDefault: true }, { value: 20 }],
                    ANNUAL: [
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                        { value: 500 },
                    ],
                },
                International: {
                    ONE_OFF: [
                        { value: 25 },
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                    ],
                    MONTHLY: [{ value: 5 }, { value: 10, isDefault: true }, { value: 20 }],
                    ANNUAL: [
                        { value: 60, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                        { value: 500 },
                    ],
                },
                NZDCountries: {
                    ONE_OFF: [
                        { value: 50 },
                        { value: 100, isDefault: true },
                        { value: 250 },
                        { value: 500 },
                    ],
                    MONTHLY: [{ value: 10 }, { value: 20, isDefault: true }, { value: 50 }],
                    ANNUAL: [
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                        { value: 500 },
                    ],
                },
                Canada: {
                    ONE_OFF: [
                        { value: 25 },
                        { value: 50, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                    ],
                    MONTHLY: [{ value: 5 }, { value: 10, isDefault: true }, { value: 20 }],
                    ANNUAL: [
                        { value: 60, isDefault: true },
                        { value: 100 },
                        { value: 250 },
                        { value: 500 },
                    ],
                },
            }),
        ),
    };
});

jest.mock('./lib/superMode', () => {
    return {
        fetchSuperModeArticles: jest.fn().mockImplementation(() => {
            Promise.resolve([]);
        }),
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
});
