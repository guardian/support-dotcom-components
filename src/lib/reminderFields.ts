export interface ReminderFields {
    reminderCTA: string;
    reminderDate: string;
    reminderDateAsString: string;
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
        reminderCTA: `Remind me in ${monthName}`,
        reminderDate: `${year}-${paddedMonth}-19 00:00:00`,
        reminderDateAsString: `${monthName} ${year}`,
    };
};

const US_EOY_APPEAL_REMINDER_FIELDS: ReminderFields = {
    reminderCTA: 'Remind me late December',
    reminderDate: `2020-12-28 00:00:00`,
    reminderDateAsString: `in late December`,
};

const US_EOY_APPEAL_REMINDER_CUT_OFF = Date.parse('2020-12-27');

const shouldShowUsEoyReminder = (countryCode?: string): boolean =>
    countryCode == 'US' && Date.now() < US_EOY_APPEAL_REMINDER_CUT_OFF;

export const getReminderFields = (
    reminderFields?: ReminderFields,
    countryCode?: string,
): ReminderFields => {
    if (shouldShowUsEoyReminder(countryCode)) {
        return US_EOY_APPEAL_REMINDER_FIELDS;
    }
    return !!reminderFields ? reminderFields : buildReminderFields();
};
