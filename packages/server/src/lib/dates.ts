const pauseDays = 90;

export const daysSince = (then: Date, now: Date): number => {
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
