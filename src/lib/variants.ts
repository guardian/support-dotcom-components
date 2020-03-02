import { EpicTargeting } from '../components/ContributionsEpicTypes';

interface ArticlesViewedSettings {
    minViews: number;
    periodInWeeks: number;
    maxViews?: number;
}

interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

interface Cta {
    text: string;
    baseUrl: string;
}

interface Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    showTicker: boolean;
    cta?: Cta;
    secondaryCta?: Cta;
    footer?: string;
    backgroundImageUrl?: string;
}

export interface Test {
    name: string;
    isOn: boolean;
    locations: string[];
    tagIds: string[];
    sections: string[];
    excludedTagIds: any[];
    excludedSections: string[];
    alwaysAsk: boolean;
    maxViews?: MaxViews;
    userCohort: string;
    isLiveBlog: boolean;
    hasCountryName: boolean;
    variants: Variant[];
    highPriority: boolean;
    useLocalViewLog: boolean;
    articlesViewedSettings?: ArticlesViewedSettings;

    // TODO check with Contributions Team as not in current examples so perhaps
    // they are always 0 and 1?
    audience: number;
    audienceOffset?: number;
}

export interface EpicTests {
    tests: Test[];
}

interface Filter {
    id: string;
    test: (test: Test, targeting: EpicTargeting) => boolean;
}

// https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/experiments/ab-core.js#L39
const selectVariant = (test: Test, mvtId: number): Variant | undefined => {
    // Calculate range of mvtIDs for variants and return first match
    const lowest = mvtId * (test.audienceOffset || 0);
    const highest = lowest + mvtId * test.audience;

    if (mvtId > lowest && mvtId <= highest) {
        return test.variants[mvtId % test.variants.length];
    }

    return undefined;
};

export const findVariant = (
    data: EpicTests,
    targeting: EpicTargeting,
    mvtId: number,
): Variant | undefined => {
    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).

    // TODO include max view throttling here too
    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    /* return (
        (!initVariant.canRun || initVariant.canRun()) &&
        meetsMaxViewsConditions &&
        matchesCountryGroups &&
        matchesTagsOrSections &&
        noExcludedTags &&
        notExcludedSection &&
        copyIsValid()
    ); */

    const hasTags: Filter = {
        id: 'hasTags',
        test: (test, targeting) => {
            if (test.tagIds.length < 1) {
                return true;
            }

            const intersection = test.tagIds.filter(tagId =>
                targeting.tags.map(tag => tag.id).includes(tagId),
            );

            return intersection.length > 0;
        },
    };

    const hasSection: Filter = {
        id: 'hasSection',
        test: (test, targeting) => {
            if (test.sections.length < 1) {
                return true;
            }

            return test.sections.includes(targeting.sectionName);
        },
    };

    const excludeSection: Filter = {
        id: 'excludeSection',
        test: (test, targeting) => !test.excludedSections.includes(targeting.sectionName),
    };

    const excludeTags: Filter = {
        id: 'excludeTags',
        test: (test, targeting) => {
            if (test.excludedTagIds.length < 1) {
                return true;
            }

            const intersection = test.excludedTagIds.filter(
                tagId => !targeting.tags.map(tag => tag.id).includes(tagId),
            );

            return intersection.length > 0;
        },
    };

    const userInTest: Filter = {
        id: 'userInTest',
        test: (test, _) => selectVariant(test, mvtId) !== undefined,
    };

    const filters: Filter[] = [hasSection, hasTags, userInTest, excludeSection, excludeTags];
    const test = data.tests.find(test =>
        filters.every(filter => {
            const got = filter.test(test, targeting);

            if (!got && process.env.LOG_FAILED_TEST_FILTER === 'true') {
                console.log(`filter failed: ${test.name}; ${filter.id}`);
            }

            return got;
        }),
    );

    return test ? selectVariant(test, mvtId) : undefined;
};
