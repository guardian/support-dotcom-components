import { EpicTargeting, EpicType, UserCohort, EpicViewLog, Test, Variant } from '@sdc/shared/types';
import { daysSince } from './dates';

const lowValueSections = ['money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = ['tone/matchreports', 'guardian-masterclasses/guardian-masterclasses'];

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

export const shouldNotRenderEpic = (meta: EpicTargeting, epicType: EpicType): boolean => {
    const section = meta.sectionId || meta.sectionName;
    const isLowValueSection = !!section && lowValueSections.includes(section);
    const isLowValueTag = lowValueTags.some(id => meta.tags.some(pageTag => pageTag.id === id));

    return (
        meta.shouldHideReaderRevenue ||
        isLowValueSection ||
        isLowValueTag ||
        meta.contentType.toUpperCase() !== epicType ||
        meta.isPaidContent
    );
};

// https://github.com/guardian/ab-testing/blob/main/packages/ab-core/src/core.ts#L56
export const userIsInTest = <V extends Variant>(test: Test<V>, mvtId: number): boolean => {
    const audienceSize = test.name.startsWith('SINGLE_FRONT_DOOR') ? 0.3 : test.audience || 1;

    const maxMVTId = 1000000;
    const lowest = maxMVTId * (test.audienceOffset || 0);
    const highest = lowest + maxMVTId * audienceSize;

    return mvtId >= lowest && mvtId <= highest;
};

export const audienceMatches = (
    showSupportMessaging: boolean,
    testAudience: UserCohort,
): boolean => {
    switch (testAudience) {
        case 'AllNonSupporters':
            return showSupportMessaging;
        case 'AllExistingSupporters':
            return !showSupportMessaging;
        default:
            return true;
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
