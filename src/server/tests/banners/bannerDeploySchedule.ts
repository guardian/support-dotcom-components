import { compareDesc, set, subDays } from 'date-fns';

/**
 * Banner deploy schedule -
 * We automatically schedule banner re-deploys, per channel (but not per region).
 */

interface ScheduledBannerDeploy {
    dayOfWeek: number; // 0-6, where 0 is Sunday
    hour: number; // 0-23
}

export interface ScheduledBannerDeploys {
    contributions: ScheduledBannerDeploy[];
    subscriptions: ScheduledBannerDeploy[];
}

export const defaultDeploySchedule: ScheduledBannerDeploys = {
    // Banner 1: Sunday + Thursday (9:00AM)
    contributions: [
        {
            dayOfWeek: 0,
            hour: 9,
        },
        {
            dayOfWeek: 4,
            hour: 9,
        },
    ],
    // Banner 2: Tuesday (9:00 AM)
    subscriptions: [
        {
            dayOfWeek: 2,
            hour: 9,
        },
    ],
};

const previousDay = (date: Date, dayOfWeek: number): Date =>
    subDays(date, (date.getDay() + 7 - dayOfWeek) % 7);

/**
 * Returns a new Date in the past. E.g. if dayOfWeek is 2 and hour is 6, it goes back to the previous Tuesday at 06:00.
 * @param now Current date
 * @param dayOfWeek Day of the week to go back to. From 0-6, where 0 is sunday
 * @param hour Hour of the day to go back to
 */
export const previousScheduledDate = (now: Date, dayOfWeek: number, hour: number): Date => {
    const date =
        now.getDay() === dayOfWeek && now.getHours() < hour
            ? subDays(now, 1) // scheduled for later today, so go back to previous week
            : now;

    return set(previousDay(date, dayOfWeek), {
        hours: hour,
        minutes: 0,
        seconds: 0,
    });
};

export const getLastScheduledDeploy = (
    date: Date,
    scheduledDeploys: ScheduledBannerDeploy[],
): Date => {
    const deployDateTimes = scheduledDeploys.map((deploy) =>
        previousScheduledDate(date, deploy.dayOfWeek, deploy.hour),
    );
    const sorted = deployDateTimes.sort(compareDesc);
    return sorted[0];
};
