import type { LocalStorage } from '../types/targeting/shared';

/**
 * We log epic views in this local storage item.
 * This is used to limit the number of epics a browser sees in a period of time.
 */
const epicViewLogKey = 'gu.contributions.views';

const maxLogEntries = 50;

interface MessageView {
    date: number;
    testId: string;
}
export type MessageViewLog = MessageView[];

/**
 * Return the entire viewLog.
 */
export const getEpicViewLog = (localStorage: LocalStorage): MessageViewLog | undefined => {
    // Return undefined instead of null if view log does not exist
    // Needed because the localStorage API returns null for non-existing keys
    // but Contributions API expects a view log or undefined.
    const viewLog = localStorage.get(epicViewLogKey) as MessageViewLog | null;
    return viewLog ?? undefined;
};

/**
 * Add a new entry to the viewLog.
 * The number of entries is limited to the number in maxLogEntries.
 */
export const logEpicView = (testId: string): void => {
    const item = JSON.parse(localStorage.getItem(epicViewLogKey) ?? '') as {
        value: unknown;
    } | null;
    const viewLog: MessageView[] = (item ? item.value : []) as MessageView[];

    viewLog.push({
        date: new Date().getTime(),
        testId,
    });

    const newValue = {
        value: viewLog.slice(-maxLogEntries),
    };

    localStorage.setItem(epicViewLogKey, JSON.stringify(newValue));
};
