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

export const getReminderFields = (reminderFields?: ReminderFields): ReminderFields => {
    return !!reminderFields ? reminderFields : buildReminderFields();
};
