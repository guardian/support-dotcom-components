export interface ReminderFields {
    reminderCta: string;
    reminderLabel: string;
    reminderPeriod: string;
    reminderOption?: string;
}

// Thanksgiving in the USA is always the fourth Thursday in November
const thanksgivingUSA = (year: number): Date => {
    // An integer representing the day of the week for November 1st (0 == Sunday, 1 == Monday, 2 == Tuesday, etc.)
    const novemberFirstDay = new Date(year, 10, 1).getDay();

    // We calculate the offset between the first of November and the first Thursday in November using a modulus operation
    const firstThursdayOffset = (11 - novemberFirstDay) % 7;

    // The 22nd is the earliest possible date in November for Thanksgiving (USA). We add the offset to 22 to find the
    // date of Thanksgiving for the given year
    const thanksgivingDate = 22 + firstThursdayOffset;

    return new Date(year, 10, thanksgivingDate);
};

// Giving Tuesday is always the Tuesday following Thanksgiving, i.e. five days after Thanksgiving
const givingTuesday = (year: number): Date => {
    return new Date(year, 10, thanksgivingUSA(year).getDate() + 5);
};

const getReminderDate = (date: Date): Date => {
    const monthsAhead = date.getDate() < 20 ? 1 : 2;
    date.setMonth(date.getMonth() + monthsAhead);

    return date;
};

const givingTuesdayReminderFields = (year: number): ReminderFields => {
    return {
        reminderCta: 'Remind me on Giving Tuesday',
        reminderPeriod: `${year}-11-01`,
        reminderLabel: 'on Giving Tuesday',
        reminderOption: `giving-tuesday-${year}`,
    };
};

const newYearsEveReminderFields = (year: number): ReminderFields => {
    return {
        reminderCta: 'Remind me on New Years Eve',
        reminderPeriod: `${year}-12-01`,
        reminderLabel: 'on New Years Eve',
        reminderOption: `new-years-eve-${year}`,
    };
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

const newYearsEve = new Date('2023-12-31');
const givingTuesdayReminderStart = (date: Date): Date => {
    return new Date(date.getFullYear(), 10, 1); // November 1st (provisional auto start date, to be confirmed)
};

// Giving Tuesday is 'active' from November 1st until the day before Giving Tuesday
const givingTuesdayIsActive = (date: Date): boolean =>
    date >= givingTuesdayReminderStart(date) && date < givingTuesday(date.getFullYear());

// New Years Eve is 'active' from Giving Tuesday until the day before NYE
const newYearsEveIsActive = (date: Date): boolean =>
    date >= givingTuesday(date.getFullYear()) && date < newYearsEve;

export const getReminderFields = (
    countryCode?: string,
    date: Date = new Date(),
): ReminderFields => {
    if (countryCode === 'US' && givingTuesdayIsActive(date)) {
        return givingTuesdayReminderFields(date.getFullYear());
    }

    if (countryCode === 'US' && newYearsEveIsActive(date)) {
        return newYearsEveReminderFields(date.getFullYear());
    }

    return buildReminderFields(date);
};
