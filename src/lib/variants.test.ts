import {
    findVariant,
    Test,
    hasCountryCode,
    hasSection,
    hasTags,
    excludeSection,
    excludeTags,
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
};

describe('find variant', () => {
    it('should find the correct variant for test and targeting data', () => {
        const mvtId = 2; // MVT IDs are 0..10^6
        const tests = { tests: [testDefault] };
        const targeting = targetingDefault;
        const got = findVariant(tests, targeting, mvtId);

        expect(got?.name).toBe('control-example-1');
    });

    it('should return undefined when no matching test variant', () => {
        const mvtId = 2; // MVT IDs are 0..10^6
        const test = { ...testDefault, excludedSections: ['news'] };
        const tests = { tests: [test] };
        const targeting = { ...targetingDefault, sectionName: 'news' };
        const got = findVariant(tests, targeting, mvtId);

        expect(got?.name).toBe(undefined);
    });
});

describe('variant filters', () => {
    it.skip('should filter by max views conditions', () => {});

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
});
