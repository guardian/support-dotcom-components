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
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 45],
                            defaultAmount: 10,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 20,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 15,
                        },
                    },
                    test: {
                        name: 'GBP_COUNTRIES_AMOUNTS_TEST',
                        isLive: true,
                        variants: [
                            {
                                name: 'V1',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [5, 10, 20, 25, 30],
                                        defaultAmount: 20,
                                    },
                                    MONTHLY: {
                                        amounts: [5, 15, 30, 40, 80],
                                        defaultAmount: 15,
                                    },
                                    ANNUAL: {
                                        amounts: [100, 150, 250, 500],
                                        defaultAmount: 250,
                                    },
                                },
                            },
                            {
                                name: 'V2',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [10, 50, 100, 150],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [10, 20, 40, 50],
                                        defaultAmount: 50,
                                    },
                                    ANNUAL: {
                                        amounts: [150, 300, 500, 750],
                                        defaultAmount: 500,
                                    },
                                },
                            },
                        ],
                        seed: 398375,
                    },
                },
                UnitedStates: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
                },
                EURCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
                },
                AUDCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
                },
                International: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
                },
                NZDCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
                },
                Canada: {
                    control: {
                        ONE_OFF: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                        ANNUAL: {
                            amounts: [5, 10, 15, 20],
                            defaultAmount: 5,
                        },
                    },
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
