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
    const item = localStorage.getItem(viewLogKey);
    const viewLog: EpicView[] = (item ? JSON.parse(item).value : []) as EpicView[];

    viewLog.push({
        date: new Date().getTime(),
        testId,
    });

    const newValue = {
        value: viewLog.slice(-50),
    };

    localStorage.setItem(viewLogKey, JSON.stringify(newValue));
};
