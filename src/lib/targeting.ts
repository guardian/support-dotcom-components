import { EpicTargeting, ViewLog } from '../components/ContributionsEpicTypes';
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

export const shouldNotRenderEpic = (meta: EpicTargeting): boolean => {
    const isLowValueSection = lowValueSections.some(id => id === meta.sectionName);
    const isLowValueTag = lowValueTags.some(id => meta.tags.some(pageTag => pageTag.id === id));

    return (
        meta.shouldHideReaderRevenue ||
        isLowValueSection ||
        isLowValueTag ||
        meta.contentType !== 'Article' ||
        meta.isMinuteArticle ||
        meta.isPaidContent
    );
};
