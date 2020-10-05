import { cacheAsync } from './cache';

jest.useFakeTimers();

describe('cache', () => {
    it('sets new cache value', async () => {
        const fn = jest.fn().mockImplementation(() => Promise.resolve(true));
        const [reset, fetchData] = cacheAsync(fn, 60, 'test1');

        const value = await fetchData();

        expect(value).toEqual(true);
        expect(fn).toHaveBeenCalledTimes(1);
        reset();
    });

    it('sets new cache value and uses cached value', async () => {
        const fn = jest.fn().mockImplementation(() => Promise.resolve(true));
        const [reset, fetchData] = cacheAsync(fn, 60, 'test2');

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        reset();
    });

    it('sets new cache value and refreshes', async () => {
        const fn = jest.fn().mockImplementation(() => Promise.resolve(true));
        const [reset, fetchData] = cacheAsync(fn, 60, 'test3');

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        jest.runOnlyPendingTimers(); // fast-forward to first refresh

        expect(fn).toHaveBeenCalledTimes(2);

        reset();
    });

    it('retries if initial request fails', async () => {
        // Use counter to ensure it fails on the 2nd invocation only
        let counter = 0;
        const err = new Error('ERROR');
        const fn = jest.fn().mockImplementation(() => {
            console.log("RUN",counter)
            counter++;
            if (counter === 1) {
                return Promise.reject(err);
            } else {
                return Promise.resolve(true);
            }
        });

        const [reset, fetchData] = cacheAsync(fn, 60, 'test4');

        await expect(fetchData()).rejects;

        expect(fn).toHaveBeenCalledTimes(1);

        jest.runOnlyPendingTimers(); // fast-forward to retry

        expect(fn).toHaveBeenCalledTimes(2);

        await expect(fetchData()).resolves.toEqual(true);
    });

    it('retries if a refresh fails', async () => {
        // Use counter to ensure it fails on the 2nd invocation only
        let counter = 0;
        const fn = jest.fn().mockImplementation(() => {
            counter++;
            if (counter === 2) {
                return Promise.reject('ERROR!');
            } else {
                return Promise.resolve(true);
            }
        });
        const [reset, fetchData] = cacheAsync(fn, 60, 'test5');

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        await fetchData();
        jest.runOnlyPendingTimers(); // fast-forward to first refresh

        expect(fn).toHaveBeenCalledTimes(2);

        await fetchData();
        jest.runOnlyPendingTimers(); // fast-forward to second refresh

        expect(fn).toHaveBeenCalledTimes(3);

        reset();
    });
});
