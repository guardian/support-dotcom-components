export interface ReminderFields {
    reminderCta: string;
    reminderLabel: string;
    reminderPeriod: string;
    reminderOption?: string;
}

const getReminderDate = (date: Date): Date => {
    const monthsAhead = date.getDate() < 20 ? 1 : 2;
    date.setMonth(date.getMonth() + monthsAhead);

    return date;
};

export const GIVING_TUESDAY_REMINDER_FIELDS: ReminderFields = {
    reminderCta: 'Remind me on Giving Tuesday',
    reminderPeriod: '2023-11-01',
    reminderLabel: 'on Giving Tuesday',
    reminderOption: 'giving-tuesday-2023',
};

export const NEW_YEARS_EVE_REMINDER_FIELDS: ReminderFields = {
    reminderCta: 'Remind me on New Years Eve',
    reminderPeriod: '2023-12-01',
    reminderLabel: 'on New Years Eve',
    reminderOption: 'new-years-eve-2023',
};

export const buildReminderFields = (today: Date = new Date()): ReminderFields => {
    const reminderDate = getReminderDate(today);

    const month = reminderDate.getMonth() + 1; // javascript dates run from 0-11, we want 1-12
    const paddedMonth = month.toString().padStart(2, '0');
    const monthName = reminderDate.toLocaleString('default', { month: 'long' });
    const year = reminderDate.getFullYear();

    return {
        reminderCta: `Remind me in ${monthName}`,
        reminderPeriod: `${year}-${paddedMonth}-01`,
        reminderLabel: `${monthName} ${year}`,
    };
};

const givingTuesdayCutOff = new Date('2023-11-27');

const givingTuesdayIsActive = (date: Date): boolean => date <= givingTuesdayCutOff;

const newYearsEveStart = new Date('2023-11-28');
const newYearsEveCutOff = new Date('2023-12-30');

const newYearsEveIsActive = (date: Date): boolean =>
    date >= newYearsEveStart && date <= newYearsEveCutOff;

export const getReminderFields = (
    countryCode?: string,
    date: Date = new Date(),
): ReminderFields => {
    if (countryCode === 'US' && givingTuesdayIsActive(date)) {
        return GIVING_TUESDAY_REMINDER_FIELDS;
    }

    if (countryCode === 'US' && newYearsEveIsActive(date)) {
        return NEW_YEARS_EVE_REMINDER_FIELDS;
    }

    return buildReminderFields(date);
};
