import { EpicTargeting, EpicType, ViewLog } from '../types/EpicTypes';
import { daysSince } from '../lib/dates';

const lowValueSections = ['football', 'money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = ['guardian-masterclasses/guardian-masterclasses'];

export interface ThrottleConfig {
    maxViewsDays: number;
    maxViewsCount: number;
    minDaysBetweenViews: number;
}

// Note, if testID is provided, will thottle against views only for that
// specific test, otherwise will apply a global throttle.
export const shouldThrottle = (
    log: ViewLog,
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

export const shouldNotRenderEpic = (meta: EpicTargeting, epicType: EpicType): boolean => {
    const isLowValueSection = lowValueSections.some(id => id === meta.sectionName);
    const isLowValueTag = lowValueTags.some(id => meta.tags.some(pageTag => pageTag.id === id));

    return (
        meta.shouldHideReaderRevenue ||
        isLowValueSection ||
        isLowValueTag ||
        meta.contentType.toUpperCase() !== epicType ||
        meta.isPaidContent
    );
};

interface Test {
    audienceOffset?: number;
    audience?: number;
}

// https://github.com/guardian/ab-testing/blob/main/packages/ab-core/src/core.ts#L56
export const userIsInTest = (test: Test, mvtId: number): boolean => {
    const maxMVTId = 1000000;
    const lowest = maxMVTId * (test.audienceOffset || 0);
    const highest = lowest + maxMVTId * (test.audience || 1);
    return mvtId >= lowest && mvtId <= highest;
};
