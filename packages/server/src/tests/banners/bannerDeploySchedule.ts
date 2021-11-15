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

const previousDay = (date: Date, dayOfWeek: number, hour: number) => {
    const withDay = new Date(date.setDate(date.getDate() - ((date.getDay() + 7 - dayOfWeek) % 7)));
    return new Date(withDay.setHours(hour, 0, 0));
};

export const previousScheduledDate = (date: Date, dayOfWeek: number, hour: number): Date => {
    const dateCopy = new Date(date);
    const dateToUse =
        dateCopy.getDay() === dayOfWeek && dateCopy.getHours() < hour
            ? new Date(dateCopy.setDate(dateCopy.getDate() - 1)) // scheduled for later today, so go back to previous week
            : dateCopy;

    const withPreviousDay = previousDay(dateToUse, dayOfWeek, hour);
    return new Date(withPreviousDay.setHours(hour, 0, 0));
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
