import { buildReminderFields, getReminderFields } from './reminderFields';

describe('buildReminderFields', () => {
    it('should set date to the next calendar month if the current date is BEFORE the 20th', () => {
        const novemberNineteenth = new Date('2020-11-19');

        const expected = {
            reminderCta: `Remind me in December`,
            reminderPeriod: `2020-12-01`,
            reminderLabel: `December 2020`,
        };
        const actual = buildReminderFields(novemberNineteenth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is the 20th', () => {
        const novemberTwentieth = new Date('2020-11-20');

        const expected = {
            reminderCta: `Remind me in January`,
            reminderPeriod: `2021-01-01`,
            reminderLabel: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentieth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is AFTER the 20th', () => {
        const novemberTwentyFirst = new Date('2020-11-21');

        const expected = {
            reminderCta: `Remind me in January`,
            reminderPeriod: `2021-01-01`,
            reminderLabel: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentyFirst);

        expect(actual).toEqual(expected);
    });
});

describe('getReminderFields', () => {
    describe('when in the US, during the giving Tuesday period', () => {
        it('should return Giving Tuesday reminder fields', () => {
            const inTheGivingTuesdayPeriod = new Date('2023-11-15');

            const actual = getReminderFields('US', inTheGivingTuesdayPeriod);

            const expected = {
                reminderCta: 'Remind me on Giving Tuesday',
                reminderPeriod: '2023-11-01',
                reminderLabel: 'on Giving Tuesday',
                reminderOption: 'giving-tuesday-2023',
            };
            expect(actual).toEqual(expected);
        });
    });

    describe('when in the US, between Giving Tuesday and the day before New Years Eve', () => {
        it('should return New Years Eve reminder fields', () => {
            const inTheNewYearsEveReminderPeriod = new Date('2023-12-15');

            const actual = getReminderFields('US', inTheNewYearsEveReminderPeriod);

            const expected = {
                reminderCta: 'Remind me on New Years Eve',
                reminderPeriod: '2023-12-01',
                reminderLabel: 'on New Years Eve',
                reminderOption: 'new-years-eve-2023',
            };
            expect(actual).toEqual(expected);
        });
    });

    describe('when outside the US, during the giving Tuesday period', () => {
        it('should return standard reminder fields', () => {
            const inTheGivingTuesdayPeriod = new Date('2023-11-15');

            const actual = getReminderFields('AU', inTheGivingTuesdayPeriod);

            const expected = {
                reminderCta: `Remind me in December`,
                reminderPeriod: `2023-12-01`,
                reminderLabel: `December 2023`,
            };
            expect(actual).toEqual(expected);
        });
    });

    describe('when outside the US, between Giving Tuesday and the day before New Years Eve', () => {
        it('should return standard reminder fields', () => {
            const inTheNewYearsEveReminderPeriod = new Date('2023-12-15');

            const actual = getReminderFields('FR', inTheNewYearsEveReminderPeriod);

            const expected = {
                reminderCta: `Remind me in January`,
                reminderPeriod: `2024-01-01`,
                reminderLabel: `January 2024`,
            };
            expect(actual).toEqual(expected);
        });
    });
});
