// This is a set of helper functions to manage the Epic View Log on the client.
// The view log is an object persisted in localStorage which contains an array
// of objects with each entry containing the test ID and the timestamp each Epic
// view, so that Automat knows which Epics a user has seen and can then
// integrate this data back in the targeting logic.
// As a minimum, we expect the platform to call:
// - getViewLog when building the payload to call the Contributions service.
// - logView when rendering the Epic that has been fetched from the
// Contributions service.
// NOTE: this is a short term approach to ensure backwards compatibility with
// the Frontend view log. As Automat grows, we'll move towards a more
// centralised way of managing the slot state from an upper level.

interface View {
    date: number;
    testId: string;
}
export type ViewLog = View[];

// The key must be backwards compatible with Frontend.
const viewKey = 'gu.contributions.views';

// Hard limit on the number of entries to keep in the viewLog.
const maxLogEntries = 50;

/**
 * This interface is duplicated from the @guardian/libs definition of StorageFactory. This is to avoid adding the
 * whole library as a dependency.
 */
export interface LocalStorage {
    set(key: string, value: unknown): void;
    get(key: string): any;
}

/**
 * Return the entire viewLog.
 */
export const getViewLog = (localStorage: LocalStorage): ViewLog | undefined => {
    // Return undefined instead of null if view log does not exist
    // Needed because the localStorage API returns null for non-existing keys
    // but Contributions API expects a view log or undefined.
    return localStorage.get(viewKey) || undefined;
};

/**
 * Add a new entry to the viewLog.
 * The number of entries is limited to the number in maxLogEntries.
 */
export const logView = (localStorage: LocalStorage, testId: string): void => {
    const viewLog = getViewLog(localStorage) || [];

    viewLog.push({
        date: new Date().getTime(),
        testId,
    });

    localStorage.set(viewKey, viewLog.slice(-maxLogEntries));
};
