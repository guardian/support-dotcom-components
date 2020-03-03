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
    audience?: number;
    audienceOffset?: number;
}

export interface EpicTests {
    tests: Test[];
}

interface Filter {
    id: string;
    test: (test: Test, targeting: EpicTargeting) => boolean;
}

export const selectVariant = (test: Test, mvtId: number): Variant => {
    return test.variants[mvtId % test.variants.length];
};

export const hasTags: Filter = {
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

export const hasSection: Filter = {
    id: 'hasSection',
    test: (test, targeting) => {
        if (test.sections.length < 1) {
            return true;
        }

        return test.sections.includes(targeting.sectionName);
    },
};

export const excludeSection: Filter = {
    id: 'excludeSection',
    test: (test, targeting) => !test.excludedSections.includes(targeting.sectionName),
};

export const excludeTags: Filter = {
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

// https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/experiments/ab-core.js#L39
export const userInTest = (mvtId: number): Filter => ({
    id: 'userInTest',
    test: (test, _) => {
        // Calculate range of mvtIDs for variants and return first match
        const lowest = mvtId * (test.audienceOffset || 0);
        const highest = lowest + mvtId * (test.audience || 1);
        return mvtId > lowest && mvtId <= highest;
    },
});

export const hasCountryCode: Filter = {
    id: 'hasCountryGroups',
    test: (test, targeting) => (test.hasCountryName ? !!targeting.countryCode : true),
};

interface Result {
    test: Test;
    variant: Variant;
}

export const findVariant = (data: EpicTests, targeting: EpicTargeting): Result | undefined => {
    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).

    // TODO include max view throttling here too
    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    const filters: Filter[] = [
        hasSection,
        hasTags,
        userInTest(targeting.mvtId || 1),
        excludeSection,
        excludeTags,
        hasCountryCode,
    ];

    const priorityOrdered = ([] as Test[]).concat(
        data.tests.filter(test => test.highPriority),
        data.tests.filter(test => !test.highPriority),
    );

    const test = priorityOrdered.find(test =>
        filters.every(filter => {
            const got = filter.test(test, targeting);

            if (!got && process.env.LOG_FAILED_TEST_FILTER === 'true') {
                console.log(`filter failed: ${test.name}; ${filter.id}`);
            }

            return got;
        }),
    );

    if (test) {
        return { test, variant: selectVariant(test, targeting.mvtId || 1) };
    }

    return undefined;
};
