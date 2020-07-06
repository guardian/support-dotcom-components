import {
    findTestAndVariant,
    getUserCohorts,
    Test,
    hasCountryCode,
    matchesCountryGroups,
    hasSectionOrTags,
    excludeSection,
    inCorrectCohort,
    excludeTags,
    withinMaxViews,
    isContentType,
    withinArticleViewedSettings,
    userInTest,
    hasNoZeroArticleCount,
    isNotExpired,
    hasNoUnexpectedPlaceholders,
} from './variants';
import { EpicTargeting } from '../components/ContributionsEpicTypes';
import { withNowAs } from '../utils/withNowAs';

const testDefault: Test = {
    name: 'example-1',
    isOn: true,
    locations: [],
    audience: 1,
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
    isLiveBlog: false,
    hasCountryName: false,
    variants: [
        {
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
                text: 'Read our pledge',
                baseUrl:
                    'https://www.theguardian.com/environment/ng-interactive/2019/oct/16/the-guardians-climate-pledge-2019?INTCMP=pledge_Jan_2020',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};

const targetingDefault: EpicTargeting = {
    contentType: 'Article',
    sectionName: 'environment',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
    showSupportMessaging: true,
    isRecurringContributor: false,
    lastOneOffContributionDate: undefined,
    mvtId: 2,
};

describe('findTestAndVariant', () => {
    it('should find the correct variant for test and targeting data', () => {
        const testWithoutArticlesViewedSettings = {
            ...testDefault,
            articlesViewedSettings: undefined,
        };
        const tests = [testWithoutArticlesViewedSettings];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: [{ week: 18330, count: 45 }],
        };

        const got = findTestAndVariant(tests, targeting);

        expect(got?.result?.test.name).toBe('example-1');
        expect(got?.result?.variant.name).toBe('control-example-1');
    });

    it('should return undefined if test has articlesViewedSettings', () => {
        const tests = [testDefault];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: [{ week: 18330, count: 45 }],
        };

        const got = findTestAndVariant(tests, targeting);

        expect(got.result).toBe(undefined);
    });

    it('should return undefined when no matching test variant', () => {
        const test = { ...testDefault, excludedSections: ['news'] };
        const tests = [test];
        const targeting = { ...targetingDefault, sectionName: 'news' };

        const got = findTestAndVariant(tests, targeting);

        expect(got.result).toBe(undefined);
    });
});

describe('getUserCohort', () => {
    const now = new Date('2020-03-31T12:30:00');
    const twoMonthsAgo = new Date(now).setMonth(now.getMonth() - 2);

    it('should return "AllNonSupporters" when users is not contributor', () => {
        const targeting = {
            ...targetingDefault,
            showSupportMessaging: true,
            isRecurringContributor: false,
            lastOneOffContributionDate: undefined,
        };

        const got = getUserCohorts(targeting);

        expect(got).toEqual(['AllNonSupporters', 'Everyone']);
    });

    it('should return "AllExistingSupporters" when user is recurring contributor', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            isRecurringContributor: true,
        };

        const got = getUserCohorts(targeting);

        expect(got).toEqual(['AllExistingSupporters', 'Everyone']);
    });

    it('should return "AllExistingSupporters" when user has some form of paid product', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: false,
        };

        const got = getUserCohorts(targeting);

        expect(got).toEqual(['AllExistingSupporters', 'Everyone']);
    });

    it('should return "AllExistingSupporters" when user has recent one-off contribution', () => {
        const targeting: EpicTargeting = {
            ...targetingDefault,
            lastOneOffContributionDate: twoMonthsAgo,
        };

        const got = withNowAs(now, () => getUserCohorts(targeting));

        expect(got).toEqual(['AllExistingSupporters', 'Everyone']);
    });

    it('should return "PostAskPauseSingleContributors" when user has older one-off contribution', () => {
        const now = new Date('2020-03-31T12:30:00');
        const fourMonthsAgo = new Date(now).setMonth(now.getMonth() - 4);

        const targeting: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: true,
            isRecurringContributor: false,
            lastOneOffContributionDate: fourMonthsAgo,
        };

        const got = withNowAs(now, () => getUserCohorts(targeting));

        expect(got).toEqual(['PostAskPauseSingleContributors', 'AllNonSupporters', 'Everyone']);
    });
});

describe('hasCountryCode filter', () => {
    it('should fail when country name is invalid/unknown', () => {
        const test: Test = { ...testDefault, hasCountryName: true };
        const targeting: EpicTargeting = { ...targetingDefault, countryCode: 'UK' };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass when country name is valid', () => {
        const test: Test = { ...testDefault, hasCountryName: true };
        const targeting: EpicTargeting = { ...targetingDefault, countryCode: 'GB' };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should pass when country name irrelevant if test doesnt need it', () => {
        const test: Test = { ...testDefault, hasCountryName: false };
        const targeting: EpicTargeting = { ...targetingDefault, countryCode: undefined };

        const got = hasCountryCode.test(test, targeting);

        expect(got).toBe(true);
    });
});

describe('userInTest filter', () => {
    const mvtId = 10;
    it('should fail when user not in test', () => {
        const test = { ...testDefault, audience: 1, audienceOffset: 0.5 };

        const got = userInTest(mvtId).test(test, targetingDefault);

        expect(got).toBe(false);
    });

    it('should pass when user in test', () => {
        const test = { ...testDefault, audience: 0.1, audienceOffset: 0 };

        const got = userInTest(mvtId).test(test, targetingDefault);

        expect(got).toBe(true);
    });
});

describe('inCorrectCohort filter', () => {
    it('should pass when overlapping cohorts', () => {
        const test: Test = {
            ...testDefault,
            userCohort: 'AllNonSupporters',
        };
        const filter = inCorrectCohort([
            'PostAskPauseSingleContributors',
            'AllNonSupporters',
            'Everyone',
        ]);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail when no overlapping cohorts', () => {
        const test: Test = {
            ...testDefault,
            userCohort: 'AllExistingSupporters',
        };
        const filter = inCorrectCohort(['AllNonSupporters', 'Everyone']);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(false);
    });
});

describe('hasSectionOrTags filter', () => {
    it('should pass if section matches', () => {
        const test: Test = {
            ...testDefault,
            sections: ['environment'],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'environment',
        };

        const got = hasSectionOrTags.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if section does not match and no tags defined', () => {
        const test: Test = {
            ...testDefault,
            sections: ['environment'],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
        };

        const got = hasSectionOrTags.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if sections do not match but tags do', () => {
        const tags = [
            {
                id: 'environment/series/the-polluters',
                type: 'tone',
            },
        ];
        const test: Test = {
            ...testDefault,
            sections: ['environment'],
            tagIds: tags.map(tag => tag.id),
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
            tags: tags,
        };

        const got = hasSectionOrTags.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if neither sections or tags match', () => {
        const tags = [
            {
                id: 'environment/series/the-polluters',
                type: 'tone',
            },
        ];
        const test: Test = {
            ...testDefault,
            sections: ['environment'],
            tagIds: tags.map(tag => tag.id),
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
            tags: [
                {
                    id: 'business/some-business-tag',
                    type: 'tone',
                },
            ],
        };

        const got = hasSectionOrTags.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if no section or tag requirements', () => {
        const test: Test = {
            ...testDefault,
            sections: [],
            tagIds: [],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
        };

        const got = hasSectionOrTags.test(test, targeting);

        expect(got).toBe(true);
    });
});

describe('excludeSection filter', () => {
    it('should pass if section is not in the blacklist', () => {
        const test: Test = { ...testDefault, excludedSections: ['environment'] };
        const targeting: EpicTargeting = { ...targetingDefault, sectionName: 'football' };

        const got = excludeSection.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if section is in the blacklist', () => {
        const test: Test = { ...testDefault, excludedSections: ['environment'] };
        const targeting: EpicTargeting = { ...targetingDefault, sectionName: 'environment' };

        const got = excludeSection.test(test, targeting);

        expect(got).toBe(false);
    });
});

describe('excludeTags filter', () => {
    it('should pass if no tags in the blacklist', () => {
        const test: Test = {
            ...testDefault,
            excludedTagIds: ['football/football'],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
        };

        const got = excludeTags.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if at least one tag in the blacklist', () => {
        const tags = [{ id: 'football/football', type: 'tone' }];
        const test: Test = { ...testDefault, excludedTagIds: ['football/football'] };
        const targeting: EpicTargeting = { ...targetingDefault, tags: tags };

        const got = excludeTags.test(test, targeting);

        expect(got).toBe(false);
    });
});

describe('matchesCountryGroups filter', () => {
    it('should pass if no location set in the test', () => {
        const test = {
            ...testDefault,
            locations: [],
        };

        const got = matchesCountryGroups.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail if location is set but user location unknown', () => {
        const test: Test = {
            ...testDefault,
            locations: ['GBPCountries'],
        };
        const targeting = {
            ...targetingDefault,
            countryCode: undefined,
        };

        const got = matchesCountryGroups.test(test, targeting);

        expect(got).toBe(false);
    });

    it('should pass if user in country group', () => {
        const test: Test = {
            ...testDefault,
            locations: ['EURCountries'],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'PT',
        };

        const got = matchesCountryGroups.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail if user not in country group', () => {
        const test: Test = {
            ...testDefault,
            locations: ['EURCountries'],
        };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'GB',
        };

        const got = matchesCountryGroups.test(test, targeting);

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
        const test: Test = {
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
        const test: Test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                maxViews: 20,
                periodInWeeks: 52,
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
        const test: Test = {
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

describe('withinMaxViews filter', () => {
    const viewLog = [
        { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'example-1' },
        { date: new Date('2019-07-19T10:24:00').valueOf(), testId: 'B' },
        { date: new Date('2019-07-19T10:24:00').valueOf(), testId: 'example-1' },
        { date: new Date('2019-07-21T10:24:00').valueOf(), testId: 'example-1' },
        { date: new Date('2019-08-11T10:24:00').valueOf(), testId: 'example-1' },
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

describe('isContentType filter', () => {
    it('should pass when is correct content type', () => {
        const test = {
            ...testDefault,
            isLiveBlog: true,
        };
        const targeting = {
            ...targetingDefault,
            contentType: 'LiveBlog',
        };

        const got = isContentType.test(test, targeting);

        expect(got).toBe(true);
    });

    it('should fail when incorrect content type', () => {
        const test = {
            ...testDefault,
            isLiveBlog: true,
        };

        const targeting = {
            ...targetingDefault,
            contentType: 'Article',
        };

        const got = isContentType.test(test, targeting);

        expect(got).toBe(false);
    });
});

// Avoids selecting a test that uses article count when the value would be zero
describe('hasNoZeroArticleCount filter', () => {
    const now = new Date('2010-03-31T12:30:00');
    it('should pass if no need for article history', () => {
        const test: Test = {
            ...testDefault,
            articlesViewedSettings: undefined,
        };
        const filter = hasNoZeroArticleCount(now);

        const got = filter.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should pass if replacement value is greater than 0', () => {
        const history = [{ week: 18330, count: 1 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = hasNoZeroArticleCount(now);

        const got = filter.test(testDefault, targeting);

        expect(got).toBe(true);
    });

    it('should fail if replacement value is 0', () => {
        const history = [{ week: 18330, count: 0 }];
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history,
        };
        const filter = hasNoZeroArticleCount(now);

        const got = filter.test(testDefault, targeting);

        expect(got).toBe(false);
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

describe('hasNoUnexpectedPlaceholders filter', () => {
    it('should pass if present placeholders are expected', () => {
        const variant = testDefault.variants[0];
        variant.heading = 'With expected placeholder &&CURRENCY_SYMBOL%%';
        const test: Test = { ...testDefault, variants: [variant] };
        const got = excludeSection.test(test, targetingDefault);

        expect(got).toBe(true);
    });

    it('should fail if unexpected placeholders found', () => {
        const variant = testDefault.variants[0];
        variant.heading = 'With unexpected placeholder %%UNKNOWN%%';
        const test: Test = { ...testDefault, variants: [variant] };
        const got = hasNoUnexpectedPlaceholders.test(test, targetingDefault);

        expect(got).toBe(false);
    });
});
