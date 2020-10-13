import { buildReminderFields } from './reminderFields';

describe('buildReminderFields', () => {
    it('should set date to the next calendar month if the current date is BEFORE the 20th', () => {
        const novemberNineteenth = new Date('2020-11-19 00:00:00');

        const expected = 'December 2020';
        const actual = buildReminderFields(novemberNineteenth).reminderDateAsString;

        expect(actual).toBe(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is the 20th', () => {
        const novemberTwentieth = new Date('2020-11-20 00:00:00');

        const expected = 'January 2021';
        const actual = buildReminderFields(novemberTwentieth).reminderDateAsString;

        expect(actual).toBe(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is AFTER the 20th', () => {
        const novemberTwentyFirst = new Date('2020-11-21 00:00:00');

        const expected = 'January 2021';
        const actual = buildReminderFields(novemberTwentyFirst).reminderDateAsString;

        expect(actual).toBe(expected);
    });
});
