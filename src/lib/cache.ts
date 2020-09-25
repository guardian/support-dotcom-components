interface Cache {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
const cache: Cache = {};

const retryIntervalMs = 5000;

export const cacheAsync = <T>(
    fn: () => Promise<T>,
    ttlSec: number,
    key: string,
): [() => void, () => Promise<T>] => {
    const getValue = async (): Promise<T> => {
        if (cache[key] !== undefined) {
            return Promise.resolve(cache[key] as T);
        } else {
            // First read attempt on this key. Fetch an initial value and setup the refresh scheduler
            const result: T = await fn();
            cache[key] = result;

            const scheduleRefresh = (ms: number): void => {
                setTimeout(async () => {
                    try {
                        cache[key] = await fn();
                        scheduleRefresh(ms);
                    } catch (err) {
                        console.log(`Error refreshing cached value for key ${key}: ${err}`);
                        scheduleRefresh(retryIntervalMs);
                    }
                }, ms);
            };

            scheduleRefresh(ttlSec * 1000);

            return Promise.resolve(result);
        }
    };

    const reset = (): void => {
        cache[key] = undefined;
    };

    return [reset, getValue];
};
