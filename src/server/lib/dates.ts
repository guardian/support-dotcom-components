export const daysSince = (then: Date, now: Date): number => {
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = now.valueOf() - then.valueOf();
    return Math.floor(diffMs / oneDayMs);
};
