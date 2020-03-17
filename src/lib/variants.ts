import {
    EpicTargeting,
    ViewLog,
    WeeklyArticleHistory,
    UserCohort,
} from '../components/ContributionsEpicTypes';
import { shouldThrottle, shouldNotRenderEpic } from '../lib/targeting';
import { getArticleViewCountForWeeks } from '../lib/history';
import { getCountryName, countryCodeToCountryGroupId } from '../lib/geolocation';
import { isRecentOneOffContributor } from '../lib/dates';

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

export interface Variant {
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
    userCohort: UserCohort;
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

export const getUserCohorts = (targeting: EpicTargeting): UserCohort[] => {
    const { showSupportMessaging, isRecurringContributor } = targeting;

    const lastOneOffContributionDate = targeting.lastOneOffContributionDate
        ? new Date(targeting.lastOneOffContributionDate)
        : undefined;

    // User is a current supporter if she has a subscription or a recurring
    // donation or has made a one-off contribution in the past 3 months.
    const isSupporter =
        !showSupportMessaging ||
        isRecurringContributor ||
        isRecentOneOffContributor(lastOneOffContributionDate);

    // User is a past-contributor if she doesn't have an active subscription
    // or recurring donation, but has made a one-off donation longer than 3
    // months ago.
    const isPastContributor =
        !isSupporter &&
        lastOneOffContributionDate &&
        !isRecentOneOffContributor(lastOneOffContributionDate);

    if (isPastContributor) {
        return ['PostAskPauseSingleContributors', 'AllNonSupporters', 'Everyone'];
    } else if (isSupporter) {
        return ['AllExistingSupporters', 'Everyone'];
    }

    return ['AllNonSupporters', 'Everyone'];
};

export const hasSectionOrTags: Filter = {
    id: 'hasSectionOrTags',
    test: (test, targeting) => {
        const cleanedTags = test.tagIds.filter(tagId => tagId !== '');

        if (cleanedTags.length === 0 && test.sections.length === 0) {
            return true;
        }

        const intersectingTags = cleanedTags.filter(tagId =>
            targeting.tags.map(tag => tag.id).includes(tagId),
        );

        const hasSection = test.sections.includes(targeting.sectionName);
        const hasTags = intersectingTags.length > 0;

        return hasSection || hasTags;
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

export const isOn: Filter = {
    id: 'isOn',
    test: (test, _) => test.isOn,
};

export const isContentType: Filter = {
    id: 'isContentType',
    test: (test, targeting) => (test.isLiveBlog ? targeting.contentType === 'LiveBlog' : true),
};

// https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/experiments/ab-core.js#L39
export const userInTest = (mvtId: number): Filter => ({
    id: 'userInTest',
    test: (test, _) => {
        // Calculate range of mvtIDs for variants and return first match
        const maxMVTId = 1000000;
        const lowest = maxMVTId * (test.audienceOffset || 0);
        const highest = lowest + maxMVTId * (test.audience || 1);
        return mvtId > lowest && mvtId <= highest;
    },
});

export const hasCountryCode: Filter = {
    id: 'hasCountryGroups',
    test: (test, targeting) =>
        test.hasCountryName ? !!getCountryName(targeting.countryCode) : true,
};

export const matchesCountryGroups: Filter = {
    id: 'matchesCountryGroups',
    test: (test, targeting): boolean => {
        // Always True if no locations set for the test
        if (!test.locations || test.locations.length === 0) {
            return true;
        }

        // Always False if user location unknown but test has locations set
        if (!targeting.countryCode) {
            return false;
        }

        // Check if user is in the country groups
        const userCountryGroup = countryCodeToCountryGroupId(targeting.countryCode);
        return test.locations.includes(userCountryGroup);
    },
};

export const withinMaxViews = (log: ViewLog, now: Date = new Date()): Filter => ({
    id: 'shouldThrottle',
    test: (test, _) => {
        if (test.alwaysAsk || !test.maxViews) {
            return true;
        }

        const testId = test.useLocalViewLog ? test.name : undefined;

        return !shouldThrottle(log, test.maxViews, testId, now);
    },
});

export const withinArticleViewedSettings = (history: WeeklyArticleHistory): Filter => ({
    id: 'withinArticleViewedSettings',
    test: (test, _): boolean => {
        // Allow test to pass if no articles viewed settings have been set
        if (!test.articlesViewedSettings || !test.articlesViewedSettings.periodInWeeks) {
            return true;
        }

        const { minViews, maxViews, periodInWeeks } = test.articlesViewedSettings;

        const viewCountForWeeks = getArticleViewCountForWeeks(history, periodInWeeks);
        const minViewsOk = minViews ? viewCountForWeeks >= minViews : true;
        const maxViewsOk = maxViews ? viewCountForWeeks <= maxViews : true;

        return minViewsOk && maxViewsOk;
    },
});

export const inCorrectCohort = (userCohorts: UserCohort[]): Filter => ({
    id: 'inCorrectCohort',
    test: (test, _): boolean => userCohorts.includes(test.userCohort),
});

export const shouldNotRender: Filter = {
    id: 'shouldNotRender',
    test: (_, targeting) => !shouldNotRenderEpic(targeting),
};

export interface Result {
    test: Test;
    variant: Variant;
}

export const findTestAndVariant = (
    data: EpicTests,
    targeting: EpicTargeting,
): Result | undefined => {
    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).

    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    const filters: Filter[] = [
        shouldNotRender,
        isOn,
        hasSectionOrTags,
        userInTest(targeting.mvtId || 1),
        inCorrectCohort(getUserCohorts(targeting)),
        excludeSection,
        excludeTags,
        hasCountryCode,
        matchesCountryGroups,
        withinMaxViews(targeting.epicViewLog || []),
        withinArticleViewedSettings(targeting.weeklyArticleHistory || []),
        isContentType,
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
