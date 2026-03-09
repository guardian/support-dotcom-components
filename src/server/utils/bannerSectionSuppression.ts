const marchDateRange = (startDay: number, endDay: number): Set<string> => {
    const dates = new Set<string>();
    for (let day = startDay; day <= endDay; day += 1) {
        dates.add(`2026-03-${day.toString().padStart(2, '0')}`);
    }
    return dates;
};

const sectionBannerSuppressionDates = new Map<string, Set<string>>([
    ['sport', marchDateRange(10, 13)],
    ['fashion', marchDateRange(13, 25)],
]);

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

export const shouldSuppressBannerForSectionDate = (
    sectionId: string | undefined,
    date: Date,
): boolean => {
    if (!sectionId) {
        return false;
    }

    const suppressedDates = sectionBannerSuppressionDates.get(sectionId.toLowerCase());
    if (!suppressedDates) {
        return false;
    }

    return suppressedDates.has(toIsoDate(date));
};
