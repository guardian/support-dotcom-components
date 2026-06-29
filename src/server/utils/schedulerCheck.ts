import type { Scheduler } from '../../shared/types';

export const isWithinScheduler = (scheduler: Scheduler, now: Date = new Date()): boolean => {
    const today = now.toISOString().slice(0, 10);
    const { start, end } = scheduler;
    return !(start && today < start) && !(end && today > end);
};
