/**
 * We log epic views in this local storage item.
 * This is used to limit the number of epics a browser sees in a period of time.
 */
const viewLogKey = 'gu.contributions.views';

interface EpicView {
    date: number;
    testId: string;
}

export const logEpicView = (testId: string): void => {
    const viewLog: EpicView[] = (localStorage.getItem(viewLogKey) || []) as EpicView[];

    viewLog.push({
        date: new Date().getTime(),
        testId,
    });

    localStorage.set(viewLogKey, viewLog.slice(-50));
};
