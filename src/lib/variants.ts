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

export interface ReminderFields {
    reminderCTA: string;
    reminderDate: string;
    reminderDateAsString: string;
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
    showReminderFields?: ReminderFields;
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

    // These are specific to hardcoded tests
    expiry?: string;
    campaignId?: string;
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
        const defaultMaxViews = {
            maxViewsCount: 4,
            maxViewsDays: 30,
            minDaysBetweenViews: 0,
        };

        if (test.alwaysAsk) {
            return true;
        }

        const testId = test.useLocalViewLog ? test.name : undefined;

        return !shouldThrottle(log, test.maxViews || defaultMaxViews, testId, now);
    },
});

export const withinArticleViewedSettings = (
    history: WeeklyArticleHistory,
    now: Date = new Date(),
): Filter => ({
    id: 'withinArticleViewedSettings',
    test: (test, _): boolean => {
        // Allow test to pass if no articles viewed settings have been set
        if (!test.articlesViewedSettings || !test.articlesViewedSettings.periodInWeeks) {
            return true;
        }

        const { minViews, maxViews, periodInWeeks } = test.articlesViewedSettings;

        const viewCountForWeeks = getArticleViewCountForWeeks(history, periodInWeeks, now);
        const minViewsOk = minViews ? viewCountForWeeks >= minViews : true;
        const maxViewsOk = maxViews ? viewCountForWeeks <= maxViews : true;

        return minViewsOk && maxViewsOk;
    },
});

export const inCorrectCohort = (userCohorts: UserCohort[]): Filter => ({
    id: 'inCorrectCohort',
    test: (test, _): boolean => userCohorts.includes(test.userCohort),
});

// Temporary filter to exclude tests with tickers until we support them
export const hasNoTicker: Filter = {
    id: 'hasNoTicker',
    test: (test, _) => {
        const hasTicker = test.variants.some(variant => variant.showTicker);
        return !hasTicker;
    },
};

// Prevent cases like "...you've read 0 articles...".
// This could happen when the article history required by the test
// is different than the date range used by the template itself.
export const hasNoZeroArticleCount = (now: Date = new Date(), templateWeeks = 52): Filter => ({
    id: 'hasNoZeroArticleCount',
    test: (test, targeting): boolean => {
        const mustHaveHistory =
            test.articlesViewedSettings && test.articlesViewedSettings.periodInWeeks;

        if (!mustHaveHistory) {
            return true;
        }

        const numArticlesInWeeks = getArticleViewCountForWeeks(
            targeting.weeklyArticleHistory || [],
            templateWeeks,
            now,
        );

        return numArticlesInWeeks > 0;
    },
});

export const shouldNotRender: Filter = {
    id: 'shouldNotRender',
    test: (_, targeting) => !shouldNotRenderEpic(targeting),
};

export const isNotExpired = (now: Date = new Date()): Filter => ({
    id: 'isNotExpired',
    test: (test, _): boolean => {
        if (!test.expiry) {
            return true;
        }

        const testExpiryAsDate = new Date(test.expiry).getTime();
        const todayMidnightAsDate = new Date(now).setHours(0, 0, 0, 0);

        return testExpiryAsDate >= todayMidnightAsDate;
    },
});

export interface Result {
    test: Test;
    variant: Variant;
}

export const findTestAndVariant = (tests: Test[], targeting: EpicTargeting): Result | undefined => {
    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).
    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    const filters: Filter[] = [
        shouldNotRender,
        isOn,
        isNotExpired(),
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
        hasNoTicker,
        hasNoZeroArticleCount(),
    ];

    const priorityOrdered = ([] as Test[]).concat(
        tests.filter(test => test.highPriority),
        tests.filter(test => !test.highPriority),
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
