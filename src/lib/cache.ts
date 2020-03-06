import NodeCache from 'node-cache';

export const cacheAsync = <T>(
    fn: () => Promise<T>,
    ttlSec: number,
): [() => void, () => Promise<T>] => {
    const myCache = new NodeCache();
    const key = 'res';

    const retFn = async () => {
        const got = myCache.get(key);
        if (got !== undefined) {
            return got as T;
        }

        const res = await fn();
        myCache.set(key, res, ttlSec);
        return res;
    };

    const resetFn = () => myCache.del(key);

    return [resetFn, retFn];
};
