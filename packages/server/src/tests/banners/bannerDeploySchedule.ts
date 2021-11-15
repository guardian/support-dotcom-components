/**
 * Banner deploy schedule -
 * We automatically schedule banner re-deploys, per channel (but not per region).
 */

interface ScheduledBannerDeploy {
    dayOfWeek: number; // 0-6, where 0 is Sunday
    hour: number; // 0-23
}

const channel1Schedule: ScheduledBannerDeploy[] = [
    {
        dayOfWeek: 0,
        hour: 9,
    },
];

const channel2Schedule: ScheduledBannerDeploy[] = [
    {
        dayOfWeek: 1,
        hour: 8,
    },
    {
        dayOfWeek: 5,
        hour: 8,
    },
];

const previousDay = (date: Date, dayOfWeek: number, hour: number): Date => {
    const withDay = new Date(date.setDate(date.getDate() - ((date.getDay() + 7 - dayOfWeek) % 7)));
    return new Date(withDay.setHours(hour, 0, 0));
};

/**
 * Returns a new Date in the past. E.g. if dayOfWeek is 2 and hour is 6, it goes back to the previous Tuesday at 06:00.
 * @param date Current date
 * @param dayOfWeek Day of the week to go back to. From 0-6, where 0 is sunday
 * @param hour Hour of the day to go back to
 */
export const previousScheduledDate = (date: Date, dayOfWeek: number, hour: number): Date => {
    const dateCopy = new Date(date);
    const dateToUse =
        dateCopy.getDay() === dayOfWeek && dateCopy.getHours() < hour
            ? new Date(dateCopy.setDate(dateCopy.getDate() - 1)) // scheduled for later today, so go back to previous week
            : dateCopy;

    return previousDay(dateToUse, dayOfWeek, hour);
};

const getLastScheduledDeploy = (date: Date, scheduledDeploys: ScheduledBannerDeploy[]): Date => {
    const deployDateTimes = scheduledDeploys.map(deploy =>
        previousScheduledDate(date, deploy.dayOfWeek, deploy.hour),
    );
    const sorted = deployDateTimes.sort((a, b) => b.getTime() - a.getTime());
    return sorted[0];
};

export const lastScheduledDeploy = {
    contributions: (date: Date): Date => getLastScheduledDeploy(date, channel1Schedule),
    subscriptions: (date: Date): Date => getLastScheduledDeploy(date, channel2Schedule),
};
