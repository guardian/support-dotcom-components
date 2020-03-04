import { EpicTargeting, ViewLog } from '../components/ContributionsEpicTypes';

const lowValueSections = ['football', 'money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = ['guardian-masterclasses/guardian-masterclasses'];

const pauseDays = 90;

const daysSince = (then: Date, now: Date): number => {
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = now.valueOf() - then.valueOf();
    return Math.floor(diffMs / oneDayMs);
};

export const isRecentOneOffContributor = (
    lastOneOffContributionDate?: Date,
    now: Date = new Date(Date.now()), // to mock out Date.now in tests
): boolean => {
    if (!lastOneOffContributionDate) {
        return false;
    }

    return daysSince(lastOneOffContributionDate, now) <= pauseDays;
};

export interface ThrottleConfig {
    maxViewsDays: number;
    maxViewsCount: number;
    minDaysBetweenViews: number;
}

const defaultThrottle = { maxViewsDays: 90, maxViewsCount: 4, minDaysBetweenViews: 5 };

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
        return daysSince(new Date(view.date), now) <= config.maxViewsDays;
    });

    const exceedsViewsInWindow = viewsInThrottleWindow.length >= config.maxViewsCount;
    const withinMinDaysSinceLastView = viewsInThrottleWindow.some(
        view => daysSince(new Date(view.date), now) <= config.minDaysBetweenViews,
    );

    return exceedsViewsInWindow || withinMinDaysSinceLastView;
};

export const shouldNotRenderEpic = (meta: EpicTargeting): boolean => {
    const isLowValueSection = lowValueSections.some(id => id === meta.sectionName);
    const isLowValueTag = lowValueTags.some(id => meta.tags.some(pageTag => pageTag.id === id));

    const lastOneOffContributionDate = meta.lastOneOffContributionDate
        ? new Date(meta.lastOneOffContributionDate)
        : undefined;

    return (
        meta.shouldHideReaderRevenue ||
        isLowValueSection ||
        isLowValueTag ||
        meta.contentType !== 'Article' ||
        meta.isMinuteArticle ||
        meta.isPaidContent ||
        !meta.showSupportMessaging ||
        meta.isRecurringContributor ||
        isRecentOneOffContributor(lastOneOffContributionDate) ||
        shouldThrottle(meta.epicViewLog || [], defaultThrottle)
    );
};
