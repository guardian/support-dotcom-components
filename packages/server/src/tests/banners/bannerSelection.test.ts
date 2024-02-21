import { contributionsBanner, signInPromptBanner } from '@sdc/shared/config';
import { BannerTargeting, BannerTest, BannerTemplate } from '@sdc/shared/types';
import { BannerDeployTimesProvider } from './bannerDeployTimes';
import { selectBannerTest } from './bannerSelection';

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
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'contributions',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [
                {
                    name: 'variant',
                    modulePathBuilder: contributionsBanner.endpointPathBuilder,
                    template: BannerTemplate.ContributionsBanner,
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
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                undefined,
                now,
            );
            expect(result && result.test.name).toBe('test');
        });

        it('returns null if hardcoded tests disabled', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 6 }],
                }),
                tracking,
                userDeviceType,
                '',
                [{ ...test, isHardcoded: true }],
                bannerDeployTimes,
                false,
                enableScheduledBannerDeploys,
                undefined,
                now,
            );
            expect(result && result.test.name).toBe(null);
        });

        it('returns null if not enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
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
                tracking,
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
                undefined,
                now,
            );
            expect(result && result.test.name).toBe('test');
        });

        it('returns null if opted out', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    hasOptedOutOfArticleCount: true,
                }),
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
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
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
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
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const test: BannerTest = {
            name: 'test',
            priority: 1,
            status: 'Live',
            bannerChannel: 'subscriptions',
            isHardcoded: false,
            userCohort: 'Everyone',
            variants: [
                {
                    name: 'variant',
                    modulePathBuilder: contributionsBanner.endpointPathBuilder,
                    template: BannerTemplate.ContributionsBanner,
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
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                undefined,
                now,
            );
            expect(result && result.test.name).toBe('test');
        });

        it('returns null if not enough article views', () => {
            const result = selectBannerTest(
                Object.assign(targeting, {
                    weeklyArticleHistory: [{ week: 18330, count: 1 }],
                }),
                tracking,
                userDeviceType,
                '',
                [test],
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
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
                tracking,
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
                undefined,
                now,
            );
            expect(result && result.test.name).toBe('test');
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
        };

        const tracking = {
            ophanPageId: '',
            platformId: '',
            referrerUrl: '',
            clientName: '',
        };

        const baseTest: Omit<BannerTest, 'name'> = {
            bannerChannel: 'signIn',
            priority: 1,
            isHardcoded: true,
            userCohort: 'Everyone',
            status: 'Live',
            variants: [
                {
                    name: 'control',
                    modulePathBuilder: signInPromptBanner.endpointPathBuilder,
                    template: BannerTemplate.SignInPromptBanner,
                    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
                },
            ],
            locations: [],
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
                tracking,
                userDeviceType,
                '',
                tests,
                bannerDeployTimes,
                enableHardcodedBannerTests,
                enableScheduledBannerDeploys,
                undefined,
                now,
            );
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
});
