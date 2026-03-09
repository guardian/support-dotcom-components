const sectionBannerSuppressionDates = new Map<string, Set<string>>([
    ['sport', new Set(['2026-03-10', '2026-03-11', '2026-03-13'])],
    ['fashion', new Set(['2026-03-13', '2026-03-20', '2026-03-25'])],
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
