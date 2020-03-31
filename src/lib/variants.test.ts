import {
    findVariant,
    getUserCohort,
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
            showTicker: false,
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

describe('getUserCohort', () => {
    it('should return "AllNonSupporters" correctly', () => {
        const got1 = getUserCohort(targetingDefault);
        expect(got1).toBe('AllNonSupporters');
    });

    it('should return "AllExistingSupporters" correctly', () => {
        const now = new Date();
        const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 2)).getTime();

        const targeting1: EpicTargeting = {
            ...targetingDefault,
            isRecurringContributor: true,
        };
        const got1 = getUserCohort(targeting1);
        expect(got1).toBe('AllExistingSupporters');

        const targeting2: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: false,
        };
        const got2 = getUserCohort(targeting2);
        expect(got2).toBe('AllExistingSupporters');

        const targeting3: EpicTargeting = {
            ...targetingDefault,
            lastOneOffContributionDate: twoMonthsAgo,
        };
        const got3 = getUserCohort(targeting3);
        expect(got3).toBe('AllExistingSupporters');
    });
    it('should return "PostAskPauseSingleContributors" correctly', () => {
        const now = new Date();
        const fourMonthsAgo = new Date(now.setMonth(now.getMonth() - 4)).getTime();

        const targeting: EpicTargeting = {
            ...targetingDefault,
            showSupportMessaging: true,
            isRecurringContributor: false,
            lastOneOffContributionDate: fourMonthsAgo,
        };
        const got = getUserCohort(targeting);
        expect(got).toBe('PostAskPauseSingleContributors');
    });
});

describe('find variant', () => {
    it('should find the correct variant for test and targeting data', () => {
        const tests = { tests: [testDefault] };
        const targeting: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: [{ week: 18330, count: 45 }],
        };

        const got = findVariant(tests, targeting);

        expect(got?.test.name).toBe('example-1');
        expect(got?.variant.name).toBe('control-example-1');
    });

    it('should return undefined when no matching test variant', () => {
        const test = { ...testDefault, excludedSections: ['news'] };
        const tests = { tests: [test] };
        const targeting = { ...targetingDefault, sectionName: 'news' };
        const got = findVariant(tests, targeting);

        expect(got).toBe(undefined);
    });
});

describe('variant filters', () => {
    it('should filter by has country code', () => {
        // Test 1 - country name is invalid/unknown
        const test1: Test = { ...testDefault, hasCountryName: true };
        const targeting1: EpicTargeting = { ...targetingDefault, countryCode: 'UK' };
        const got1 = hasCountryCode.test(test1, targeting1);
        expect(got1).toBe(false);

        // Test 2 - country name is valid
        const test2: Test = { ...testDefault, hasCountryName: true };
        const targeting2: EpicTargeting = { ...targetingDefault, countryCode: 'GB' };
        const got2 = hasCountryCode.test(test2, targeting2);
        expect(got2).toBe(true);

        // Test 3 - country name irrelevant if test doesnt need it
        const test3: Test = { ...testDefault, hasCountryName: false };
        const targeting3: EpicTargeting = { ...targetingDefault, countryCode: undefined };
        const got3 = hasCountryCode.test(test3, targeting3);
        expect(got3).toBe(true);
    });

    it('should filter by user cohort', () => {
        const test1 = {
            ...testDefault,
            userCohort: 'AllNonSupporters',
        };
        const filter1 = inCorrectCohort('AllNonSupporters');
        const got1 = filter1.test(test1, targetingDefault);
        expect(got1).toBe(true);

        const test2 = {
            ...testDefault,
            userCohort: 'AllExistingSupporters',
        };
        const filter2 = inCorrectCohort('AllExistingSupporters');
        const got2 = filter2.test(test2, targetingDefault);
        expect(got2).toBe(true);

        const test3 = {
            ...testDefault,
            userCohort: 'PostAskPauseSingleContributors',
        };
        const filter3 = inCorrectCohort('PostAskPauseSingleContributors');
        const got3 = filter3.test(test3, targetingDefault);
        expect(got3).toBe(true);

        const test4 = {
            ...testDefault,
            userCohort: 'Everyone',
        };
        const filter4 = inCorrectCohort('AllNonSupporters');
        const got4 = filter4.test(test4, targetingDefault);
        expect(got4).toBe(true);

        const test5 = {
            ...testDefault,
            userCohort: 'AllNonSupporters',
        };
        const filter5 = inCorrectCohort('AllExistingSupporters');
        const got5 = filter5.test(test5, targetingDefault);
        expect(got5).toBe(false);
    });

    it('should filter by required sections or tags', () => {
        // return true if section matches
        const test1: Test = {
            ...testDefault,
            sections: ['environment'],
        };
        const targeting1: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'environment',
        };
        const got1 = hasSectionOrTags.test(test1, targeting1);
        expect(got1).toBe(true);

        // return false if section doesn't match and no tags defined
        const test2: Test = {
            ...testDefault,
            sections: ['environment'],
        };
        const targeting2: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
        };
        const got2 = hasSectionOrTags.test(test2, targeting2);
        expect(got2).toBe(false);

        // return true if sections don't match but tags match
        const tags3 = [
            {
                id: 'environment/series/the-polluters',
                type: 'tone',
            },
        ];
        const test3: Test = {
            ...testDefault,
            sections: ['environment'],
            tagIds: tags3.map(tag => tag.id),
        };
        const targeting3: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
            tags: tags3,
        };
        const got3 = hasSectionOrTags.test(test3, targeting3);
        expect(got3).toBe(true);

        // return false if neither sections or tags match
        const tags4 = [
            {
                id: 'environment/series/the-polluters',
                type: 'tone',
            },
        ];
        const test4: Test = {
            ...testDefault,
            sections: ['environment'],
            tagIds: tags4.map(tag => tag.id),
        };
        const targeting4: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
            tags: [
                {
                    id: 'business/some-business-tag',
                    type: 'tone',
                },
            ],
        };
        const got4 = hasSectionOrTags.test(test4, targeting4);
        expect(got4).toBe(false);

        // return true if no section or tag requirements
        const test5: Test = {
            ...testDefault,
            sections: [],
            tagIds: [],
        };
        const targeting5: EpicTargeting = {
            ...targetingDefault,
            sectionName: 'business',
        };
        const got5 = hasSectionOrTags.test(test5, targeting5);
        expect(got5).toBe(true);
    });

    it('should filter by excluded sections', () => {
        const test1: Test = { ...testDefault, excludedSections: ['environment'] };
        const targeting1: EpicTargeting = { ...targetingDefault, sectionName: 'football' };
        const got1 = excludeSection.test(test1, targeting1);
        expect(got1).toBe(true);

        const test2: Test = { ...testDefault, excludedSections: ['environment'] };
        const targeting2: EpicTargeting = { ...targetingDefault, sectionName: 'environment' };
        const got2 = excludeSection.test(test2, targeting2);
        expect(got2).toBe(false);
    });

    it('should filter by excluded tags', () => {
        const test1: Test = {
            ...testDefault,
            excludedTagIds: ['football/football'],
        };
        const targeting1: EpicTargeting = {
            ...targetingDefault,
            tags: [{ id: 'environment/series/the-polluters', type: 'tone' }],
        };
        const got1 = excludeTags.test(test1, targeting1);
        expect(got1).toBe(true);

        const tags2 = [{ id: 'football/football', type: 'tone' }];
        const test2: Test = { ...testDefault, excludedTagIds: ['football/football'] };
        const targeting2: EpicTargeting = { ...targetingDefault, tags: tags2 };
        const got2 = excludeTags.test(test2, targeting2);
        expect(got2).toBe(false);
    });

    it('should filter by user location', () => {
        // Test 1 - should return true if no location set in the test
        const test1 = {
            ...testDefault,
            locations: [],
        };
        const got1 = matchesCountryGroups.test(test1, targetingDefault);
        expect(got1).toBe(true);

        // Test 2 - should return false if location is set but user location unknown
        const test2: Test = {
            ...testDefault,
            locations: ['GBPCountries'],
        };
        const targeting2 = {
            ...targetingDefault,
            countryCode: undefined,
        };
        const got2 = matchesCountryGroups.test(test2, targeting2);
        expect(got2).toBe(false);

        // Test 3 - should return true if user IS in the country group
        const test3: Test = {
            ...testDefault,
            locations: ['EURCountries'],
        };
        const targeting3: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'PT',
        };
        const got3 = matchesCountryGroups.test(test3, targeting3);
        expect(got3).toBe(true);

        // Test 4 - should return false if user is NOT in the country group
        const test4: Test = {
            ...testDefault,
            locations: ['EURCountries'],
        };
        const targeting4: EpicTargeting = {
            ...targetingDefault,
            countryCode: 'GB',
        };
        const got4 = matchesCountryGroups.test(test4, targeting4);
        expect(got4).toBe(false);
    });

    it('should filter by articles viewed settings', () => {
        // Test 1 - below min articles viewed
        const history1 = [{ week: 18330, count: 2 }];
        const targeting1: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history1,
        };

        const filter1 = withinArticleViewedSettings(history1);

        const got1 = filter1.test(testDefault, targeting1);
        expect(got1).toBe(false);

        // Test 2 - above (or at) min articles vieweds
        const history2 = [{ week: 18330, count: 5 }];
        const targeting2: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history2,
        };

        const filter2 = withinArticleViewedSettings(history2);

        const got2 = filter2.test(testDefault, targeting2);
        expect(got2).toBe(true);

        // Test 3 - below (or at) max articles viewed
        const test3: Test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                maxViews: 20,
                periodInWeeks: 52,
            },
        };
        const history3 = [{ week: 18330, count: 20 }];
        const targeting3: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history3,
        };

        const filter3 = withinArticleViewedSettings(history3);

        const got3 = filter3.test(test3, targeting3);
        expect(got3).toBe(true);

        // Test 4 - above max articles viewed
        const test4: Test = {
            ...testDefault,
            articlesViewedSettings: {
                minViews: 5,
                maxViews: 20,
                periodInWeeks: 52,
            },
        };
        const history4 = [{ week: 18330, count: 21 }];
        const targeting4: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history4,
        };

        const filter4 = withinArticleViewedSettings(history4);

        const got4 = filter4.test(test4, targeting4);
        expect(got4).toBe(false);

        // Test 5 - no article viewed settings
        const test5: Test = {
            ...testDefault,
            articlesViewedSettings: undefined,
        };
        const history5 = [{ week: 18330, count: 2500 }];
        const targeting5: EpicTargeting = {
            ...targetingDefault,
            weeklyArticleHistory: history5,
        };

        const filter5 = withinArticleViewedSettings(history5);

        const got5 = filter5.test(test5, targeting5);
        expect(got5).toBe(true);
    });

    it('should filter by max views', () => {
        const viewLog = [
            { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-07-11T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-07-15T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-07-17T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-08-11T10:24:00').valueOf(), testId: 'example-1' },
        ];

        const now = new Date('2019-08-17T10:24:00');
        const filter = withinMaxViews(viewLog, now);

        const test1 = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 4,
                maxViewsDays: 30,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: false,
        };

        const got1 = filter.test(test1, targetingDefault);

        expect(got1).toBe(true);

        const test2 = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 3,
                maxViewsDays: 90,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: false,
        };

        const got2 = filter.test(test2, targetingDefault);

        expect(got2).toBe(false);
    });

    it('should ignore max views when alwaysAsk is true', () => {
        const viewLog = [
            { date: new Date('2019-06-11T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-07-11T10:24:00').valueOf(), testId: 'B' },
            { date: new Date('2019-07-15T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-07-17T10:24:00').valueOf(), testId: 'example-1' },
            { date: new Date('2019-08-11T10:24:00').valueOf(), testId: 'example-1' },
        ];

        const now = new Date('2019-08-17T10:24:00');
        const filter = withinMaxViews(viewLog, now);

        const test1 = {
            ...testDefault,
            maxViews: {
                maxViewsCount: 3,
                maxViewsDays: 90,
                minDaysBetweenViews: 0,
            },
            alwaysAsk: true,
        };

        const got = filter.test(test1, targetingDefault);
        expect(got).toBe(true);
    });

    it('should filter by content type', () => {
        const test1 = {
            ...testDefault,
            isLiveBlog: true,
        };

        const targeting1 = {
            ...targetingDefault,
            contentType: 'LiveBlog',
        };

        const got1 = isContentType.test(test1, targeting1);
        expect(got1).toBe(true);

        const test2 = {
            ...testDefault,
            isLiveBlog: true,
        };

        const targeting2 = {
            ...targetingDefault,
            contentType: 'Article',
        };

        const got2 = isContentType.test(test2, targeting2);
        expect(got2).toBe(false);
    });
});
