import { countryCodeToCountryGroupId, getCountryName, inCountryGroups } from '@sdc/shared/lib';
import {
    EpicTargeting,
    EpicVariant,
    UserCohort,
    EpicViewLog,
    WeeklyArticleHistory,
    EpicTest,
    UserDeviceType,
} from '@sdc/shared/types';
import { BanditData } from '../../bandit/banditData';
import { selectVariantUsingEpsilonGreedy } from '../../bandit/banditSelection';
import { selectVariant } from '../../lib/ab';
import { isRecentOneOffContributor } from '../../lib/dates';
import { historyWithinArticlesViewedSettings } from '../../lib/history';
import { TestVariant } from '../../lib/params';
import { SuperModeArticle } from '../../lib/superMode';
import { isInSuperMode, superModeify } from '../../lib/superMode';
import {
    correctSignedInStatus,
    deviceTypeMatches,
    pageContextMatches,
    shouldNotRenderEpic,
    shouldThrottle,
} from '../../lib/targeting';

interface Filter {
    id: string;
    test: (test: EpicTest, targeting: EpicTargeting) => boolean;
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

export const correctSignedInStatusFilter: Filter = {
    id: 'correctSignedInStatus',
    test: (test, targeting) => correctSignedInStatus(!!targeting.isSignedIn, test.signedInStatus),
};

export const pageContextFilter: Filter = {
    id: 'pageContextFilter',
    test: (test, targeting) => {
        const pageContext = {
            tagIds: targeting.tags.map((tag) => tag.id),
            sectionId: targeting.sectionId,
        };
        const pageContextTargeting = {
            tagIds: test.tagIds,
            sectionIds: test.sections,
            excludedTagIds: test.excludedTagIds,
            excludedSectionIds: test.excludedSections,
        };
        return pageContextMatches(pageContext, pageContextTargeting);
    },
};

export const isLive: Filter = {
    id: 'isLive',
    test: (test): boolean => test.status === 'Live',
};

export const canShow = (targeting: EpicTargeting): Filter => ({
    id: 'canShow',
    test: (test): boolean => (test.canShow ? test.canShow(targeting) : true),
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

export const withinMaxViews = (log: EpicViewLog, now: Date = new Date()): Filter => ({
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

export const inCorrectCohort = (userCohorts: UserCohort[], isSuperModePass: boolean): Filter => ({
    id: 'inCorrectCohort',
    test: (test): boolean => {
        if (isSuperModePass && test.userCohort === 'AllExistingSupporters') {
            // Do not apply Super Mode to supporter epics
            return false;
        }
        return userCohorts.includes(test.userCohort);
    },
});

export const shouldNotRender: Filter = {
    id: 'shouldNotRender',
    test: (_, targeting): boolean => !shouldNotRenderEpic(targeting),
};

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
        if (test.hasArticleCountInCopy) {
            return !targeting.hasOptedOutOfArticleCount;
        } else {
            return true;
        }
    },
};

export const deviceTypeMatchesFilter = (userDeviceType: UserDeviceType): Filter => ({
    id: 'deviceTypeMatches',
    test: (test): boolean => deviceTypeMatches(test, userDeviceType),
});

type FilterResults = Record<string, boolean>;

export type Debug = Record<string, FilterResults>;

export interface Result {
    result?: {
        test: EpicTest;
        variant: EpicVariant;
    };
    debug?: Debug;
}

//TODO can we get rid of includeDebug and Debug objects?
export const findTestAndVariant = (
    tests: EpicTest[],
    targeting: EpicTargeting,
    userDeviceType: UserDeviceType,
    superModeArticles: SuperModeArticle[],
    includeDebug = false,
    banditData: BanditData[],
): Result => {
    const debug: Debug = {};

    const userCohorts = getUserCohorts(targeting);

    const getFilters = (isSuperModePass: boolean): Filter[] => {
        return [
            shouldNotRender,
            isLive,
            canShow(targeting),
            isNotExpired(),
            pageContextFilter,
            inCorrectCohort(userCohorts, isSuperModePass),
            hasCountryCode,
            matchesCountryGroups,
            // For the super mode pass, we treat all tests as "always ask" so disable this filter
            ...(isSuperModePass ? [] : [withinMaxViews(targeting.epicViewLog || [])]),
            respectArticleCountOptOut,
            withinArticleViewedSettings(targeting.weeklyArticleHistory || []),
            deviceTypeMatchesFilter(userDeviceType),
            correctSignedInStatusFilter,
        ];
    };

    const filterTests = (tests: EpicTest[], filters: Filter[]): EpicTest | undefined => {
        const test = tests.find((test) =>
            filters.every((filter) => {
                const got = filter.test(test, targeting);

                if (debug[test.name]) {
                    debug[test.name][filter.id] = got;
                } else {
                    debug[test.name] = { [filter.id]: got };
                }

                if (!got && process.env.LOG_FAILED_TEST_FILTER === 'true') {
                    console.log(`filter failed: ${test.name}; ${filter.id}`);
                }

                return got;
            }),
        );

        return test;
    };

    const filterTestsWithSuperModePass = (tests: EpicTest[]): EpicTest | undefined => {
        return (
            filterTests(tests, getFilters(false)) ??
            superModeify(filterTests(tests, getFilters(true)))
        );
    };

    const filterTestsWithoutSuperModePass = (tests: EpicTest[]): EpicTest | undefined => {
        return filterTests(tests, getFilters(false));
    };

    const priorityOrdered = ([] as EpicTest[]).concat(
        tests.filter((test) => test.highPriority),
        tests.filter((test) => !test.highPriority),
    );

    const isSuperMode =
        targeting.url &&
        targeting.countryCode &&
        isInSuperMode(
            targeting.url,
            countryCodeToCountryGroupId(targeting.countryCode),
            superModeArticles,
        );

    const test = isSuperMode
        ? filterTestsWithSuperModePass(priorityOrdered)
        : filterTestsWithoutSuperModePass(priorityOrdered);

    if (test) {
        return selectEpicVariant(test, banditData, targeting);
    }

    return { debug: includeDebug ? debug : undefined };
};

function selectEpicVariant(test: EpicTest, banditData: BanditData[], targeting: EpicTargeting) {
    if (test.banditTest) {
        return selectVariantUsingEpsilonGreedy(banditData, test);
    }

    const variant: EpicVariant = selectVariant(test, targeting.mvtId || 1);

    return {
        result: { test, variant },
    };
}

export const findForcedTestAndVariant = (tests: EpicTest[], force: TestVariant): Result => {
    const test = tests.find((test) => test.name === force.testName);
    const variant = test?.variants.find((v) => v.name === force.variantName);

    return test && variant ? { result: { test, variant } } : {};
};
