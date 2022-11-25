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

export const GIVING_TUESDAY_REMINDER_FIELDS: ReminderFields = {
    reminderCta: 'Remind me on Giving Tuesday',
    reminderPeriod: '2022-11-01',
    reminderLabel: 'on Giving Tuesday',
    reminderOption: 'giving-tuesday-2022',
};

const GivingTuesdayCutOff = new Date('2022-11-28');

const givingTuesdayIsActive = (date: Date = new Date()): boolean => date < GivingTuesdayCutOff;

export const getReminderFields = (countryCode?: string): ReminderFields => {
    if (countryCode === 'US' && givingTuesdayIsActive()) {
        return GIVING_TUESDAY_REMINDER_FIELDS;
    }
    return buildReminderFields();
};
