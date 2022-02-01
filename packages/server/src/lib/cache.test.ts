import { cacheAsync } from './cache';

jest.useFakeTimers();

describe('cacheAsync', () => {
    it('sets new cache value', async () => {
        const fn = jest.fn().mockReturnValue(Promise.resolve(true));
        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60 });

        const value = await fetchData();

        expect(value).toEqual(true);
        expect(fn).toHaveBeenCalledTimes(1);

        fetchData.clear();
    });

    it('warms the cache', async () => {
        const fn = jest.fn().mockReturnValue(Promise.resolve(true));
        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60, warm: true });

        expect(fn).toHaveBeenCalledTimes(1);

        fetchData.clear();
    });

    it('sets new cache value and uses cached value', async () => {
        const fn = jest.fn().mockReturnValue(Promise.resolve(true));
        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60 });

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        fetchData.clear();
    });

    it('sets new cache value and refreshes', async () => {
        const fn = jest.fn().mockReturnValue(Promise.resolve(true));
        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60 });

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(1);

        jest.runAllTimers(); // fast-forward to first refresh

        await fetchData();

        expect(fn).toHaveBeenCalledTimes(2);

        fetchData.clear();
    });

    it('retries if initial request fails', async () => {
        const fn = jest
            .fn()
            .mockReturnValueOnce(Promise.reject(new Error('ERROR')))
            .mockReturnValue(Promise.resolve(true));

        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60 });

        await expect(fetchData()).rejects.toEqual(new Error('ERROR'));

        expect(fn).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
        await sleep(0);
        jest.useFakeTimers();

        await expect(fetchData()).resolves.toEqual(true);

        expect(fn).toHaveBeenCalledTimes(2);

        fetchData.clear();
    });

    it('retries if a refresh fails', async () => {
        const fn = jest
            .fn()
            .mockReturnValueOnce(Promise.resolve(true))
            .mockReturnValueOnce(Promise.reject(new Error('ERROR')))
            .mockReturnValue(Promise.resolve(true));

        const fetchData = cacheAsync<boolean>(fn, { ttlSec: 60 });

        await expect(fetchData()).resolves.toEqual(true);

        expect(fn).toHaveBeenCalledTimes(1);

        jest.runAllTimers(); // fast-forward to first refresh

        await expect(fetchData()).rejects.toEqual(new Error('ERROR'));

        expect(fn).toHaveBeenCalledTimes(2);

        jest.useRealTimers();
        await sleep(0);
        jest.useFakeTimers();

        await expect(fetchData()).resolves.toEqual(true);

        expect(fn).toHaveBeenCalledTimes(3);

        fetchData.clear();
    });
});

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
