import NodeCache from 'node-cache';

export const cacheAsync = <T>(
    fn: () => Promise<T>,
    ttl: number,
): [() => void, () => Promise<T>] => {
    const myCache = new NodeCache();
    const key = 'res';

    const retFn = async () => {
        const got = myCache.get(key);
        if (got) {
            return got as T;
        }

        const res = await fn();
        myCache.set(key, res, ttl);
        return res;
    };

    const resetFn = () => myCache.del(key);

    return [resetFn, retFn];
};
