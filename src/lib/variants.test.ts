import { findVariant, EpicTests } from './variants';
import { EpicTargeting } from '../components/ContributionsEpicTypes';

const data: EpicTests = {
    tests: [
        {
            name: '2020-02-11_enviro_fossil_fuel_r2_Epic__with_article_count',
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
                    name: 'Control',
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
        },
    ],
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

describe('find variant', () => {
    it.skip('should filter by max views conditions', () => {});
    it.skip('should filter by country group match', () => {});
    it('should filter by required tags or sections', () => {
        const mvtId = 2; // MVT IDs are 0..10^6
        const got = findVariant(data, targeting, mvtId);

        expect(got?.name).toBe('Control'); // TODO this is not useful atm
    });
    it.skip('should filter by excluded tags or sections', () => {});
    it.skip('should filter by copy is valid', () => {});
});
