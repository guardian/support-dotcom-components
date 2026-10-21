import {
    defaultDeploySchedule,
    getLastScheduledDeploy,
    previousScheduledDate,
    scheduleForWeekdays,
} from './bannerDeploySchedule';

const days = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

describe('previousScheduledDate', () => {
    it('returns previous monday', () => {
        const result = previousScheduledDate(new Date('2021-11-12 08:00:00'), days.monday, 11);
        expect(result).toEqual(new Date('2021-11-08 11:00:00'));
    });

    it('returns previous sunday', () => {
        const result = previousScheduledDate(new Date('2021-11-12 08:00:00'), days.sunday, 11);
        expect(result).toEqual(new Date('2021-11-07 11:00:00'));
    });

    it('returns today (friday) if hour is earlier than now', () => {
        const result = previousScheduledDate(new Date('2021-11-12 08:00:00'), days.friday, 7);
        expect(result).toEqual(new Date('2021-11-12 07:00:00'));
    });

    it('returns previous friday if hour is later than now', () => {
        const result = previousScheduledDate(new Date('2021-11-12 08:00:00'), days.friday, 11);
        expect(result).toEqual(new Date('2021-11-05 11:00:00'));
    });
});

describe('scheduleForWeekdays', () => {
    it('maps each selected weekday to the existing 9am reset time', () => {
        expect(scheduleForWeekdays([0, 3, 6])).toEqual([
            { dayOfWeek: 0, hour: 9 },
            { dayOfWeek: 3, hour: 9 },
            { dayOfWeek: 6, hour: 9 },
        ]);
    });

    it('returns no dates for an empty weekday selection', () => {
        expect(getLastScheduledDeploy(new Date('2022-12-15 10:00:00'), [])).toBeUndefined();
    });
});

// Banner 2: Tuesday (9:00 AM)
describe('lastScheduledDeploy, subscriptions', () => {
    it('returns previous Tuesday if currently Monday', () => {
        const result = getLastScheduledDeploy(
            new Date('2022-12-12 09:00:00'),
            defaultDeploySchedule.subscriptions,
        );
        expect(result).toEqual(new Date('2022-12-06 09:00:00'));
    });

    it('returns today (Tuesday) if currently Tuesday and within an hour of the last deploy', () => {
        const result = getLastScheduledDeploy(
            new Date('2022-12-06 09:30:00'),
            defaultDeploySchedule.subscriptions,
        );
        expect(result).toEqual(new Date('2022-12-06 09:00:00'));
    });
});

// Banner 1: Sunday + Thursday (9:00AM)
describe('lastScheduledDeploy, contributions', () => {
    it('returns previous Sunday if currently Monday', () => {
        const result = getLastScheduledDeploy(
            new Date('2022-12-12 09:00:00'),
            defaultDeploySchedule.contributions,
        );
        expect(result).toEqual(new Date('2022-12-11 09:00:00'));
    });

    it('returns previous Thursday if currently Saturday', () => {
        const result = getLastScheduledDeploy(
            new Date('2022-12-17 09:00:00'),
            defaultDeploySchedule.contributions,
        );
        expect(result).toEqual(new Date('2022-12-15 09:00:00'));
    });

    it('returns today (Thursday) if currently Thursday and within an hour of the last deploy', () => {
        const result = getLastScheduledDeploy(
            new Date('2022-12-15 09:30:00'),
            defaultDeploySchedule.contributions,
        );
        expect(result).toEqual(new Date('2022-12-15 09:00:00'));
    });
});
