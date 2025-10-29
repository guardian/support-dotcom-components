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
    const enableScheduledBannerDeploys = true;

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

        it('returns test if enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns test if regionTargeting (country code) matches country code from payload (targeting)', () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['UnitedStates'],
                    targetedCountryCodes: ['AU'],
                },
            };

            const result = selectBannerTest(
                targeting,
                userDeviceType,
                '',
                [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns test if regionTargeting (country group) matches country code from payload (targeting)', () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['AUDCountries', 'GBPCountries'],
                    targetedCountryCodes: ['CA', 'DE'],
                },
            };

            const result = selectBannerTest(
                targeting,
                userDeviceType,
                '',
                [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns null if regionTargeting does not match country code from payload (targeting)', () => {
            const testWithRegionTargeting: BannerTest = {
                ...test,
                regionTargeting: {
                    targetedCountryGroups: ['NZDCountries'],
                    targetedCountryCodes: ['DE', 'FR'],
                },
            };

            const result = selectBannerTest(
                targeting,
                userDeviceType,
                '',
                [testWithRegionTargeting],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns null if hardcoded tests disabled', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                '',
                [{ ...test, isHardcoded: true }],
                bannerDeployTimes,
                false,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBeUndefined();
        });

        it('returns null if not enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns test if no articlesViewedSettings', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                '',
                [
                    {
                        ...test,
                        articlesViewedSettings: undefined,
                    },
                ],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns null if opted out', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    hasOptedOutOfArticleCount: true,
                }),
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns null if page has Taylor Report tag', () => {
            const targetingWithTaylorReportTag = {
                tagIds: ['news/series/cotton-capital'],
                ...targeting,
            };

            const result = selectBannerTest(
                targetingWithTaylorReportTag,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );

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

        it('returns test if enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns null if not enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns test if no articlesViewedSettings', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                userDeviceType,
                '',
                [
                    {
                        ...test,
                        articlesViewedSettings: undefined,
                    },
                ],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
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
            return selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                userDeviceType,
                '',
                tests,
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
        };

        it('It should return a test matching a contribution from a new user', () => {
            const result = runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
            });

            expect(result?.test.name).toEqual('banner-new-contribution');
        });

        it('It should return a test matching a subscription from an existing user', () => {
            const result = runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'SupporterPlus', userType: 'current' },
            });

            expect(result?.test.name).toEqual('banner-existing-subscriber');
        });

        it('It should ignore purchase information if user is signed in', () => {
            const result = runSelection({
                ...baseTargeting,
                purchaseInfo: { product: 'Contribution', userType: 'new' },
                isSignedIn: true,
            });

            expect(result).toBeNull();
        });

        it('It should ignore purchase information if sign in banner has previously been closed', () => {
            const result = runSelection({
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

        it('returns abandoned basket banner when abandoned basket property present and not recently closed', () => {
            const result = selectBannerTest(
                {
                    ...targeting,
                    abandonedBasket: {
                        amount: 5,
                        billingPeriod: 'ANNUAL',
                        region: 'au',
                        product: 'Contribution',
                    },
                },
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('abandonedBasket');
        });

        it('returns null when abandoned basket property present and recently closed', () => {
            const result = selectBannerTest(
                {
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
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns null when abandoned basket property not present', () => {
            const result = selectBannerTest(
                targeting,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
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

        it('returns test when frontsOnly is true and contentType is Network Front', () => {
            const result = selectBannerTest(
                { ...targeting, contentType: 'Network Front' },
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result?.test.name).toBe('test');
        });

        it('returns null when frontsOnly is true and contentType is Article', () => {
            const result = selectBannerTest(
                { ...targeting, contentType: 'Article' },
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
            expect(result).toBe(null);
        });

        it('returns test when frontsOnly is undefined and contentType is Article', () => {
            const testWithoutFrontsOnly = { ...test, frontsOnly: undefined };
            const result = selectBannerTest(
                { ...targeting, contentType: 'Article' },
                userDeviceType,
                '',
                [testWithoutFrontsOnly],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                banditData,
                undefined,
                now,
            );
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
});
