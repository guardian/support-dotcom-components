import { findVariant, Test, EpicTests } from './variants';
import { EpicTargeting } from '../components/ContributionsEpicTypes';

const test1: Test = {
    name: 'example-1',
    isOn: true,
    locations: [],
    audience: 1,
    tagIds: ['environment/series/the-polluters', 'environment/environment'],
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

const targeting: EpicTargeting = {
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

type EpicTargetingOptions = Partial<EpicTargeting>;
type TestOptions = Partial<Test>;

const buildTargeting = (
    targeting: EpicTargeting,
    overrides: EpicTargetingOptions,
): EpicTargeting => {
    return { ...targeting, ...overrides };
};

const buildTests = (test: Test, overrides: TestOptions, suite: Test[] = []): EpicTests => {
    const updated: Test = { ...test, ...overrides };
    const tests: Test[] = [];
    return { tests: tests.concat([updated], suite) };
};

describe('find variant', () => {
    it.skip('should filter by max views conditions', () => {});
    it.skip('should filter by country group match', () => {});

    it('should filter by required sections', () => {
        const mvtId = 2; // MVT IDs are 0..10^6

        const targ = buildTargeting(targeting, { sectionName: 'environment' });
        const tests = buildTests(test1, { sections: ['environment'] });
        const got = findVariant(tests, targ, mvtId);

        expect(got?.name).toBe('control-example-1');
    });

    it.skip('should filter by required tags', () => {});
    it.skip('should filter by excluded sections', () => {});
    it.skip('should filter by excluded tags', () => {});
    it.skip('should filter by copy is valid', () => {});
});
