import { LocalStorage } from '../types/targeting/shared';

/**
 * We log epic views in this local storage item.
 * This is used to limit the number of epics a browser sees in a period of time.
 */
const viewLogKey = 'gu.contributions.views';

const maxLogEntries = 50;

interface EpicView {
    date: number;
    testId: string;
}
export type EpicViewLog = EpicView[];

/**
 * Return the entire viewLog.
 */
export const getEpicViewLog = (localStorage: LocalStorage): EpicViewLog | undefined => {
    // Return undefined instead of null if view log does not exist
    // Needed because the localStorage API returns null for non-existing keys
    // but Contributions API expects a view log or undefined.
    return localStorage.get(viewLogKey) || undefined;
};

/**
 * Add a new entry to the viewLog.
 * The number of entries is limited to the number in maxLogEntries.
 */
export const logEpicView = (testId: string): void => {
    const item = localStorage.getItem(viewLogKey);
    const viewLog: EpicView[] = (item ? JSON.parse(item).value : []) as EpicView[];

    viewLog.push({
        date: new Date().getTime(),
        testId,
    });

    const newValue = {
        value: viewLog.slice(-maxLogEntries),
    };

    localStorage.setItem(viewLogKey, JSON.stringify(newValue));
};
