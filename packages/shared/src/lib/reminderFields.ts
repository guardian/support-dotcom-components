import { EpicVariant } from '../types/epic';

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

export const NYE_REMINDER_FIELDS: ReminderFields = {
    reminderCta: "Remind me on New Year's Eve",
    reminderPeriod: '2021-12-01',
    reminderLabel: "on New Year's Eve",
    reminderOption: 'nye-2021',
};

export const getReminderFields = (
    variant: EpicVariant,
    countryCode?: string,
): ReminderFields | undefined => {
    return variant.showReminderFields ?? countryCode === 'US'
        ? NYE_REMINDER_FIELDS
        : buildReminderFields();
};
