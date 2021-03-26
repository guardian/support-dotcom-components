import {
    EpicTargeting,
    ViewLog,
    UserCohort,
} from '../components/modules/epics/ContributionsEpicTypes';
import { shouldThrottle, shouldNotRenderEpic, userIsInTest } from './targeting';
import { getCountryName, inCountryGroups, CountryGroupId } from './geolocation';
import { getArticleViewCountForWeeks, historyWithinArticlesViewedSettings } from './history';
import { isRecentOneOffContributor } from './dates';
import { ArticlesViewedSettings, WeeklyArticleHistory } from '../types/shared';
import { getReminderFields, ReminderFields } from './reminderFields';
import { selectVariant } from './ab';
import { EpicType } from '../components/modules/epics/ContributionsEpicTypes';

export enum TickerEndType {
    unlimited = 'unlimited',
    hardstop = 'hardstop', // currently unsupported
}
export enum TickerCountType {
    money = 'money',
    people = 'people',
}
interface TickerCopy {
    countLabel: string;
    goalReachedPrimary: string;
    goalReachedSecondary: string;
}

export interface TickerData {
    total: number;
    goal: number;
}

export interface TickerSettings {
    endType: TickerEndType;
    countType: TickerCountType;
    currencySymbol: string;
    copy: TickerCopy;
    tickerData?: TickerData;
}

interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

export interface Cta {
    text: string;
    baseUrl: string;
}

export interface Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    tickerSettings?: TickerSettings;
    cta?: Cta;
    secondaryCta?: Cta;
    footer?: string;
    backgroundImageUrl?: string;
    showReminderFields?: ReminderFields;
    modulePathBuilder?: (version?: string) => string;
}

interface ControlProportionSettings {
    proportion: number;
    offset: number;
}

export interface Test {
    name: string;
    isOn: boolean;
    locations: CountryGroupId[];
    tagIds: string[];
    sections: string[];
    excludedTagIds: string[];
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

    controlProportionSettings?: ControlProportionSettings;
}

export interface EpicTests {
    tests: Test[];
}

interface Filter {
    id: string;
    test: (test: Test, targeting: EpicTargeting) => boolean;
}

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
    test: (test): boolean => test.isOn,
};

export const userInTest = (mvtId: number): Filter => ({
    id: 'userInTest',
    test: (test: Test): boolean => userIsInTest(test, mvtId),
});

export const hasCountryCode: Filter = {
    id: 'hasCountryGroups',
    test: (test, targeting): boolean =>
        test.hasCountryName ? !!getCountryName(targeting.countryCode) : true,
};

export const matchesCountryGroups: Filter = {
    id: 'matchesCountryGroups',
    test: (test, targeting): boolean => inCountryGroups(targeting.countryCode, test.locations),
};

export const withinMaxViews = (log: ViewLog, now: Date = new Date()): Filter => ({
    id: 'shouldThrottle',
    test: (test): boolean => {
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
    test: (test): boolean =>
        historyWithinArticlesViewedSettings(test.articlesViewedSettings, history, now),
});

export const inCorrectCohort = (userCohorts: UserCohort[]): Filter => ({
    id: 'inCorrectCohort',
    test: (test): boolean => userCohorts.includes(test.userCohort),
});

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

export const shouldNotRender = (epicType: EpicType): Filter => ({
    id: 'shouldNotRender',
    test: (_, targeting): boolean => !shouldNotRenderEpic(targeting, epicType),
});

export const isNotExpired = (now: Date = new Date()): Filter => ({
    id: 'isNotExpired',
    test: (test): boolean => {
        if (!test.expiry) {
            return true;
        }

        const testExpiryAsDate = new Date(test.expiry).getTime();
        const todayMidnightAsDate = new Date(now).setHours(0, 0, 0, 0);

        return testExpiryAsDate >= todayMidnightAsDate;
    },
});

export const respectArticleCountOptOut: Filter = {
    id: 'respectArticleCountOptOut',
    test: (test, targeting) => {
        if (test.articlesViewedSettings) {
            return !targeting.hasOptedOutOfArticleCount;
        } else {
            return true;
        }
    },
};

type FilterResults = { [filter: string]: boolean };

export type Debug = { [test: string]: FilterResults };

export interface Result {
    result?: {
        test: Test;
        variant: Variant;
    };
    debug?: Debug;
}

export const findTestAndVariant = (
    tests: Test[],
    targeting: EpicTargeting,
    epicType: EpicType,
    includeDebug: boolean = false,
): Result => {
    const debug: Debug = {};

    const userCohorts = getUserCohorts(targeting);
    const isSupporter = userCohorts.includes('AllExistingSupporters');

    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).
    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    const filters: Filter[] = [
        shouldNotRender(epicType),
        isOn,
        isNotExpired(),
        hasSectionOrTags,
        userInTest(targeting.mvtId || 1),
        inCorrectCohort(userCohorts),
        excludeSection,
        excludeTags,
        hasCountryCode,
        matchesCountryGroups,
        withinMaxViews(targeting.epicViewLog || []),
        withinArticleViewedSettings(targeting.weeklyArticleHistory || []),
        hasNoZeroArticleCount(),
        respectArticleCountOptOut,
    ];

    const priorityOrdered = ([] as Test[]).concat(
        tests.filter(test => test.highPriority),
        tests.filter(test => !test.highPriority),
    );

    const test = priorityOrdered.find(test =>
        filters.every(filter => {
            const got = filter.test(test, targeting);

            if (debug[test.name]) {
                (debug[test.name] as FilterResults)[filter.id] = got;
            } else {
                debug[test.name] = { [filter.id]: got };
            }

            if (!got && process.env.LOG_FAILED_TEST_FILTER === 'true') {
                console.log(`filter failed: ${test.name}; ${filter.id}`);
            }

            return got;
        }),
    );

    if (test) {
        const variant = selectVariant(test, targeting.mvtId || 1);
        // Never show reminder feature to supporters
        const showReminderFields = isSupporter
            ? undefined
            : getReminderFields(variant.showReminderFields);

        const variantWithReminder: Variant = {
            ...variant,
            showReminderFields,
        };

        return {
            result: { test, variant: variantWithReminder },
            debug: includeDebug ? debug : undefined,
        };
    }

    return { debug: includeDebug ? debug : undefined };
};
