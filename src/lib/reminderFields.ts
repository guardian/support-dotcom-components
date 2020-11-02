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

    const month = reminderDate.getMonth();
    const monthName = reminderDate.toLocaleString('default', { month: 'long' });
    const year = reminderDate.getFullYear();

    return {
        reminderCTA: `Remind me in ${monthName}`,
        reminderDate: `${year}-${month}-19 00:00:00`,
        reminderDateAsString: `${monthName} ${year}`,
    };
};

const US_EOY_APPEAL_REMINDER_FIELDS: ReminderFields = {
    reminderCTA: 'Remind me on Giving Tuesday',
    reminderDate: `2020-12-01 00:00:00`,
    reminderDateAsString: `on Giving Tuesday`,
};

const US_EOY_APPEAL_REMINDER_CUT_OFF = Date.parse('2020-11-29');

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
