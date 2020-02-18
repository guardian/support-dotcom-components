import { EpicTargeting } from '../components/ContributionsEpicTypes';

const lowValueSections = ['football', 'money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = ['guardian-masterclasses/guardian-masterclasses'];

const pauseDays = 90;

export const isRecentOneOffContributor = (
    lastOneOffContributionDate?: Date,
    now: Date = new Date(Date.now()), // to mock out Date.now in tests
): boolean => {
    if (!lastOneOffContributionDate) {
        return false;
    }

    const daysSince = (then: Date): number => {
        const oneDayMs = 1000 * 60 * 60 * 24;
        const diffMs = now.valueOf() - then.valueOf();
        return Math.floor(diffMs / oneDayMs);
    };

    return daysSince(lastOneOffContributionDate) <= pauseDays;
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
        meta.isRecurringContributor ||
        isRecentOneOffContributor(lastOneOffContributionDate)
    );
};
