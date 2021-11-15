import { previousScheduledDate, lastChannel2ScheduledDeploy } from './bannerDeploySchedule';

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

describe('lastChannel2ScheduledDeploy', () => {
    it('returns previous monday if currently tuesday', () => {
        const date = new Date('2021-11-09 09:00:00');
        const result = lastChannel2ScheduledDeploy(date);
        expect(result).toEqual(new Date('2021-11-08 08:00:00'));
    });

    it('returns previous friday if currently sunday', () => {
        const result = lastChannel2ScheduledDeploy(new Date('2021-11-07 09:00:00'));
        expect(result).toEqual(new Date('2021-11-05 08:00:00'));
    });
});
