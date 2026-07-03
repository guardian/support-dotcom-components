import type { Scheduler } from '../../shared/types';

// start and end are UTC datetime strings in the format "YYYY-MM-DDTHH:MM", both inclusive
export const isWithinScheduler = (scheduler: Scheduler, now: Date = new Date()): boolean => {
    const nowUtc = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    const { start, end } = scheduler;
    return !(start && nowUtc < start) && !(end && nowUtc > end);
};
