// From https://github.com/guardian/automat-client-v2/blob/master/src/contributions/lib/dates.ts#L4
export const getMondayFromDate = (date: Date): number => {
    const day = date.getDay() || 7; // Sunday is 0, so set it to 7
    const time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - (day - 1));
    return time / 86400000;
};
