import {
    EpicTargeting,
    UserCohort,
    EpicViewLog,
    Test,
    Variant,
    BannerTargeting,
    HeaderTargeting,
    BannerTest,
    HeaderTest,
    EpicTest,
} from '@sdc/shared/types';
import { daysSince, isRecentOneOffContributor } from './dates';
import { SupporterStatus, SupporterStatusRules } from '@sdc/shared/dist/types';

const lowValueSections = ['money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = [
    'tone/matchreports',
    'guardian-masterclasses/guardian-masterclasses',
    'tone/cartoons',
];

export interface ThrottleConfig {
    maxViewsDays: number;
    maxViewsCount: number;
    minDaysBetweenViews: number;
}

// Note, if testID is provided, will thottle against views only for that
// specific test, otherwise will apply a global throttle.
export const shouldThrottle = (
    log: EpicViewLog,
    config: ThrottleConfig,
    testId?: string,
    now: Date = new Date(),
): boolean => {
    let views = log;

    if (testId) {
        views = log.filter(view => view.testId === testId);
    }

    const viewsInThrottleWindow = views.filter(view => {
        return daysSince(new Date(view.date), now) < config.maxViewsDays;
    });

    const hasReachedViewsLimitInWindow = viewsInThrottleWindow.length >= config.maxViewsCount;

    const withinMinDaysSinceLastView = viewsInThrottleWindow.some(
        view => daysSince(new Date(view.date), now) < config.minDaysBetweenViews,
    );

    return hasReachedViewsLimitInWindow || withinMinDaysSinceLastView;
};

export const shouldNotRenderEpic = (meta: EpicTargeting): boolean => {
    const section = meta.sectionId || meta.sectionName;
    const isLowValueSection = !!section && lowValueSections.includes(section);
    const isLowValueTag = lowValueTags.some(id => meta.tags.some(pageTag => pageTag.id === id));

    return meta.shouldHideReaderRevenue || isLowValueSection || isLowValueTag || meta.isPaidContent;
};

// https://github.com/guardian/ab-testing/blob/main/packages/ab-core/src/core.ts#L56
export const userIsInTest = <V extends Variant>(test: Test<V>, mvtId: number): boolean => {
    const maxMVTId = 1000000;
    const lowest = maxMVTId * (test.audienceOffset || 0);
    const highest = lowest + maxMVTId * (test.audience || 1);

    return mvtId >= lowest && mvtId <= highest;
};

export const supporterStatusMatches = (
    rules: SupporterStatusRules,
    isRecurringSupporter: boolean,
    lastOneOffContributionDate?: Date,
    now: Date = new Date(Date.now()),
): boolean => {
    const userStatus: SupporterStatus[] = [];
    if (isRecurringSupporter) {
        userStatus.push('RecurringSupporter');
    }
    if (
        lastOneOffContributionDate &&
        isRecentOneOffContributor(
            lastOneOffContributionDate,
            now,
            rules.recentSingleContributorCutOffInDays,
        )
    ) {
        userStatus.push('RecentSingleContributor');
    }

    const includeRuleMatches =
        rules.include.length === 0 || rules.include.some(status => userStatus.includes(status));

    const excludeRuleMatches =
        rules.exclude.length === 0 || !rules.exclude.some(status => userStatus.includes(status));

    return includeRuleMatches && excludeRuleMatches;
};

// Legacy targeting
export const audienceMatches = (
    showSupportMessaging: boolean,
    testAudience: UserCohort,
    lastOneOffContributionDate?: Date,
    now: Date = new Date(Date.now()),
): boolean => {
    const recentContributor =
        !!lastOneOffContributionDate && isRecentOneOffContributor(lastOneOffContributionDate, now);
    if (recentContributor) {
        // Recent contributors are excluded from all message tests
        return false;
    }
    switch (testAudience) {
        case 'AllNonSupporters':
            return showSupportMessaging;
        case 'AllExistingSupporters':
            return !showSupportMessaging;
        default:
            return true;
    }
};

// Backwards compatible while we migrate from `userCohort` to `supporterStatus` targeting
export const audienceOrSupporterStatusMatches = (
    test: BannerTest | HeaderTest | EpicTest,
    targeting: BannerTargeting | HeaderTargeting | EpicTargeting,
    now: Date = new Date(Date.now()),
): boolean => {
    const lastOneOffContributionDate = targeting.lastOneOffContributionDate
        ? new Date(targeting.lastOneOffContributionDate)
        : undefined;

    if (test.supporterStatus) {
        return supporterStatusMatches(
            test.supporterStatus,
            targeting.isRecurringSupporter || false,
            lastOneOffContributionDate,
            now,
        );
    } else if (test.userCohort) {
        return audienceMatches(
            targeting.showSupportMessaging,
            test.userCohort,
            lastOneOffContributionDate,
            now,
        );
    } else {
        // either userCohort or supporterStatus should exist, so exclude this test
        return false;
    }
};

export const deviceTypeMatches = <V extends Variant>(test: Test<V>, isMobile: boolean): boolean => {
    switch (test.deviceType) {
        case 'Mobile':
            return isMobile;
        case 'Desktop':
            return !isMobile;
        default:
            return true;
    }
};
