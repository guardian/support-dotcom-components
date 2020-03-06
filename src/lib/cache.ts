import NodeCache from 'node-cache';

// Note, this is heavyweight implementation as it constructs a new cache for
// each invocation. The assumption is that we'll only ever cache a few values;
// if we end up wanting to cache lots of things, we should refactor to *share*
// caches.
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
