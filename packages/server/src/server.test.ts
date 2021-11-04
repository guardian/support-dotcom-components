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
                            amounts: [30, 60, 120, 240],
                            defaultAmount: 60,
                        },
                        MONTHLY: {
                            amounts: [3, 6, 9, 15],
                            defaultAmount: 9,
                        },
                        ANNUAL: {
                            amounts: [60, 120, 240, 480],
                            defaultAmount: 120,
                        },
                    },
                    test: {
                        name: '2021-09-02_AMOUNTS_R5__UK',
                        isLive: false,
                        variants: [
                            {
                                name: 'V2_LOWER',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [30, 60, 120, 240],
                                        defaultAmount: 60,
                                    },
                                    MONTHLY: {
                                        amounts: [3, 5, 10, 15],
                                        defaultAmount: 5,
                                    },
                                    ANNUAL: {
                                        amounts: [60, 120, 240, 480],
                                        defaultAmount: 120,
                                    },
                                },
                            },
                        ],
                        seed: 917618,
                    },
                },
                UnitedStates: {
                    control: {
                        ONE_OFF: {
                            amounts: [25, 50, 100, 250],
                            defaultAmount: 50,
                        },
                        MONTHLY: {
                            amounts: [7, 15, 30],
                            defaultAmount: 15,
                        },
                        ANNUAL: {
                            amounts: [50, 100, 250, 500],
                            defaultAmount: 50,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__US',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [7, 15, 30, 50],
                                        defaultAmount: 15,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                },
                            },
                        ],
                        seed: 930202,
                    },
                },
                EURCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [25, 50, 100, 250],
                            defaultAmount: 50,
                        },
                        MONTHLY: {
                            amounts: [6, 10, 20],
                            defaultAmount: 10,
                        },
                        ANNUAL: {
                            amounts: [50, 100, 250, 500],
                            defaultAmount: 50,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__EU',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [6, 10, 25, 50],
                                        defaultAmount: 10,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 50,
                                    },
                                },
                            },
                            {
                                name: 'V2_HIGHER_DEFAULT',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [6, 8, 12, 24],
                                        defaultAmount: 12,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 150, 200],
                                        defaultAmount: 100,
                                    },
                                },
                            },
                        ],
                        seed: 628626,
                    },
                },
                AUDCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [60, 100, 250, 500],
                            defaultAmount: 100,
                        },
                        MONTHLY: {
                            amounts: [10, 20, 40],
                            defaultAmount: 20,
                        },
                        ANNUAL: {
                            amounts: [80, 250, 500, 750],
                            defaultAmount: 80,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__AU',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [60, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [10, 20, 40, 60],
                                        defaultAmount: 20,
                                    },
                                    ANNUAL: {
                                        amounts: [80, 250, 500, 750],
                                        defaultAmount: 80,
                                    },
                                },
                            },
                            {
                                name: 'V2_HIGHER_DEFAULT',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [60, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [10, 20, 30, 40],
                                        defaultAmount: 30,
                                    },
                                    ANNUAL: {
                                        amounts: [80, 150, 300, 500],
                                        defaultAmount: 150,
                                    },
                                },
                            },
                            {
                                name: 'V3_LOWER_OPENING',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [60, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [8, 20, 40],
                                        defaultAmount: 20,
                                    },
                                    ANNUAL: {
                                        amounts: [60, 250, 500, 750],
                                        defaultAmount: 60,
                                    },
                                },
                            },
                        ],
                        seed: 605059,
                    },
                },
                International: {
                    control: {
                        ONE_OFF: {
                            amounts: [25, 50, 100, 250],
                            defaultAmount: 50,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 20],
                            defaultAmount: 10,
                        },
                        ANNUAL: {
                            amounts: [60, 100, 250, 500],
                            defaultAmount: 60,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__INT',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [6, 10, 25, 40],
                                        defaultAmount: 10,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 50,
                                    },
                                },
                            },
                            {
                                name: 'V2_HIGHER_DEFAULT',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [6, 8, 12, 30],
                                        defaultAmount: 12,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 150, 200],
                                        defaultAmount: 100,
                                    },
                                },
                            },
                            {
                                name: 'V3_LOWER_OPENING',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [4, 10, 20],
                                        defaultAmount: 10,
                                    },
                                    ANNUAL: {
                                        amounts: [40, 100, 250, 500],
                                        defaultAmount: 40,
                                    },
                                },
                            },
                        ],
                        seed: 943978,
                    },
                },
                NZDCountries: {
                    control: {
                        ONE_OFF: {
                            amounts: [50, 100, 250, 500],
                            defaultAmount: 100,
                        },
                        MONTHLY: {
                            amounts: [10, 20, 50],
                            defaultAmount: 20,
                        },
                        ANNUAL: {
                            amounts: [50, 100, 250, 500],
                            defaultAmount: 50,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__NZ',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [10, 20, 50, 100],
                                        defaultAmount: 20,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 500, 750],
                                        defaultAmount: 50,
                                    },
                                },
                            },
                            {
                                name: 'V2_HIGHER_DEFAULT',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [10, 15, 25, 50],
                                        defaultAmount: 25,
                                    },
                                    ANNUAL: {
                                        amounts: [50, 100, 500, 750],
                                        defaultAmount: 100,
                                    },
                                },
                            },
                            {
                                name: 'V3_LOWER_OPENING',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [50, 100, 250, 500],
                                        defaultAmount: 100,
                                    },
                                    MONTHLY: {
                                        amounts: [8, 20, 50],
                                        defaultAmount: 20,
                                    },
                                    ANNUAL: {
                                        amounts: [40, 100, 500, 750],
                                        defaultAmount: 40,
                                    },
                                },
                            },
                        ],
                        seed: 628456,
                    },
                },
                Canada: {
                    control: {
                        ONE_OFF: {
                            amounts: [25, 50, 100, 250],
                            defaultAmount: 50,
                        },
                        MONTHLY: {
                            amounts: [5, 10, 20],
                            defaultAmount: 10,
                        },
                        ANNUAL: {
                            amounts: [60, 100, 250, 500],
                            defaultAmount: 60,
                        },
                    },
                    test: {
                        name: '2021-03-11_AMOUNTS_R2__CA',
                        isLive: false,
                        variants: [
                            {
                                name: 'V1_HIGHER_STRETCH',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [5, 10, 25, 40],
                                        defaultAmount: 10,
                                    },
                                    ANNUAL: {
                                        amounts: [60, 100, 250, 500],
                                        defaultAmount: 60,
                                    },
                                },
                            },
                            {
                                name: 'V2_HIGHER_DEFAULT',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [6, 8, 12, 24],
                                        defaultAmount: 12,
                                    },
                                    ANNUAL: {
                                        amounts: [60, 100, 150, 200],
                                        defaultAmount: 100,
                                    },
                                },
                            },
                            {
                                name: 'V3_LOWER_OPENING',
                                amounts: {
                                    ONE_OFF: {
                                        amounts: [25, 50, 100, 250],
                                        defaultAmount: 50,
                                    },
                                    MONTHLY: {
                                        amounts: [4, 10, 20],
                                        defaultAmount: 10,
                                    },
                                    ANNUAL: {
                                        amounts: [40, 100, 250, 500],
                                        defaultAmount: 40,
                                    },
                                },
                            },
                        ],
                        seed: 775798,
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
            sectionId: 'environment',
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
