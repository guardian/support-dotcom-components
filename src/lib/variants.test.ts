import {
    findVariant,
    Test,
    hasCountryCode,
    matchesCountryGroups,
    hasSection,
    hasTags,
    excludeSection,
    excludeTags,
    withinMaxViews,
    isContentType,
    withinArticleViewedSettings,
} from './variants';
import { EpicTargeting } from '../components/ContributionsEpicTypes';

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
        const test: Test = { ...testDefault, hasCountryName: true };
        const targeting2: EpicTargeting = { ...targetingDefault, countryCode: 'UK' };
        const got = hasCountryCode.test(test, targeting2);
        expect(got).toBe(true);
    });

    it('should filter by required sections', () => {
        const test1: Test = { ...testDefault, sections: ['environment'] };
        const targeting1: EpicTargeting = { ...targetingDefault, sectionName: 'environment' };
        const got1 = hasSection.test(test1, targeting1);
        expect(got1).toBe(true);

        const test2: Test = { ...testDefault, sections: ['environment'] };
        const targeting2: EpicTargeting = { ...targetingDefault, sectionName: 'football' };
        const got2 = hasSection.test(test2, targeting2);
        expect(got2).toBe(false);
    });

    it('should filter by required tags', () => {
        const tags1 = [{ id: 'environment/series/the-polluters', type: 'tone' }];

        const test1: Test = {
            ...testDefault,
            tagIds: tags1.map(tag => tag.id),
        };
        const targeting1: EpicTargeting = {
            ...targetingDefault,
            tags: tags1,
        };
        const got1 = hasTags.test(test1, targeting1);
        expect(got1).toBe(true);

        const tags2 = [{ id: 'environment/series/the-polluters', type: 'tone' }];
        const test2: Test = { ...testDefault, tagIds: ['football/football'] };
        const targeting2: EpicTargeting = { ...targetingDefault, tags: tags2 };
        const got2 = hasTags.test(test2, targeting2);
        expect(got2).toBe(false);
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
        const got1 = matchesCountryGroups.test(testDefault, targetingDefault);
        expect(got1).toBe(true);

        // Test 2 - should return false if location is set but user location unknown
        const test2: Test = {
            ...testDefault,
            locations: ['GBPCountries'],
        };
        const got2 = matchesCountryGroups.test(test2, targetingDefault);
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
