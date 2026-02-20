import type { BannerTargeting, BannerTest } from '../../../shared/types';
import type { BanditData } from '../../selection/banditData';
import { BannerDeployTimesProvider } from './bannerDeployTimes';
import { canShowBannerAgain, selectBannerTest } from './bannerSelection';

const getBannerDeployTimesReloader = (date: string) =>
    new BannerDeployTimesProvider({
        contributions: {
            get: () => ({
                UnitedKingdom: new Date(date),
                UnitedStates: new Date(date),
                Australia: new Date(date),
                RestOfWorld: new Date(date),
                EuropeanUnion: new Date(date),
            }),
        },
        subscriptions: {
            get: () => ({
                UnitedKingdom: new Date(date),
                UnitedStates: new Date(date),
                Australia: new Date(date),
                RestOfWorld: new Date(date),
                EuropeanUnion: new Date(date),
            }),
        },
    });

const userDeviceType = 'Desktop';
const banditData: BanditData[] = [];

describe('selectBannerTest', () => {
    const firstDate = 'Mon Jun 06 2020 19:20:10 GMT+0100';
    const secondDate = 'Mon Jul 06 2020 19:20:10 GMT+0100';

    const enableHardcodedBannerTests = true;
    const enableScheduledDeploys = true;

    const getMParticleProfile = () => Promise.resolve(undefined);

    describe('Contributions banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const targeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'AU',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        };

        const test: BannerTest = {
            channel: 'Banner1',
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'contributions',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [
                {
                    name: 'variant',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    bannerContent: {
                        messageText: 'body',
                        highlightedText: 'highlighted text',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            articlesViewedSettings: {
                minViews: 5,
                periodInWeeks: 52,
            },
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        it('returns test if enough article views', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns test if regionTargeting (country code) matches country code from payload (targeting)', async () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['UnitedStates'],
                    targetedCountryCodes: ['AU'],
                },
            };

            const result = await selectBannerTest({
                targeting,
                userDeviceType,
                tests: [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns test if regionTargeting (country group) matches country code from payload (targeting)', async () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['AUDCountries', 'GBPCountries'],
                    targetedCountryCodes: ['CA', 'DE'],
                },
            };

            const result = await selectBannerTest({
                targeting,
                userDeviceType,
                tests: [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns null if regionTargeting does not match country code from payload (targeting)', async () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['NZDCountries'],
                    targetedCountryCodes: ['DE', 'FR'],
                },
            };

            const result = await selectBannerTest({
                targeting,
                userDeviceType,
                tests: [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns null if hardcoded tests disabled', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                tests: [{ ...test, isHardcoded: true }],
                bannerDeployTimes,
                enableHardcodedBannerTests: false,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBeUndefined();
        });

        it('returns null if not enough article views', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns test if no articlesViewedSettings', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                tests: [
                    {
                        ...test,
                        articlesViewedSettings: undefined,
                    },
                ],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns null if opted out', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    hasOptedOutOfArticleCount: true,
                }),
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns null if page has Taylor Report tag', async () => {
            const targetingWithTaylorReportTag = {
                tagIds: ['news/series/cotton-capital'],
                ...targeting,
            };

            const result = await selectBannerTest({
                targeting: targetingWithTaylorReportTag,
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result).toBe(null);
        });
    });

    describe('Channel 2 banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const targeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'GB',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        };

        const test: BannerTest = {
            channel: 'Banner1',
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'subscriptions',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [
                {
                    name: 'variant',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    bannerContent: {
                        messageText: 'body',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
                },
            ],
            articlesViewedSettings: {
                minViews: 5,
                periodInWeeks: 52,
            },
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        it('returns test if enough article views', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns null if not enough article views', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns test if no articlesViewedSettings', async () => {
            const result = await selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                tests: [
                    {
                        ...test,
                        articlesViewedSettings: undefined,
                    },
                ],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });
    });

    describe('Sign in prompt banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const baseTargeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 1,
            countryCode: 'AU',
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        };

        const baseTest: Omit<BannerTest, 'name'> = {
            channel: 'Banner1',
            bannerChannel: 'signIn',
            priority: 1,
            isHardcoded: true,
            userCohort: 'Everyone',
            status: 'Live',
            variants: [
                {
                    name: 'control',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        const tests: BannerTest[] = [
            {
                ...baseTest,
                name: 'banner-new-contribution',
                purchaseInfo: { product: ['Contribution'], userType: ['new', 'guest'] },
            },
            {
                ...baseTest,
                name: 'banner-existing-subscriber',
                purchaseInfo: { product: ['SupporterPlus'], userType: ['current'] },
            },
        ];

        const runSelection = (targeting: BannerTargeting) => {
            return selectBannerTest({
                targeting: Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                tests,
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
        };

        it('It should return a test matching a contribution from a new user', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
            });

            expect(result?.test.name).toEqual('banner-new-contribution');
        });

        it('It should return a test matching a subscription from an existing user', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'SupporterPlus', userType: 'current' },
            });

            expect(result?.test.name).toEqual('banner-existing-subscriber');
        });

        it('It should ignore purchase information if user is signed in', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
                isSignedIn: true,
            });

            expect(result).toBeNull();
        });

        it('It should ignore purchase information if sign in banner has previously been closed', async () => {
            const result = await runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
                signInBannerLastClosedAt: new Date().toISOString(),
            });

            expect(result).toBeNull();
        });
    });

    describe('Abandoned basket banner rules', () => {
        const now = new Date('2020-03-31T12:30:00');

        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const targeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'AU',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        };

        const test: BannerTest = {
            channel: 'Banner1',
            name: 'abandonedBasket',
            priority: 1,
            status: 'Live',
            bannerChannel: 'abandonedBasket',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [
                {
                    name: 'variant',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    bannerContent: {
                        messageText: 'body',
                        highlightedText: 'highlighted text',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        it('returns abandoned basket banner when abandoned basket property present and not recently closed', async () => {
            const result = await selectBannerTest({
                targeting: {
                    ...targeting,
                    abandonedBasket: {
                        amount: 5,
                        billingPeriod: 'ANNUAL',
                        region: 'au',
                        product: 'Contribution',
                    },
                },
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('abandonedBasket');
        });

        it('returns null when abandoned basket property present and recently closed', async () => {
            const result = await selectBannerTest({
                targeting: {
                    ...targeting,
                    abandonedBasket: {
                        amount: 5,
                        billingPeriod: 'ANNUAL',
                        region: 'au',
                        product: 'Contribution',
                    },
                    abandonedBasketBannerLastClosedAt: now.toISOString(),
                },
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns null when abandoned basket property not present', async () => {
            const result = await selectBannerTest({
                targeting,
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });
    });

    describe('frontsOnly targeting', () => {
        const now = new Date('2020-03-31T12:30:00');
        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const targeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'GB',
            hasOptedOutOfArticleCount: false,
            contentType: 'Network Front',
            isSignedIn: false,
            hasConsented: true,
        };

        const test: BannerTest = {
            channel: 'Banner1',
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'contributions',
            isHardcoded: false,
            userCohort: 'Everyone',
            frontsOnly: true,
            variants: [
                {
                    name: 'variant',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    bannerContent: {
                        messageText: 'body',
                        highlightedText: 'highlighted text',
                        cta: {
                            text: 'cta',
                            baseUrl: 'https://support.theguardian.com',
                        },
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        it('returns test when frontsOnly is true and contentType is Network Front', async () => {
            const result = await selectBannerTest({
                targeting: { ...targeting, contentType: 'Network Front' },
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });

        it('returns null when frontsOnly is true and contentType is Article', async () => {
            const result = await selectBannerTest({
                targeting: { ...targeting, contentType: 'Article' },
                userDeviceType,
                tests: [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result).toBe(null);
        });

        it('returns test when frontsOnly is undefined and contentType is Article', async () => {
            const testWithoutFrontsOnly = { ...test, frontsOnly: undefined };
            const result = await selectBannerTest({
                targeting: { ...targeting, contentType: 'Article' },
                userDeviceType,
                tests: [testWithoutFrontsOnly],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });
            expect(result?.test.name).toBe('test');
        });
    });

    describe('canShowBannerAgain', () => {
        const buildTargeting = (engagementBannerLastClosedAt: string): BannerTargeting => ({
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'AU',
            engagementBannerLastClosedAt,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        });

        const test: BannerTest = {
            channel: 'Banner1',
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'contributions',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [],
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };
        const testWithSchedule = {
            ...test,
            deploySchedule: {
                daysBetween: 1,
            },
        };

        const now = new Date('2024-01-04T00:00:00');

        it('returns true if test has a deploySchedule of 1 day and lastClosedAt is more than 1 day ago', () => {
            const lastClosedAt = '2024-01-02T00:00:00';
            const manualDeployTimes = getBannerDeployTimesReloader('2024-01-01T00:00:00'); // manual deploy before lastClosedAt
            expect(
                canShowBannerAgain(
                    buildTargeting(lastClosedAt),
                    testWithSchedule,
                    manualDeployTimes,
                    now,
                ),
            ).toBe(true);
        });

        it('returns false if test has a deploySchedule of 1 day and lastClosedAt is less than 1 day ago', () => {
            const lastClosedAt = '2024-01-03T12:00:00';
            const manualDeployTimes = getBannerDeployTimesReloader('2024-01-01T00:00:00'); // manual deploy before lastClosedAt
            expect(
                canShowBannerAgain(buildTargeting(lastClosedAt), test, manualDeployTimes, now),
            ).toBe(false);
        });

        it('returns true if test has no deploySchedule but manual deploy is since lastClosedAt', () => {
            const lastClosedAt = '2024-01-02T00:00:00';
            const manualDeployTimes = getBannerDeployTimesReloader('2024-01-03T00:00:00'); // manual deploy after lastClosedAt
            expect(
                canShowBannerAgain(buildTargeting(lastClosedAt), test, manualDeployTimes, now),
            ).toBe(true);
        });

        it('returns false if test has no deploySchedule and manual deploy is before lastClosedAt', () => {
            const lastClosedAt = '2024-01-02T00:00:00';
            const manualDeployTimes = getBannerDeployTimesReloader('2024-01-01T00:00:00'); // manual deploy before lastClosedAt
            expect(
                canShowBannerAgain(buildTargeting(lastClosedAt), test, manualDeployTimes, now),
            ).toBe(false);
        });
    });

    describe('holdback group targeting', () => {
        const now = new Date('2020-03-31T12:30:00');
        const bannerDeployTimes = getBannerDeployTimesReloader(secondDate);

        const baseTargeting: BannerTargeting = {
            shouldHideReaderRevenue: false,
            isPaidContent: false,
            showSupportMessaging: true,
            mvtId: 3,
            countryCode: 'GB',
            engagementBannerLastClosedAt: firstDate,
            hasOptedOutOfArticleCount: false,
            contentType: 'Article',
            isSignedIn: false,
            hasConsented: true,
        };

        const baseTest: Omit<BannerTest, 'name'> = {
            channel: 'Banner1',
            bannerChannel: 'contributions',
            priority: 1,
            isHardcoded: true,
            userCohort: 'Everyone',
            status: 'Live',
            variants: [
                {
                    name: 'control',
                    template: {
                        designName: 'TEST_DESIGN',
                    },
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
            contextTargeting: {
                tagIds: [],
                sectionIds: [],
                excludedTagIds: [],
                excludedSectionIds: [],
            },
        };

        it('returns null if user is not in holdback group and test is a HOLDBACK test', async () => {
            const holdbackTest: BannerTest = {
                ...baseTest,
                name: 'contribution-HOLDBACK-v1',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: false,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [holdbackTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result).toBeNull();
        });

        it('returns test if user is in holdback group and test is a HOLDBACK test', async () => {
            const holdbackTest: BannerTest = {
                ...baseTest,
                name: 'contribution-HOLDBACK-v1',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: true,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [holdbackTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result?.test.name).toBe('contribution-HOLDBACK-v1');
        });

        it('returns null if user is in holdback group and test is NOT a HOLDBACK test', async () => {
            const normalTest: BannerTest = {
                ...baseTest,
                name: 'normal-contribution-test',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: true,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [normalTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result).toBeNull();
        });

        it('returns test if user is not in holdback group and test is NOT a HOLDBACK test', async () => {
            const normalTest: BannerTest = {
                ...baseTest,
                name: 'normal-contribution-test',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: false,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [normalTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result?.test.name).toBe('normal-contribution-test');
        });

        it('returns test if user has undefined inHoldbackGroup and test is NOT a HOLDBACK test', async () => {
            const normalTest: BannerTest = {
                ...baseTest,
                name: 'normal-contribution-test',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: undefined,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [normalTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result?.test.name).toBe('normal-contribution-test');
        });

        it('returns null if user has undefined inHoldbackGroup and test is a HOLDBACK test', async () => {
            const holdbackTest: BannerTest = {
                ...baseTest,
                name: 'contribution-HOLDBACK-v1',
            };

            const result = await selectBannerTest({
                targeting: {
                    ...baseTargeting,
                    inHoldbackGroup: undefined,
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                },
                userDeviceType,
                tests: [holdbackTest],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledDeploys,
                banditData,
                getMParticleProfile,
                now,
                forcedTestVariant: undefined,
            });

            expect(result).toBeNull();
        });
    });
});
