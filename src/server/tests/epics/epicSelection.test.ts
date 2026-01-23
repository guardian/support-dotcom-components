import type {
    ArticlesViewedSettings,
    DeviceType,
    EpicTargeting,
    EpicTest,
    EpicVariant,
    UserDeviceType,
} from '../../../shared/types';
import { SecondaryCtaType } from '../../../shared/types';
import type { SuperModeArticle } from '../../lib/superMode';
import type { BanditData } from '../../selection/banditData';
import {
    correctSignedInStatusFilter,
    deviceTypeMatchesFilter,
    findTestAndVariant,
    getUserCohorts,
    hasCountryCode,
    inCorrectCohort,
    isCountryTargetedForEpic,
    isNotExpired,
    mParticleAudienceMatchesFilter,
    withinArticleViewedSettings,
    withinMaxViews,
} from './epicSelection';

const variantDefault: EpicVariant = {
    name: 'control-example-1',
    heading: "We've got an announcement…",
    paragraphs: [
        '… on our progress as an organisation. In service of the escalating climate emergency, we have made an important decision – <a href="https://www.theguardian.com/media/2020/jan/29/guardian-to-ban-advertising-from-fossil-fuel-firms-climate-crisis#show-draft-epics">to renounce fossil fuel advertising</a>, becoming the first major global news organisation to institute an outright ban on taking money from companies that extract fossil fuels.',
        '',
    ],
    highlightedText:
        'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
    cta: {
        text: 'Support The Guardian',
        baseUrl: 'https://support.theguardian.com/contribute',
    },
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            text: 'Read our pledge',
            baseUrl:
                'https://www.theguardian.com/environment/ng-interactive/2019/oct/16/the-guardians-climate-pledge-2019?INTCMP=pledge_Jan_2020',
        },
    },
};

const testDefault: EpicTest = {
    channel: 'Epic',
    name: 'example-1',
    priority: 1,
    status: 'Live',
    locations: [],
    tagIds: [],
    sections: ['environment'],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    hasCountryName: false,
    variants: [variantDefault],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
    hasArticleCountInCopy: true,
};

const targetingDefault: EpicTargeting = {
    contentType: 'Article',
    sectionId: 'environment',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
    showSupportMessaging: true,
    mvtId: 2,
    hasOptedOutOfArticleCount: false,
};

const superModeArticles: SuperModeArticle[] = [];

const banditData: BanditData[] = [];

const userDeviceType = 'Desktop';

const getMParticleProfile = () => Promise.resolve(undefined);

describe('findTestAndVariant', () => {
    it('should find the correct variant for test and targeting data', async () => {
        const testWithoutArticlesViewedSettings = {
            ...testDefault,
            articlesViewedSettings: undefined,
        };
        const tests = [testWithoutArticlesViewedSettings];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: [{ week: 18330, count: 45 }],
        };

        const got = await findTestAndVariant(
            tests,
            targeting,
            userDeviceType,
            superModeArticles,
            banditData,
            getMParticleProfile,
        );

        expect(got.result?.test.name).toBe('example-1');
        expect(got.result?.variant.name).toBe('control-example-1');
    });

    it('should return undefined if test has hasArticleCountInCopy and user has opted out of article count', async () => {
        const tests = [testDefault];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: [{ week: 18330, count: 45 }],
            hasOptedOutOfArticleCount: true,
        };

        const got = await findTestAndVariant(
            tests,
            targeting,
            userDeviceType,
            superModeArticles,
            banditData,
            getMParticleProfile,
        );

        expect(got.result).toBe(undefined);
    });

    it('should return undefined when no matching test variant', async () => {
        const test = { ...testDefault, excludedSections: ['news'] };
        const tests = [test];
        const targeting = { ...targetingDefault, sectionId: 'news' };

        const got = await findTestAndVariant(
            tests,
            targeting,
            userDeviceType,
            superModeArticles,
            banditData,
            getMParticleProfile,
        );

        expect(got.result).toBe(undefined);
    });

    it('should not return showReminderFields if user is a supporter', async () => {
        const testWithoutArticlesViewedSettings: EpicTest = {
            ...testDefault,
            articlesViewedSettings: undefined,
            userCohort: 'AllExistingSupporters',
        };
        const tests = [testWithoutArticlesViewedSettings];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: false,
        };

        const got = await findTestAndVariant(
            tests,
            targeting,
            userDeviceType,
            superModeArticles,
            banditData,
            getMParticleProfile,
        );

        expect(got.result?.variant.showReminderFields).toBe(undefined);
    });
});

describe('getUserCohort', () => {
    it('should return "AllNonSupporters" when users is not contributor', () => {
        const targeting = {
            ...targetingDefault,
            showSupportMessaging: true,
        };

        const got = getUserCohorts(targeting);

        expect(got).toEqual(['AllNonSupporters', 'Everyone']);
    });

    it('should return "AllExistingSupporters" when user has some form of paid product', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: false,
        };

        const got = getUserCohorts(targeting);

        expect(got).toEqual(['AllExistingSupporters', 'Everyone']);
    });
});

describe('hasCountryCode filter', () => {
    it('should fail when country name is invalid/unknown', () => {
        const test: EpicTest = { ...testDefault, hasCountryName: true };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'UK',
        };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass when country name is valid', () => {
        const test: EpicTest = { ...testDefault, hasCountryName: true };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'GB',
        };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass when country name irrelevant if test doesnt need it', () => {
        const test: EpicTest = { ...testDefault, hasCountryName: false };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: undefined,
        };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(true);
    });
});

describe('inCorrectCohort filter', () => {
    it('should pass when overlapping cohorts', () => {
        const test: EpicTest = {
            ...testDefault,
            userCohort: 'AllNonSupporters',
        };
        const filter = inCorrectCohort(
            ['PostAskPauseSingleContributors', 'AllNonSupporters', 'Everyone'],
            false,
        );

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail when no overlapping cohorts', () => {
        const test: EpicTest = {
            ...testDefault,
            userCohort: 'AllExistingSupporters',
        };
        const filter = inCorrectCohort(['AllNonSupporters', 'Everyone'], false);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });

    it('should fail for super mode when test targets supporters', () => {
        const test: EpicTest = {
            ...testDefault,
            userCohort: 'AllExistingSupporters',
        };
        const filter = inCorrectCohort(['AllExistingSupporters', 'Everyone'], true);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });
});

describe('matchesCountryGroups filter', () => {
    it('should pass if no location set in the test', () => {
        const test = {
            ...testDefault,
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: [],
            },
        };

        const got = isCountryTargetedForEpic.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail if location is set but user location unknown', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['GBPCountries'],
            regionTargeting: {
                targetedCountryGroups: ['GBPCountries'],
                targetedCountryCodes: [],
            },
        };
        const targeting = {
            ...targetingDefault,
            countryCode: undefined,
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if user in country group', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['EURCountries'],
            regionTargeting: {
                targetedCountryGroups: ['EURCountries'],
                targetedCountryCodes: [],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'PT',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if user not in country group', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['EURCountries'],
            regionTargeting: {
                targetedCountryGroups: ['EURCountries'],
                targetedCountryCodes: [],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'GB',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if user is in country group or targeted country', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['EURCountries'],
            regionTargeting: {
                targetedCountryGroups: ['EURCountries'],
                targetedCountryCodes: ['CA'],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'DE',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass if user is in targeted country', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: [],
            regionTargeting: {
                targetedCountryGroups: [],
                targetedCountryCodes: ['DE'],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'DE',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass if user is in both country group or targeted country', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['EURCountries'],
            regionTargeting: {
                targetedCountryGroups: ['EURCountries'],
                targetedCountryCodes: ['DE'],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'DE',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if user is not in country group or targeted country', () => {
        const test: EpicTest = {
            ...testDefault,
            locations: ['EURCountries'],
            regionTargeting: {
                targetedCountryGroups: ['EURCountries'],
                targetedCountryCodes: ['NZ'],
            },
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'GB',
        };

        const got = isCountryTargetedForEpic.test(test, targeting);

        expect(got).toBe(false);
    });
});

describe('withinArticleViewedSettings filter', () => {
    const now = new Date('2020-03-31T12:30:00');

    it('should fail when below min articles viewed', () => {
        const history = [{ week: 18330, count: 2 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test(testDefault, targeting);

        expect(got).toBe(false);
    });

    it('should pass when above (or at) min articles vieweds', () => {
        const history = [{ week: 18330, count: 5 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test(testDefault, targeting);

        expect(got).toBe(true);
    });

    it('should pass when below (or at) max articles viewed', () => {
        const test: EpicTest = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                maxViews: 20,
                periodInWeeks: 52,
            },
        };
        const history = [{ week: 18330, count: 20 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail when above max articles viewed', () => {
        const test: EpicTest = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                maxViews: 20,
                periodInWeeks: 52,
                tagIds: [],
            },
        };
        const history = [{ week: 18330, count: 21 }];
        const targeting4: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test(test, targeting4);

        expect(got).toBe(false);
    });

    it('should pass when no article viewed settings', () => {
        const test: EpicTest = {
            ...testDefault,
            articlesViewedSettings: undefined,
        };
        const history = [{ week: 18330, count: 2500 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test(test, targeting);

        expect(got).toBe(true);
    });
});

describe('withinArticleViewedSettings filter by tag', () => {
    const now = new Date('2020-03-31T12:30:00');
    const articlesViewedSettings: ArticlesViewedSettings = {
        minViews: 5,
        periodInWeeks: 52,
        tagIds: ['environment/climate-change'],
    };

    it('should pass when no articlesViewedByTagSettings', () => {
        const history = [{ week: 18330, count: 2500 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test({ ...testDefault }, targeting);

        expect(got).toBe(true);
    });

    it('should fail when below min articles viewed for any tag', () => {
        const history = [
            {
                week: 18330,
                count: 5,
                tags: {
                    'environment/climate-change': 1,
                    'science/science': 2,
                },
            },
        ];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test({ ...testDefault, articlesViewedSettings }, targeting);

        expect(got).toBe(false);
    });

    it('should succeed when above min articles viewed for any tag', () => {
        const history = [
            {
                week: 18330,
                count: 5,
                tags: {
                    'environment/climate-change': 5,
                    'science/science': 2,
                },
            },
        ];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = withinArticleViewedSettings(history, now);

        const got = filter.test({ ...testDefault, articlesViewedSettings }, targeting);

        expect(got).toBe(true);
    });
});

describe('withinMaxViews filter', () => {
    const viewLog = [
        {
            date: new Date('2019-06-11T10:24:00').valueOf(),
            testId: 'example-1',
        },
        { date: new Date('2019-07-19T10:24:00').valueOf(), testId: 'B' },
        {
            date: new Date('2019-07-19T10:24:00').valueOf(),
            testId: 'example-1',
        },
        {
            date: new Date('2019-07-21T10:24:00').valueOf(),
            testId: 'example-1',
        },
        {
            date: new Date('2019-08-11T10:24:00').valueOf(),
            testId: 'example-1',
        },
    ];
    const now = new Date('2019-08-17T10:24:00');
    const filter = withinMaxViews(viewLog, now);

    it('should pass when number of views within the limit', () => {
        const test = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 5,
                maxViewsDays: 30,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: false,
        };

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });
    it('should fail when number of views above the limit', () => {
        const test = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 3,
                maxViewsDays: 90,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: false,
        };

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });
    it('should fail when test does not specify rules so default settings are used', () => {
        const test = {
            ...testDefault,
            maxViews: undefined,
            alwaysAsk: false,
        };

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });

    it('should pass when alwaysAsk is true regardless any view dates', () => {
        const test = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 3,
                maxViewsDays: 90,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: true,
        };

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });
});

describe('isNotExpired filter', () => {
    const now = new Date('2020-01-18T12:30:00');

    it('should pass if expiry date today', () => {
        const test = {
            ...testDefault,
            expiry: '2020-01-18',
        };
        const filter = isNotExpired(now);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should pass if expiry date tomorrow', () => {
        const test = {
            ...testDefault,
            expiry: '2020-01-19',
        };
        const filter = isNotExpired(now);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail if expiry date yesterday', () => {
        const test = {
            ...testDefault,
            expiry: '2020-01-17',
        };
        const filter = isNotExpired(now);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });
});

describe('deviceTypeMatchesFilter', () => {
    it('should return true if test.deviceType == undefined', () => {
        const result = deviceTypeMatchesFilter('Desktop').test(testDefault, targetingDefault);
        expect(result).toBe(true);
    });

    it('should return true if test.deviceType == All', () => {
        const test: EpicTest = {
            ...testDefault,
            deviceType: 'All',
        };
        const result = deviceTypeMatchesFilter('Desktop').test(test, targetingDefault);
        expect(result).toBe(true);
    });

    it('should return true if test.deviceType == Desktop and user device is desktop', () => {
        const test: EpicTest = {
            ...testDefault,
            deviceType: 'Desktop',
        };
        const result = deviceTypeMatchesFilter('Desktop').test(test, targetingDefault);
        expect(result).toBe(true);
    });

    it.each([['iOS'], ['Android']])(
        'should return true if test.deviceType == Mobile and user device is %p',
        (userDeviceType: string) => {
            const test: EpicTest = {
                ...testDefault,
                deviceType: 'Mobile',
            };
            const result = deviceTypeMatchesFilter(userDeviceType as UserDeviceType).test(
                test,
                targetingDefault,
            );
            expect(result).toBe(true);
        },
    );

    it('should return false if test.deviceType == Mobile and user device is desktop', () => {
        const test: EpicTest = {
            ...testDefault,
            deviceType: 'Mobile',
        };
        const result = deviceTypeMatchesFilter('Desktop').test(test, targetingDefault);
        expect(result).toBe(false);
    });

    it.each([
        ['Android', 'iOS'],
        ['iOS', 'Android'],
    ])(
        'should return false if test.deviceType == %p and user device is %p',
        (deviceType: string, userDeviceType: string) => {
            const test: EpicTest = {
                ...testDefault,
                deviceType: deviceType as DeviceType,
            };

            const result = deviceTypeMatchesFilter(userDeviceType as UserDeviceType).test(
                test,
                targetingDefault,
            );
            expect(result).toBe(false);
        },
    );

    it.each([
        ['iOS', 'iOS'],
        ['Android', 'Android'],
    ])(
        'should return true if test.deviceType == %p and user device is %p',
        (deviceType: string, userDeviceType: string) => {
            const test: EpicTest = {
                ...testDefault,
                deviceType: deviceType as DeviceType,
            };

            const result = deviceTypeMatchesFilter(userDeviceType as UserDeviceType).test(
                test,
                targetingDefault,
            );
            expect(result).toBe(true);
        },
    );
});

describe('correctSignedInStatusFilter filter', () => {
    it('should pass if the test is requiring a user to be signed in and they are signed in', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedIn',
        };

        const targeting = { ...targetingDefault, isSignedIn: true };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if the test is requiring a user to be signed in and they are signed out', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedIn',
        };

        const targeting = { ...targetingDefault, isSignedIn: false };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if the test is requiring a user to be signed out and they are signed out', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedOut',
        };

        const targeting = { ...targetingDefault, isSignedIn: false };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if the test is requiring a user to be signed out and they are signed in', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedOut',
        };

        const targeting = { ...targetingDefault, isSignedIn: true };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if the test is requiring a user to be either signed in or signed out and they are signed in', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'All',
        };

        const targeting = { ...targetingDefault, isSignedIn: true };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass if the test is requiring a user to be either signed in or signed out and they are signed out', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'All',
        };

        const targeting = { ...targetingDefault, isSignedIn: false };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if the test is requiring a user to be signed in and isSignedIn returns undefined', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedIn',
        };

        const targeting = { ...targetingDefault, isSignedIn: undefined };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if the test is requiring a user to be signed out and isSignedIn returns undefined', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'SignedOut',
        };

        const targeting = { ...targetingDefault, isSignedIn: undefined };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass if the test is requiring a user to be either signed in or signed out and isSignedIn returns undefined', () => {
        const test: EpicTest = {
            ...testDefault,
            signedInStatus: 'All',
        };

        const targeting = { ...targetingDefault, isSignedIn: undefined };
        const got = correctSignedInStatusFilter.test(test, targeting);

        expect(got).toBe(true);
    });
});

describe('mParticleAudienceMatchesFilter', () => {
    it('should pass if test has mParticleAudience and user is in the target audience', async () => {
        const test: EpicTest = {
            ...testDefault,
            mParticleAudience: 99999,
        };
        const getMParticleProfile = () => Promise.resolve({
            audience_memberships: [{ audience_id: 99999, audience_name: 'test audience' }],
        });
        const filter = mParticleAudienceMatchesFilter(getMParticleProfile);

        const got = await filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail if test has mParticleAudience but user is not in the target audience', async () => {
        const test: EpicTest = {
            ...testDefault,
            mParticleAudience: 99999,
        };
        const getMParticleProfile = () => Promise.resolve({
            audience_memberships: [{ audience_id: 12345, audience_name: 'different audience' }],
        });
        const filter = mParticleAudienceMatchesFilter(getMParticleProfile);

        const got = await filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });

    it('should fail if test has mParticleAudience but mParticleProfile is undefined', async () => {
        const test: EpicTest = {
            ...testDefault,
            mParticleAudience: 99999,
        };
        const getMParticleProfile = () => Promise.resolve(undefined);
        const filter = mParticleAudienceMatchesFilter(getMParticleProfile);

        const got = await filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });

    it('should fail if test has mParticleAudience but audience_memberships is empty', async () => {
        const test: EpicTest = {
            ...testDefault,
            mParticleAudience: 99999,
        };
        const getMParticleProfile = () => Promise.resolve({
            audience_memberships: [],
        });
        const filter = mParticleAudienceMatchesFilter(getMParticleProfile);

        const got = await filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });
});
