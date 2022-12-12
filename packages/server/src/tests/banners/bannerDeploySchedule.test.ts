import {
    defaultDeploySchedule,
    getLastScheduledDeploy,
    previousScheduledDate,
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
