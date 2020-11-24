import { buildReminderFields } from './reminderFields';

describe('buildReminderFields', () => {
    it('should set date to the next calendar month if the current date is BEFORE the 20th', () => {
        const novemberNineteenth = new Date('2020-11-19 00:00:00');

        const expected = {
            reminderCTA: `Remind me in December`,
            reminderDate: `2020-12-19 00:00:00`,
            reminderDateAsString: `December 2020`,
        };
        const actual = buildReminderFields(novemberNineteenth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is the 20th', () => {
        const novemberTwentieth = new Date('2020-11-20 00:00:00');

        const expected = {
            reminderCTA: `Remind me in January`,
            reminderDate: `2021-01-19 00:00:00`,
            reminderDateAsString: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentieth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is AFTER the 20th', () => {
        const novemberTwentyFirst = new Date('2020-11-21 00:00:00');

        const expected = {
            reminderCTA: `Remind me in January`,
            reminderDate: `2021-01-19 00:00:00`,
            reminderDateAsString: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentyFirst);

        expect(actual).toEqual(expected);
    });
});
